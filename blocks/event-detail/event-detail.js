import {
  decorateButtons, getMetadata, fetchPlaceholders,
} from '../../scripts/aem.js';
import { getEventData } from '../../utils/event.js';
import fetchEventCategories from '../../utils/haku.js';
import { createElement } from '../../utils/dom.js';
import createShareButton from '../../utils/share.js';
import getRaceRegistrationLink from '../../utils/race.js';
import { parseDate } from '../../utils/date.js';
import { CTA_TYPES, updateRegistrationCTA } from '../../utils/registration-cta.js';

function setupFootnoteScrolling() {
  // 1. Find all star footnote links: *, **, ***, etc.
  const starLinks = [...document.querySelectorAll('a')].filter((a) => {
    const text = a.innerHTML.trim();
    return /^[*]+$/.test(text); // text must be * or ** or ***
  });

  starLinks.forEach((link) => {
    // 2. Extract the class from href → ?one-star-footnote
    const href = link.getAttribute('href') || '';
    // const footnoteClass = href.includes('?') ? href.split('?')[1] : null;
    let footnoteClass = null;

    // Use array destructuring for match result
    const [, extracted] = href.match(/footnote=([^&]+)/) || [];
    footnoteClass = extracted; // star-one, star-two, etc.

    if (!footnoteClass) return;

    // 3. Find the matching footnote section
    const targetSection = document.querySelector(`.section.${footnoteClass}`);
    if (!targetSection) return;

    // 4. Scroll smoothly instead of navigating
    link.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });
}

/**
 * Sets title attribute on all buttons: button text + first heading text
 * @param {Element} block The block element
 */
function setButtonTitles(block) {
  const headingElement = block.querySelector('h1, h2, h3, h4, h5, h6');
  const headingText = headingElement ? headingElement.textContent.trim() : '';
  if (!headingText) return;

  const buttons = block.querySelectorAll('a.button, button, a[class*="button"]');
  buttons.forEach((button) => {
    const buttonText = button.textContent.trim();
    if (buttonText) {
      button.setAttribute('aria-label', `${buttonText} ${headingText}`);
    }
  });
}

/**
 * loads and decorates the event-detail block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  const placeholders = await fetchPlaceholders();
  const section = block.closest('.section');
  const categoryIdFromSection = section?.dataset.categoryId;
  const categoryIdFromMetadata = getMetadata('category-id');
  const categoryId = categoryIdFromSection || categoryIdFromMetadata;
  const registrationLinkFromSection = section?.dataset.registrationLink;
  const registrationLinkFromMetadata = getMetadata('registration-link');
  const raceLevelRegistrationLink = registrationLinkFromSection || registrationLinkFromMetadata;
  const statusOverrideFromSection = section?.dataset.statusOverride;
  const statusOverrideFromMetadata = getMetadata('status-override');
  const raceLevelStatusOverride = statusOverrideFromSection || statusOverrideFromMetadata;
  const eventIdFromMetadata = getMetadata('event-id');
  const eventData = await getEventData();
  const { eventId: eventIdFromData, registrationStartDate } = eventData || {};
  const eventId = eventIdFromMetadata || eventIdFromData;

  let eventLevelStatusOverride = null;
  let eventLevelRegistrationLink = null;

  if (categoryId && eventId) {
    const currentPath = window.location.pathname;
    const events = await window.fetchEventData();
    const parentEvent = events.find((event) => currentPath.startsWith(`${event.path}/`));

    if (parentEvent) {
      eventLevelStatusOverride = parentEvent.statusOverride || parentEvent['status-override'];
      eventLevelRegistrationLink = parentEvent.registrationLink || parentEvent['registration-link'];
    }
  }

  let statusOverride;
  let registrationLink;

  if (raceLevelStatusOverride) {
    statusOverride = raceLevelStatusOverride;
    registrationLink = raceLevelRegistrationLink;
  } else if (eventLevelStatusOverride) {
    statusOverride = eventLevelStatusOverride;
    registrationLink = eventLevelRegistrationLink;
  } else {
    statusOverride = null;
    registrationLink = raceLevelRegistrationLink;
  }

  const isRegistrationUpcoming = registrationStartDate
    && parseDate(registrationStartDate)?.getTime() > Date.now();

  // Apply column styling and image wrapper classes
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  block.classList.forEach((className) => {
    if (/^\d/.test(className)) {
      const columnSplitClass = `col-${className}`;
      block.classList.replace(className, columnSplitClass);
    }
  });

  [...block.children].forEach((row) => {
    const columns = [...row.children];

    columns.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }

        const shareButton = createShareButton({
          ariaLabel: 'Share this event',
          tooltipTitle: 'Share this event',
        });
        pic.after(shareButton);
      }
    });
  });

  decorateButtons(block);

  let contentColumn = null;
  [...block.children].forEach((row) => {
    const columns = [...row.children];
    columns.forEach((col) => {
      const pic = col.querySelector('picture');
      if (!pic && !contentColumn) {
        contentColumn = col;
      }
    });
  });

  if (!contentColumn && block.firstElementChild) {
    contentColumn = block.firstElementChild.firstElementChild;
  }

  if (contentColumn) {
    const computedRegistrationLink = registrationLink
      || (eventId ? getRaceRegistrationLink(eventId) : null);

    const buttonContainer = createElement('div', { class: 'register-button' });

    if (statusOverride) {
      if (registrationLink && registrationLink.trim()) {
        updateRegistrationCTA(buttonContainer, {
          type: CTA_TYPES.REGISTER_NOW,
          text: statusOverride,
          href: registrationLink,
          className: 'button primary',
          openInNewTab: true,
          wrapInContainer: true,
        });
      } else {
        updateRegistrationCTA(buttonContainer, {
          type: CTA_TYPES.SOLD_OUT,
          text: statusOverride,
        });
      }
      contentColumn.appendChild(buttonContainer);
      setButtonTitles(block);
      return;
    }

    if (isRegistrationUpcoming) {
      updateRegistrationCTA(buttonContainer, {
        type: CTA_TYPES.COMING_SOON,
        text: placeholders.registrationComingSoon || 'Registration coming soon',
      });
      contentColumn.appendChild(buttonContainer);
      setButtonTitles(block);
      return;
    }

    if (computedRegistrationLink) {
      if (eventId && categoryId) {
        // Show initial register button
        const defaultButton = createElement('a', {
          href: computedRegistrationLink,
          target: '_blank',
        }, placeholders.registerNow || 'Register Now');
        const strong = createElement('strong', {}, [defaultButton]);
        const paragraph = createElement('p', {}, [strong]);
        buttonContainer.appendChild(paragraph);
        contentColumn.appendChild(buttonContainer);

        fetchEventCategories(eventId)
          .then((hakuData) => {
            const hakuCategory = hakuData.find((cat) => cat.id === categoryId);

            if (!hakuCategory) {
              // eslint-disable-next-line no-console
              console.warn(`Category ${categoryId} not found in Haku data for event ${eventId}`);
              updateRegistrationCTA(buttonContainer, {
                type: CTA_TYPES.REGISTER_NOW,
                text: placeholders.registerNow || 'Register Now',
                href: computedRegistrationLink,
                className: 'button primary',
                openInNewTab: true,
                wrapInContainer: true,
              });
              setButtonTitles(block);
              return;
            }

            if (!hakuCategory.isAvailable) {
              updateRegistrationCTA(buttonContainer, {
                type: CTA_TYPES.SOLD_OUT,
                text: placeholders.soldOut || 'Sold Out',
                wrapInContainer: true,
              });
            } else {
              updateRegistrationCTA(buttonContainer, {
                type: CTA_TYPES.REGISTER_NOW,
                text: placeholders.registerNow || 'Register Now',
                href: computedRegistrationLink,
                className: 'button primary',
                openInNewTab: true,
                wrapInContainer: true,
              });
            }
            setButtonTitles(block);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log('Haku data fetch failed:', error);
            updateRegistrationCTA(buttonContainer, {
              type: CTA_TYPES.REGISTER_NOW,
              text: placeholders.registerNow || 'Register Now',
              href: computedRegistrationLink,
              className: 'button primary',
              openInNewTab: true,
              wrapInContainer: true,
            });
            setButtonTitles(block);
          });
      } else {
        const registerButton = createElement('a', {
          href: computedRegistrationLink,
          target: '_blank',
        }, placeholders.registerNow || 'Register Now');
        const strongElem = createElement('strong', {}, [registerButton]);
        const paragraph = createElement('p', {}, [strongElem]);
        buttonContainer.appendChild(paragraph);
        contentColumn.appendChild(buttonContainer);
      }
    }
  }

  // APPLY CHECK ICONS
  document.querySelectorAll('.checklist > div > div > ul > li').forEach((li) => {
    if (li.querySelector(':scope > .check-icon')) return;
    const icon = document.createElement('i');
    icon.className = 'icon icon__check check-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('tabindex', '-1');
    li.insertBefore(icon, li.firstChild);
  });

  // Set title attribute on all buttons: button text + h3 text
  setButtonTitles(block);
  setupFootnoteScrolling();
}
