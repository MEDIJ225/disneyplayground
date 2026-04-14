import {
  buildBlock,
  decorateBlock,
  loadBlock,
  fetchPlaceholders,
  getMetadata,
  readBlockConfig,
} from '../../scripts/aem.js';
import { fetchEventData } from '../../scripts/scripts.js';
import { createElement } from '../../utils/dom.js';

/**
 * Gets events filtered by location tag
 * @param {string} locationTag - Location tag to filter
 * @returns {Promise<Array>} Array of events matching the location
 */
async function getEventsByLocation(locationTag) {
  try {
    const events = await fetchEventData();

    return events.filter((event) => {
      if (event.tags && Array.isArray(event.tags)) {
        return event.tags.includes(locationTag);
      }
      return false;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch events by location:', error);
    return [];
  }
}

/**
 * Sorts events by closest upcoming date
 * @param {Array} events - Array of events to sort
 * @returns {Array} Sorted events array
 */
function sortEventsByDate(events) {
  const now = new Date().getTime() / 1000;

  return events.sort((a, b) => {
    const dateA = a.startDate || a.date || 0;
    const dateB = b.startDate || b.date || 0;

    const isAPast = dateA < now;
    const isBPast = dateB < now;

    if (isAPast && isBPast) {
      return dateB - dateA;
    }

    if (isAPast) return 1;
    if (isBPast) return -1;

    return dateA - dateB;
  });
}

/**
 * Fetches images from a landing fragment URL
 * @param {string} landingFragmentUrl - URL to the landing fragment
 * @returns {Promise<Array>} Array of image elements
 */
async function fetchLandingFragmentImages(landingFragmentUrl) {
  try {
    const response = await fetch(landingFragmentUrl);
    if (!response.ok) {
      return [];
    }

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const images = Array.from(doc.querySelectorAll('img'));
    return images.map((img) => {
      const clonedImg = img.cloneNode(true);
      if (clonedImg.src && clonedImg.src.startsWith('./')) {
        const baseUrl = landingFragmentUrl.replace(/\/[^/]*$/, '/');
        clonedImg.src = clonedImg.src.replace('./', baseUrl);
      }
      return clonedImg;
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch landing fragment images:', error);
    return [];
  }
}

/**
 * Creates an event-header block for a specific event
 * @param {Object} event - Event data
 * @returns {Element} Decorated event-header block
 */
async function createEventHeaderBlock(event) {
  const eventHeaderBlock = buildBlock('event-header', []);
  const uniqueId = `event-header-${event.eventId || event.id}-${Date.now()}`;
  const section = createElement('div', {
    class: 'section event-header-wrapper',
    'data-event-id': event.eventId || event.id,
    'data-block-id': uniqueId,
  });
  section.appendChild(eventHeaderBlock);

  if (event.landingFragment) {
    const images = await fetchLandingFragmentImages(event.landingFragment);
    images.forEach((img) => {
      eventHeaderBlock.appendChild(img);
    });
  }

  eventHeaderBlock.dataset.eventData = JSON.stringify(event);
  eventHeaderBlock.dataset.blockId = uniqueId;

  decorateBlock(eventHeaderBlock);
  await loadBlock(eventHeaderBlock);

  return section;
}

/**
 * Creates an event-grid block for a specific event
 * @param {Object} event - Event data
 * @param {string} variant - Optional variant to apply to the block
 * @returns {Element} Decorated event-grid block
 */
async function createEventGridBlock(event, variant = null) {
  const eventGridBlock = buildBlock('event-grid', []);

  const section = createElement('div', { class: 'section', 'data-event-id': event.eventId || event.id });
  section.appendChild(eventGridBlock);
  decorateBlock(eventGridBlock);
  await loadBlock(eventGridBlock);

  if (variant) {
    eventGridBlock.classList.add(variant);
  }

  return section;
}

/**
 * loads and decorates the events-landing block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  try {
    const placeholders = await fetchPlaceholders();
    let locationTag = null;

    const tags = getMetadata('article:tag');
    if (tags) {
      const tagList = tags.split(',').map((tag) => tag.trim());
      const locationTags = tagList.filter((tag) => tag.startsWith('locations/'));
      if (locationTags.length > 0) {
        [locationTag] = locationTags;
      }
    }

    if (!locationTag) {
      const config = readBlockConfig(block);
      locationTag = config.location;
    }

    if (!locationTag) {
      block.innerHTML = `<p>${placeholders.noLocationSpecified || 'No location specified. Please add a location tag to the page tags or block configuration.'}</p>`;
      return;
    }

    const events = await getEventsByLocation(locationTag);

    if (!events || events.length === 0) {
      block.innerHTML = `<p>${placeholders.noEventsFound || `No events found for location: ${locationTag}`}</p>`;
      return;
    }

    const sortedEvents = sortEventsByDate(events);

    const isScrollable = block.classList.contains('scrollable');

    block.innerHTML = '';

    const processEvent = async (event) => {
      // Only render event-header and event-grid if event has child events (categories)
      if (event.categories && Array.isArray(event.categories) && event.categories.length > 0) {
        const eventHeaderSection = await createEventHeaderBlock(event);
        block.appendChild(eventHeaderSection);

        const eventGridSection = await createEventGridBlock(event, isScrollable ? 'scrollable' : null);
        block.appendChild(eventGridSection);
      }
    };

    // Use reduce to process sequentially
    await sortedEvents.reduce(async (previousPromise, event) => {
      await previousPromise;
      return processEvent(event);
    }, Promise.resolve());
  } catch (error) {
    const placeholders = await fetchPlaceholders();
    block.innerHTML = `<p>${placeholders.failedLoadEvents || 'Failed to load events:'} ${error.message}</p>`;
  }
}
