import {
  buildBlock, decorateBlock, loadBlock, fetchPlaceholders, getMetadata,
} from '../../scripts/aem.js';
import { createElement, createIcon } from '../../utils/dom.js';
import { getEventData } from '../../utils/event.js';
import {
  formatDateRange,
  parseDate,
} from '../../utils/date.js';
import fetchEventCategories from '../../utils/haku.js';
import getRaceRegistrationLink from '../../utils/race.js';
import { CTA_TYPES, updateRegistrationCTA } from '../../utils/registration-cta.js';

function buildEventCategoryCard(category, placeholders, eventId) {
  const {
    categoryName,
    categoryId,
    startDate,
    endDate,
    price,
    registrationLink,
    categoryImage,
    path,
  } = category;

  // Compute registration link if not provided
  const computedRegistrationLink = registrationLink
    || (eventId ? getRaceRegistrationLink(eventId) : null);

  const categoryTitle = categoryName || categoryId;
  const formattedDate = formatDateRange(startDate, endDate);

  const cardColumns = [];

  if (categoryImage) {
    const img = createElement('img', { src: categoryImage, alt: categoryTitle });
    const picture = createElement('picture', {}, [img]);
    cardColumns.push(picture.outerHTML);
  }

  // If title contains "runDisney", italicize "run"
  let titleContent = categoryTitle;
  if (categoryTitle && categoryTitle.toLowerCase().includes('rundisney')) {
    titleContent = categoryTitle.replace(/run/gi, '<em>run</em>');
  }

  const title = createElement('h3', {});
  title.innerHTML = titleContent;
  const calendarIcon = createIcon('calendar-month', 'xs');
  const dateText = createElement('span', {}, formattedDate);
  const date = createElement('p', { class: 'event-date' }, [calendarIcon, ' ', dateText]);
  calendarIcon.setAttribute('aria-hidden', 'true');
  const priceEl = createElement('p', { class: 'event-price' }, price);

  const registerButton = createElement('div', { class: 'register-button' });
  updateRegistrationCTA(registerButton, {
    type: CTA_TYPES.REGISTER_NOW,
    text: placeholders.registerNow || 'Register Now',
    href: computedRegistrationLink,
    className: 'button',
    openInNewTab: true,
    wrapInContainer: true,
  });

  const link = createElement('a', { href: path }, path);
  const linkParagraph = createElement('p', {}, [link]);

  const textContent = [
    title,
    linkParagraph,
    date,
    priceEl,
    registerButton,
  ].map((el) => el.outerHTML).join('');
  cardColumns.push(textContent);

  return cardColumns;
}

/**
 * Equalizes card heights in scrollable mode on smaller screens
 * @param {Element} block The block element
 */
function equalizeCardHeights(block) {
  if (window.matchMedia('(width >= 1024px)').matches) {
    return;
  }

  if (!block.classList.contains('scrollable')) {
    return;
  }

  const cards = block.querySelectorAll('.cards > ul > li');
  if (cards.length === 0) return;

  cards.forEach((card) => {
    card.style.height = 'auto';
  });

  let maxHeight = 0;
  cards.forEach((card) => {
    const height = card.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  if (maxHeight > 0) {
    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  }
}

/**
 * Sorts events by closest upcoming date
 * @param {Array} events - Array of events to sort
 * @returns {Array} Sorted events array
 */
function sortEventsByDate(events) {
  const now = Date.now();

  return events.sort((a, b) => {
    const dateA = parseDate(a.startDate || a.date)?.getTime() || 0;
    const dateB = parseDate(b.startDate || b.date)?.getTime() || 0;

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
 * loads and decorates the event-grid block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  try {
    const placeholders = await fetchPlaceholders();

    const hasAuthoredContent = Array.from(block.children).some((child) => child.querySelector('picture, img, h1, h2, h3, h4, h5, h6')
      || (child.textContent && child.textContent.trim().length > 10));

    if (hasAuthoredContent) {
      const cardsBlock = buildBlock('cards', []);
      cardsBlock.classList.add('shadow', 'clickable');

      while (block.firstChild) {
        cardsBlock.appendChild(block.firstChild);
      }

      block.innerHTML = '';
      block.appendChild(cardsBlock);
      decorateBlock(cardsBlock);
      await loadBlock(cardsBlock);

      // Check for Sold Out structure: <p><del><strong>Sold Out</strong></del></p>
      const cards = cardsBlock.querySelectorAll('.cards > ul > li');
      cards.forEach((card) => {
        const soldOutParagraph = card.querySelector('p > del > strong');
        if (soldOutParagraph) {
          const paragraph = soldOutParagraph.closest('p');
          const del = soldOutParagraph.closest('del');
          if (paragraph && del && paragraph.contains(del)) {
            const soldOutButton = createElement('button', { disabled: true }, 'Sold Out');
            const buttonContainer = createElement('p', { class: 'button-container' }, [soldOutButton]);
            paragraph.replaceWith(buttonContainer);
          }
        }
      });

      return;
    }

    const section = block.closest('.section');
    const eventIdFromSection = section?.dataset.eventId;
    const eventIdFromMetadata = getMetadata('event-id');
    const eventId = eventIdFromSection || eventIdFromMetadata;

    let eventData;
    if (eventId) {
      eventData = await getEventData(eventId);
    } else {
      eventData = await getEventData();
    }

    if (!eventData || !eventData.categories || !eventData.categories.length) {
      block.classList.add('empty');
      block.innerHTML = `<p>${placeholders.noEventCategories || 'No event races found. Please check back later.'}</p>`;
      return;
    }

    const eventLevelStatusOverride = getMetadata('status-override')
      || eventData.statusOverride
      || eventData['status-override'];
    const eventLevelRegistrationLink = getMetadata('registration-link')
      || eventData.registrationLink
      || eventData['registration-link'];

    const { registrationStartDate } = eventData;
    eventData.categories = sortEventsByDate(eventData.categories);

    const cardsContent = eventData.categories.map((category) => buildEventCategoryCard(
      category,
      placeholders,
      eventData.eventId,
    ));

    const cardsBlock = buildBlock('cards', cardsContent);
    cardsBlock.classList.add('shadow', 'clickable');

    block.innerHTML = '';
    block.appendChild(cardsBlock);
    decorateBlock(cardsBlock);
    await loadBlock(cardsBlock);

    equalizeCardHeights(block);

    const resizeObserver = new ResizeObserver(() => {
      equalizeCardHeights(block);
    });
    resizeObserver.observe(block);

    if (eventData.eventId) {
      const isRegistrationUpcoming = registrationStartDate
        && parseDate(registrationStartDate)?.getTime() > Date.now();

      eventData.categories.forEach((category, index) => {
        const cardElement = block.querySelector(`.cards > ul > li:nth-child(${index + 1})`);
        if (!cardElement) return;

        const registerButtonDiv = cardElement.querySelector('.register-button');
        if (!registerButtonDiv) return;

        let effectiveStatusOverride;
        let effectiveRegistrationLink;

        if (category.statusOverride) {
          effectiveStatusOverride = category.statusOverride;
          effectiveRegistrationLink = category.registrationLink;
        } else if (eventLevelStatusOverride) {
          effectiveStatusOverride = eventLevelStatusOverride;
          effectiveRegistrationLink = eventLevelRegistrationLink;
        }

        if (effectiveStatusOverride) {
          if (effectiveRegistrationLink && effectiveRegistrationLink.trim()) {
            updateRegistrationCTA(registerButtonDiv, {
              type: CTA_TYPES.REGISTER_NOW,
              text: effectiveStatusOverride,
              href: effectiveRegistrationLink,
              className: 'button',
              openInNewTab: true,
              wrapInContainer: true,
            });
          } else {
            updateRegistrationCTA(registerButtonDiv, {
              type: CTA_TYPES.SOLD_OUT,
              text: effectiveStatusOverride,
            });
          }
        } else if (isRegistrationUpcoming) {
          updateRegistrationCTA(registerButtonDiv, {
            type: CTA_TYPES.COMING_SOON,
            text: placeholders.registrationComingSoon || 'Registration coming soon',
          });
        } else {
          updateRegistrationCTA(registerButtonDiv, {
            type: CTA_TYPES.LOADING,
          });
        }
      });

      if (!isRegistrationUpcoming) {
        const needsHakuData = eventData.categories.some(
          (cat) => !cat.statusOverride && !eventLevelStatusOverride,
        );

        if (needsHakuData) {
          fetchEventCategories(eventData.eventId)
            .then((hakuData) => {
              eventData.categories.forEach((category, index) => {
                const hasOverride = category.statusOverride || eventLevelStatusOverride;
                if (hasOverride) {
                  return;
                }

                const hakuCategory = hakuData.find((cat) => cat.id === category.categoryId);
                const computedRegistrationLink = category.registrationLink
                  || (eventData.eventId ? getRaceRegistrationLink(eventData.eventId) : null);

                const cardElement = block.querySelector(`.cards > ul > li:nth-child(${index + 1})`);
                if (cardElement) {
                  const registerButtonDiv = cardElement.querySelector('.register-button');
                  if (registerButtonDiv) {
                    if (!hakuCategory) {
                      // eslint-disable-next-line no-console
                      console.warn(`Category ${category.categoryId} not found in Haku data for event ${eventId}`);
                      updateRegistrationCTA(registerButtonDiv, {
                        type: CTA_TYPES.REGISTER_NOW,
                        text: placeholders.registerNow || 'Register Now',
                        href: computedRegistrationLink,
                        className: 'button',
                        openInNewTab: true,
                        wrapInContainer: true,
                      });
                    } else if (hakuCategory.isAvailable) {
                      updateRegistrationCTA(registerButtonDiv, {
                        type: CTA_TYPES.REGISTER_NOW,
                        text: placeholders.registerNow || 'Register Now',
                        href: computedRegistrationLink,
                        className: 'button',
                        openInNewTab: true,
                        wrapInContainer: true,
                      });
                    } else {
                      updateRegistrationCTA(registerButtonDiv, {
                        type: CTA_TYPES.SOLD_OUT,
                        text: placeholders.soldOut || 'Sold Out',
                        wrapInContainer: true,
                      });
                    }
                  }
                }
              });

              equalizeCardHeights(block);
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log('Haku data fetch failed:', error);
              eventData.categories.forEach((category, index) => {
                const hasOverride = category.statusOverride || eventLevelStatusOverride;
                if (hasOverride) {
                  return;
                }

                const computedRegistrationLink = category.registrationLink
                  || (eventData.eventId ? getRaceRegistrationLink(eventData.eventId) : null);

                const cardElement = block.querySelector(`.cards > ul > li:nth-child(${index + 1})`);
                if (cardElement) {
                  const registerButtonDiv = cardElement.querySelector('.register-button');
                  if (registerButtonDiv) {
                    updateRegistrationCTA(registerButtonDiv, {
                      type: CTA_TYPES.REGISTER_NOW,
                      text: placeholders.registerNow || 'Register Now',
                      href: computedRegistrationLink,
                      className: 'button',
                      openInNewTab: true,
                      wrapInContainer: true,
                    });
                  }
                }
              });

              equalizeCardHeights(block);
            });
        }
      }
    }
  } catch (error) {
    const placeholders = await fetchPlaceholders();
    block.innerHTML = `<p>${placeholders.failedLoadEventCategories || 'Failed to load event categories:'} ${error.message}</p>`;
  }
}
