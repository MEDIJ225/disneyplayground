import { createElement } from '../../utils/dom.js';

/**
 * loads and decorates the promo-carousel block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const linksWithImages = Array.from(block.querySelectorAll('a')).filter((link) => link.querySelector('img'));
  const standaloneImages = Array.from(block.querySelectorAll('img')).filter((img) => !img.closest('a'));
  const items = [...linksWithImages, ...standaloneImages];

  if (items.length === 0) {
    return;
  }

  const carousel = createElement('div', { class: 'promo-carousel' });
  const container = createElement('div', { class: 'promo-container' });

  const slideGroups = [];
  for (let i = 0; i < items.length; i += 5) {
    slideGroups.push(items.slice(i, i + 5));
  }

  slideGroups.forEach((group) => {
    const slideGroup = createElement('div', { class: 'promo-slide-group' });

    group.forEach((item) => {
      if (item.tagName === 'A') {
        if (!item.href) {
          item.href = '#';
        }
        if (!item.rel && item.href.startsWith('http')) {
          item.rel = 'external';
        }
        const slide = createElement('div', { class: 'promo-slide' }, [item]);
        slideGroup.appendChild(slide);
      } else if (item.tagName === 'IMG') {
        const slide = createElement('div', { class: 'promo-slide' }, [item]);
        slideGroup.appendChild(slide);
      }
    });

    container.appendChild(slideGroup);
  });

  carousel.appendChild(container);

  if (slideGroups.length > 1) {
    let currentSlide = 0;
    let interval = null;
    const slideGroupWidth = 150 * 5 + 64 * 4;
    const mediaQuery = window.matchMedia('(width >= 1024px)');

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slideGroups.length;
      container.style.transform = `translateX(-${currentSlide * slideGroupWidth}px)`;
    };

    const startAutoPlay = () => {
      if (interval) clearInterval(interval);
      interval = setInterval(nextSlide, 5000);
    };

    const stopAutoPlay = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const enableCarousel = () => {
      startAutoPlay();
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    };

    const disableCarousel = () => {
      stopAutoPlay();
      carousel.removeEventListener('mouseenter', stopAutoPlay);
      carousel.removeEventListener('mouseleave', startAutoPlay);
      container.style.transform = '';
      currentSlide = 0;
    };

    const handleMediaChange = (e) => {
      if (e.matches) {
        enableCarousel();
      } else {
        disableCarousel();
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    handleMediaChange(mediaQuery);
  }

  block.innerHTML = '';
  block.appendChild(carousel);
}
