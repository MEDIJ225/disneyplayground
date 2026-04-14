import { createElement, createIcon } from '../../utils/dom.js';
import { getEventData } from '../../utils/event.js';
import { formatDateRange } from '../../utils/date.js';
import { createTimerElement, createCountdownTimer } from '../../utils/timer.js';
import { fetchPlaceholders, getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the event-header block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const section = block.closest('.section');
  const eventIdFromSection = section?.dataset.eventId;
  const eventIdFromMetadata = getMetadata('event-id');
  const eventId = eventIdFromSection || eventIdFromMetadata;

  let images = Array.from(block.querySelectorAll('img'));

  if (images.length === 0 && eventId) {
    try {
      const eventData = await getEventData(eventId);
      if (eventData?.landingFragment) {
        const fragment = await loadFragment(eventData.landingFragment);
        if (fragment) {
          images = Array.from(fragment.querySelectorAll('img'));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to load fragment for event header:', error);
    }
  }

  if (images.length === 0) {
    return;
  }

  const container = createElement('div', { class: 'event-header-masonry' });
  let timerSection = null;

  try {
    let eventData = null;
    if (block.dataset.eventData) {
      try {
        eventData = JSON.parse(block.dataset.eventData);
        if (block.dataset.blockId && section?.dataset.blockId !== block.dataset.blockId) {
          // eslint-disable-next-line no-console
          console.warn('Block ID mismatch, clearing event data');
          eventData = null;
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to parse event data from dataset:', error);
      }
    }

    if (!eventData) {
      eventData = await getEventData(eventId);
    }

    const placeholders = await fetchPlaceholders();

    const effectiveEventId = eventData?.eventId || eventData?.id || eventId;

    if (eventData && effectiveEventId) {
      timerSection = createElement('div', { class: 'event-header-timer' });

      if (eventData.gradient) {
        timerSection.style.background = eventData.gradient;
      }

      const {
        eventIcon, startDate, endDate, title, path, byline,
      } = eventData;

      if (eventIcon) {
        const icon = createElement('img', {
          src: eventIcon,
          alt: 'Event Icon',
          class: 'event-header-icon',
          'aria-hidden': 'true',
        });
        timerSection.appendChild(icon);
      }

      if (title) {
        const cleanTitle = title.replace(/\s*\|.*/gi, '');
        const emphasizedTitle = cleanTitle.replace('run', '<em>run</em>');
        const titleElement = createElement('h2', { class: 'event-header-title' }, emphasizedTitle);
        titleElement.innerHTML = emphasizedTitle;
        timerSection.appendChild(titleElement);
      }

      if (byline) {
        const bylineElement = createElement('div', { class: 'event-header-byline' }, byline);
        timerSection.appendChild(bylineElement);
      }

      if (startDate && endDate) {
        const formattedDate = formatDateRange(startDate, endDate);
        const calendarIcon = createIcon('calendar-month', 'xs');
        calendarIcon.setAttribute('aria-hidden', 'true');
        const dateElement = createElement('div', { class: 'event-header-date' }, [calendarIcon, ' ', formattedDate]);
        timerSection.appendChild(dateElement);
      }

      if (startDate) {
        const timerElement = createTimerElement();
        timerSection.appendChild(timerElement);

        const timer = createCountdownTimer(startDate, timerElement);
        if (timer) {
          timer.start();
        }
      }

      const viewDetailsLink = createElement('a', {
        href: path || '#',
        class: 'event-header-button',
      }, placeholders.viewDetails || 'View Details');
      timerSection.appendChild(viewDetailsLink);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load event data for header:', error);
  }

  if (timerSection) {
    container.appendChild(timerSection);
  }

  const imagesSection = createElement('div', { class: 'event-header-images' });

  const firstImage = images[0];
  const firstImageContainer = createElement('div', { class: 'event-header-main' });
  firstImageContainer.appendChild(firstImage);
  imagesSection.appendChild(firstImageContainer);

  if (images.length > 1) {
    const gridContainer = createElement('div', { class: 'event-header-grid' });

    const remainingImages = images.slice(1);

    remainingImages.forEach((img) => {
      const imageContainer = createElement('div', { class: 'event-header-item' });
      imageContainer.appendChild(img);
      gridContainer.appendChild(imageContainer);
    });

    imagesSection.appendChild(gridContainer);
  }

  container.appendChild(imagesSection);

  block.innerHTML = '';
  block.appendChild(container);
}
