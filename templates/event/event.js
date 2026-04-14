import { createElement, createIcon } from '../../utils/dom.js';
import { formatDateRange } from '../../utils/date.js';
import { createTimerElement, createCountdownTimer } from '../../utils/timer.js';
import { getSponsors, getTag } from '../../utils/taxonomy.js';
// eslint-disable-next-line import/no-cycle
import { decorateLinks } from '../../scripts/scripts.js';
import {
  getMetadata,
  fetchPlaceholders,
  decorateBlock,
  loadBlock,
} from '../../scripts/aem.js';

async function loadSponsors() {
  try {
    const tags = getMetadata('article:tag');
    if (!tags) return [];

    const tagList = tags.split(',').map((tag) => tag.trim());
    const sponsorTags = tagList.filter((tag) => tag.startsWith('sponsors/'));

    if (sponsorTags.length === 0) return [];

    const allSponsors = await getSponsors();
    // Create a map for quick sponsor lookup
    const sponsorsMap = new Map(allSponsors.map((sponsor) => [sponsor.tag, sponsor]));

    // Return sponsors in the same order as tags
    return sponsorTags
      .map((tag) => sponsorsMap.get(tag))
      .filter((sponsor) => sponsor !== undefined); // Remove any undefined entries
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load sponsors:', error);
    return [];
  }
}

async function loadEventSponsors() {
  const sponsors = await loadSponsors();

  if (sponsors.length > 0) {
    const placeholders = await fetchPlaceholders();
    const sponsorsTitle = createElement('div', { class: 'sponsors-title' }, placeholders.ourSponsors || 'Our Sponsors');

    const promoCarouselBlock = createElement('div', { class: 'promo-carousel' });
    sponsors.forEach((sponsor) => {
      const link = createElement('a', {
        href: sponsor.path,
        rel: 'external',
      });

      const img = createElement('img', {
        src: sponsor.img,
        alt: sponsor.tag.split('/')[1],
        title: sponsor.title,
      });

      link.appendChild(img);
      promoCarouselBlock.appendChild(link);
    });

    const main = document.querySelector('main');

    if (main) {
      const promoCarouselContainer = createElement('div', { class: 'promo-carousel-container' });
      promoCarouselContainer.appendChild(sponsorsTitle);
      promoCarouselContainer.appendChild(promoCarouselBlock);

      main.appendChild(promoCarouselContainer);
      decorateBlock(promoCarouselBlock);
      await loadBlock(promoCarouselBlock);
    }
  }

  const main = document.querySelector('main');

  if (main) {
    decorateLinks(main);
  }
}

function setupHeroStickyBehavior() {
  const gradientContainer = document.querySelector('.event-hero-gradient');
  if (!gradientContainer) return;

  let ticking = false;
  let originalTop = null;

  function updateHeroStickyState() {
    const rect = gradientContainer.getBoundingClientRect();

    if (originalTop === null) {
      originalTop = rect.top + window.scrollY;
    }

    const isSticky = window.scrollY > originalTop;
    const wasSticky = gradientContainer.classList.contains('is-sticky');

    if (isSticky !== wasSticky) {
      gradientContainer.classList.toggle('is-sticky', isSticky);

      const event = new CustomEvent('heroStickyChange', {
        detail: { isSticky, heroHeight: gradientContainer.offsetHeight },
      });
      window.dispatchEvent(event);
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateHeroStickyState);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

const decorateEventHero = (main, eventData) => {
  const heroContainer = main.querySelector('.hero-container picture').closest('div');

  const {
    eventIcon, startDate, endDate, byline,
  } = eventData || {};

  if (heroContainer) {
    const h1 = heroContainer.querySelector('h1');
    let icon = null;

    if (eventIcon) {
      icon = createElement('img', { src: eventIcon, alt: 'Event Icon', class: 'event-icon' });
      icon.setAttribute('aria-hidden', 'true');
      heroContainer.appendChild(icon);
    }

    if (startDate && endDate) {
      const formattedDate = formatDateRange(startDate, endDate);
      const calendarIcon = createIcon('calendar-month', 'xs');
      const dateElement = createElement('div', { class: 'event-date' }, [calendarIcon, ' ', formattedDate]);
      calendarIcon.setAttribute('aria-hidden', 'true');
      const contentWrapper = createElement('div', { class: 'event-content' }, [h1, dateElement]);
      if (h1 && h1.innerHTML.trim().toLowerCase().includes('run')) {
        h1.innerHTML = h1.innerHTML.replace('run', '<em>run</em>');
      }
      // Add byline above event-date if it exists
      if (byline) {
        const bylineDiv = createElement('div', { class: 'event-byline' }, byline);
        contentWrapper.insertBefore(bylineDiv, dateElement);
      }
      const timerElement = createTimerElement('event-timer');
      const gradientContainer = createElement('div', { class: 'event-hero-gradient' });

      if (eventData?.gradient) {
        gradientContainer.style.background = eventData.gradient;
      }

      const container = createElement('div', { class: 'event-hero' }, [...(icon ? [icon] : []), contentWrapper, timerElement]);
      gradientContainer.appendChild(container);
      heroContainer.appendChild(gradientContainer);

      if (startDate) {
        const timer = createCountdownTimer(startDate, timerElement);
        if (timer) {
          timer.start();
          container.dataset.timer = 'active';
        }
      }
    }
  }
  const tags = getMetadata('article:tag');
  if (!tags) return [];

  const tagList = tags.split(',').map((tag) => tag.trim());
  const locationTag = tagList.filter((tag) => tag.startsWith('locations/'));

  if (locationTag.length === 0) return [];

  getTag(locationTag).then((tag) => {
    const { title } = tag;

    if (title) {
      const locationElement = createElement('div', { class: 'event-location' }, [
        createIcon('disney-resort', 'xs'),
        title,
      ]);
      const eventDateElement = heroContainer.querySelector('.event-date');
      eventDateElement.appendChild(locationElement);
    }
  });

  setupHeroStickyBehavior();
  return true;
};

export { loadEventSponsors, decorateEventHero };
