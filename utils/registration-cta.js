import { createElement } from './dom.js';

/**
 * CTA Types
 */
export const CTA_TYPES = {
  REGISTRATION_STARTS: 'registration-starts',
  COMING_SOON: 'coming-soon',
  REGISTER_NOW: 'register-now',
  SOLD_OUT: 'sold-out',
  LOADING: 'loading',
};

/**
 * Creates a registration CTA element
 * @param {Object} options - Configuration options
 * @param {string} options.type - Type of CTA (from CTA_TYPES)
 * @param {string} [options.text] - Button/link text
 * @param {string} [options.href] - Link URL (for clickable CTAs)
 * @param {string} [options.className] - Additional CSS classes
 * @param {boolean} [options.openInNewTab=false] - Whether to open link in new tab
 * @param {boolean} [options.wrapInContainer=false] - Wrap in paragraph with button-container class
 * @returns {HTMLElement} The CTA element (button, link, or wrapped element)
 */
export function createRegistrationCTA({
  type,
  text,
  href,
  className = 'button',
  openInNewTab = false,
  wrapInContainer = false,
}) {
  let element;

  switch (type) {
    case CTA_TYPES.REGISTRATION_STARTS:
    case CTA_TYPES.COMING_SOON:
    case CTA_TYPES.SOLD_OUT:
      element = createElement('button', { disabled: true }, text);
      break;

    case CTA_TYPES.REGISTER_NOW:
      element = createElement('a', {
        href,
        class: className,
        ...(openInNewTab && { target: '_blank' }),
      }, text);
      break;

    case CTA_TYPES.LOADING:
      element = createElement('div', { class: 'loading-pulse' });
      break;

    default:
      throw new Error(`Unknown CTA type: ${type}`);
  }

  if (wrapInContainer && type !== CTA_TYPES.LOADING) {
    return createElement('p', { class: 'button-container' }, [element]);
  }

  return element;
}

/**
 * Replaces the content of a container with a new registration CTA
 * @param {HTMLElement} container - The container element to update
 * @param {Object} ctaOptions - Options to pass to createRegistrationCTA
 */
export function updateRegistrationCTA(container, ctaOptions) {
  if (!container) return;

  container.innerHTML = '';
  container.appendChild(createRegistrationCTA(ctaOptions));
}
