import {
  fetchPlaceholders, buildBlock, decorateBlock, loadBlock,
} from '../../scripts/aem.js';

function updateActiveSlide(slide) {
  const block = slide.closest('.carousel');
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
  block.dataset.activeSlide = slideIndex;

  const slides = block.querySelectorAll('.carousel-slide');

  slides.forEach((aSlide, idx) => {
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
    aSlide.querySelectorAll('a').forEach((link) => {
      if (idx !== slideIndex) {
        link.setAttribute('tabindex', '-1');
      } else {
        link.removeAttribute('tabindex');
        if (link.closest('.hero-overlay')) {
          link.setAttribute('role', 'button');
        }
      }
    });
  });

  if (block.classList.contains('hero-overlay')) {
    const counter = block.querySelector('.carousel-slide-counter');
    if (!counter) return;
    counter.textContent = `${slideIndex + 1}/${slides.length}`; // update number
    if (
      window.matchMedia('(width < 1024px)').matches
  && block.showCounterOnNextSlide
    ) {
      counter.classList.add('visible');
      clearTimeout(counter.hideTimer);
      counter.hideTimer = setTimeout(() => {
        counter.classList.remove('visible');
      }, 3000);
      block.showCounterOnNextSlide = false;
    }
  }

  const indicators = block.querySelectorAll('.carousel-slide-indicator');
  indicators.forEach((indicator, idx) => {
    const button = indicator.querySelector('button');
    button.removeAttribute('aria-current');
    if (idx === slideIndex) {
      button.setAttribute('aria-current', 'true');
    }
    if (idx !== slideIndex) {
      indicator.querySelector('button').removeAttribute('disabled');
    } else {
      indicator.querySelector('button').setAttribute('disabled', 'true');
    }
  });
}

function showSlide(block, slideIndex = 0) {
  const slides = block.querySelectorAll('.carousel-slide');
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
  if (slideIndex >= slides.length) realSlideIndex = 0;
  const activeSlide = slides[realSlideIndex];

  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
  block.querySelector('.carousel-slides').scrollTo({
    top: 0,
    left: activeSlide.offsetLeft,
    behavior: 'smooth',
  });

  // Update aria-live region with slide info
  const liveRegion = block.querySelector(`#carousel-live-region-${block.id.split('-').pop()}`);
  if (!liveRegion) return;

  // Get slide number
  const slideNumber = realSlideIndex + 1;

  // Get event title (assumes event header title inside slide)
  const titleEl = activeSlide.querySelector('.event-header-title');
  const title = titleEl ? titleEl.textContent.trim() : '';

  // Get countdown text
  let countdown = '';
  const countdownRoot = activeSlide.querySelector('.event-header-countdown');

  if (countdownRoot) {
    const groups = countdownRoot.querySelectorAll('.timer-group');
    const parts = [];

    groups.forEach((group) => {
      const digits = Array.from(group.querySelectorAll('.timer-digit span'))
        .map((d) => d.textContent.trim())
        .join('');

      const labelEl = group.querySelector('.timer-label');
      const label = labelEl ? labelEl.textContent.trim() : '';

      if (digits && label) {
        parts.push(`${digits} ${label}`);
      }
    });

    if (parts.length) {
      countdown = `Time remaining ${parts.join(', ')}`;
    }
  }

  // Extract event date (ignores the icon)
  let eventDate = '';
  const dateRoot = activeSlide.querySelector('.event-header-date');

  if (dateRoot) {
    eventDate = dateRoot.textContent
      .replace(/\s+/g, ' ') // normalize whitespace
      .trim(); // remove leading/trailing spaces
  }

  // Build final announcement
  const announcement = [
    `Slide ${slideNumber}`,
    title,
    eventDate,
    countdown,
  ].filter(Boolean).join('. ');

  liveRegion.textContent = announcement;
}

function setupAutoplay(block, interval = 5000) {
  if (block.autoplayInterval) return;

  block.autoplayInterval = setInterval(() => {
    const currentSlide = parseInt(block.dataset.activeSlide, 10);
    showSlide(block, currentSlide + 1);
  }, interval);
}

function resetAutoplay(block) {
  if (block.autoplayInterval) {
    clearInterval(block.autoplayInterval);
    block.autoplayInterval = null;
  }
  setupAutoplay(block);
}

function bindEvents(block) {
  const slideIndicators = block.querySelector('.carousel-slide-indicators');
  if (slideIndicators) {
    slideIndicators.querySelectorAll('button').forEach((button) => {
      button.addEventListener('click', (e) => {
        const slideIndicator = e.currentTarget.parentElement;
        showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
      });

      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const slideIndicator = e.currentTarget.parentElement;
          showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
        }
      });
    });
  }
  const prevButton = block.querySelector('.slide-prev');
  const nextButton = block.querySelector('.slide-next');

  if (prevButton) {
    prevButton.addEventListener('click', () => {
      resetAutoplay(block);
      showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener('click', () => {
      resetAutoplay(block);
      showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
    });
  }

  const slideObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) updateActiveSlide(entry.target);
    });
  }, { threshold: 0.5 });
  block.querySelectorAll('.carousel-slide').forEach((slide) => {
    slideObserver.observe(slide);
  });

  // Hero overlay click behavior
  if (block.classList.contains('hero-overlay')) {
    block.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;

      const slide = e.target.closest('.carousel-slide');
      if (!slide) return;
      const activeIndex = parseInt(block.dataset.activeSlide, 10);
      const slideBounds = slide.getBoundingClientRect();
      const clickX = e.clientX - slideBounds.left;
      block.showCounterOnNextSlide = true;
      resetAutoplay(block);
      if (clickX < slideBounds.width / 2) {
        showSlide(block, activeIndex - 1); // previous
      } else {
        showSlide(block, activeIndex + 1); // next
      }
    });
  }
}

function createSlide(row, slideIndex, carouselId, isHeroOverlay = false) {
  const slide = document.createElement('li');
  slide.dataset.slideIndex = slideIndex;
  slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
  slide.setAttribute('role', 'group');
  slide.setAttribute('aria-label', 'carousel slide');
  slide.classList.add('carousel-slide');

  // old behavior
  if (!isHeroOverlay) {
    row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
      column.classList.add(`carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
      slide.append(column);
    });
  } else { // hero overlay only
    let imageCol;
    let contentCol;

    row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
      if (colIdx === 0) {
        column.classList.add('carousel-slide-image');
        imageCol = column;
      } else {
        column.classList.add('carousel-slide-content');
        contentCol = column;
      }
    });

    if (imageCol) slide.append(imageCol);

    if (contentCol) {
      const overlay = document.createElement('div');
      overlay.className = 'hero-overlay';
      overlay.append(contentCol);
      slide.append(overlay);
    }
  }

  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
  if (labeledBy) {
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
  }

  return slide;
}

async function fetchLandingFragmentImages(fragmentPath) {
  try {
    const response = await fetch(`${fragmentPath}.plain.html`);
    if (!response.ok) return [];
    const html = await response.text();
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const images = tempDiv.querySelectorAll('picture');
    return Array.from(images);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch landing fragment images:', error);
    return [];
  }
}

async function createEventSlides(block) {
  const links = block.querySelectorAll('a');
  const eventPaths = Array.from(links).map((link) => {
    const url = new URL(link.href, window.location.origin);
    return url.pathname;
  });

  if (eventPaths.length === 0) {
    return [];
  }

  const events = await window.fetchEventData();
  const eventsMap = new Map(events.map((event) => [event.path, event]));
  const matchedEvents = eventPaths.map((path) => eventsMap.get(path)).filter(Boolean);

  if (matchedEvents.length === 0) {
    return [];
  }

  const slides = await Promise.all(matchedEvents.map(async (event) => {
    const slideDiv = document.createElement('div');
    const eventHeaderBlock = buildBlock('event-header', []);

    if (event.landingFragment) {
      const images = await fetchLandingFragmentImages(event.landingFragment);
      images.forEach((img) => {
        eventHeaderBlock.appendChild(img);
      });
    }

    eventHeaderBlock.dataset.eventData = JSON.stringify(event);

    slideDiv.appendChild(eventHeaderBlock);
    decorateBlock(eventHeaderBlock);
    await loadBlock(eventHeaderBlock);

    return slideDiv;
  }));

  return slides;
}

let carouselId = 0;
export default async function decorate(block) {
  carouselId += 1;
  block.setAttribute('id', `carousel-${carouselId}`);

  const isEventsVariant = block.classList.contains('events');
  const isAutoplay = block.classList.contains('autoplay');
  const isHero = block.classList.contains('hero');
  const isHeroOverlay = block.classList.contains('hero-overlay');

  if (isHero) {
    const section = block.closest('.section');
    if (section) {
      section.classList.add('full-width');
    }
  }

  let rows;
  if (isEventsVariant) {
    const eventSlides = await createEventSlides(block);
    if (eventSlides.length === 0) {
      block.innerHTML = '<p>No events found.</p>';
      return;
    }

    block.innerHTML = '';
    eventSlides.forEach((slide) => {
      block.appendChild(slide);
    });
    rows = block.querySelectorAll(':scope > div');
  } else {
    rows = block.querySelectorAll(':scope > div');
  }

  const isSingleSlide = rows.length < 2;

  const placeholders = await fetchPlaceholders();

  block.setAttribute('role', 'region');
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');

  const container = document.createElement('div');
  container.classList.add('carousel-slides-container');

  // Add an aria-live region (visually hidden) for announcements
  const liveRegion = document.createElement('div');
  liveRegion.className = 'sr-only';
  liveRegion.setAttribute('aria-live', 'polite');
  liveRegion.setAttribute('aria-atomic', 'true');
  liveRegion.id = `carousel-live-region-${carouselId}`;
  container.appendChild(liveRegion);

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.classList.add('carousel-slides');
  slidesWrapper.setAttribute('role', 'presentation');
  block.prepend(slidesWrapper);

  let slideIndicators;
  if (!isSingleSlide) {
    if (!isHeroOverlay) {
      const slideIndicatorsNav = document.createElement('nav');
      slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
      slideIndicators = document.createElement('ol');
      slideIndicators.classList.add('carousel-slide-indicators');
      slideIndicatorsNav.append(slideIndicators);
      block.append(slideIndicatorsNav);
    }
    if (!isHero) {
      const slideNavButtons = document.createElement('div');
      slideNavButtons.classList.add('carousel-navigation-buttons');
      slideNavButtons.innerHTML = `
        <button type="button" class= "slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
        <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
      `;

      container.append(slideNavButtons);
    }
  }

  rows.forEach((row, idx) => {
    const slide = createSlide(row, idx, carouselId, isHeroOverlay);
    slidesWrapper.append(slide);

    if (slideIndicators) {
      const indicator = document.createElement('li');
      indicator.classList.add('carousel-slide-indicator');
      indicator.dataset.targetSlide = idx;
      indicator.innerHTML = `<button type="button" aria-current="true"><span>${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}</span></button>`;
      slideIndicators.append(indicator);
    }
    row.remove();
  });

  container.append(slidesWrapper);
  block.prepend(container);

  if (!isSingleSlide) {
    block.dataset.activeSlide = '0';
    bindEvents(block);
    if (isHeroOverlay) {
      const slideCounter = document.createElement('div');
      slideCounter.classList.add('carousel-slide-counter');
      slideCounter.textContent = `1/${rows.length}`;
      container.appendChild(slideCounter);
    }

    if (isAutoplay || isHero || isHeroOverlay) {
      setupAutoplay(block);
    }
    if (isHeroOverlay && window.matchMedia('(width > 1024px)').matches) {
      let arrowTimer;

      const showArrows = () => {
        block.classList.add('show-arrows');

        clearTimeout(arrowTimer);
        arrowTimer = setTimeout(() => {
          block.classList.remove('show-arrows');
        }, 4000);
      };
      block.addEventListener('mouseenter', showArrows);
      block.addEventListener('mousemove', showArrows);
      block.addEventListener('click', showArrows);
    }
  }
}
