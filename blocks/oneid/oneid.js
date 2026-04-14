import { createElement } from '../../utils/dom.js';

/**
 * Determines if the current environment is production
 * @returns {boolean} true if production, false if non-production
 */
function isProduction() {
  const { hostname } = window.location;
  return hostname.includes('rundisney.com');
}

/**
 * Gets the environment-specific configuration
 * @returns {object} Configuration object with clientId, responderPage, and scriptUrl
 */
function getConfig() {
  const isProd = isProduction();
  const { hostname } = window.location;
  return {
    clientId: 'TPR-RUNDISNEY.WEB',
    responderPage: isProd
      ? 'https://www.rundisney.com/didresponder.html'
      : `https://${hostname}/didresponder.html`,
    scriptUrl: isProd
      ? 'https://cdn.registerdisney.go.com/v4/OneID.js'
      : 'https://stg.cdn.registerdisney.go.com/v4/OneID.js',
  };
}

/**
 * Loads the OneID script dynamically
 * @param {string} scriptUrl The URL of the OneID script
 * @returns {Promise<void>} Promise that resolves when the script is loaded
 */
function loadOneIDScript(scriptUrl) {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.OneID) {
      resolve();
      return;
    }

    // Check if script is already being loaded
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', resolve);
      existingScript.addEventListener('error', reject);
      return;
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.async = true;
    script.id = 'disneyid-script';
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load OneID script from ${scriptUrl}`));
    document.head.appendChild(script);
  });
}

/**
 * Initializes OneID and launches newsletters
 * @param {string} clientId The client ID for OneID
 * @param {string} responderPage The responder page URL
 * @param {object} customReporting Optional custom reporting data
 */
async function initializeOneID(clientId, responderPage, customReporting = {}) {
  try {
    if (!window.OneID) {
      // eslint-disable-next-line no-console
      console.error('OneID is not loaded');
      return;
    }

    const oidConfig = {
      clientId,
      alternateConfig: '',
      responderPage,
      debug: false,
    };
    const oneid = window.OneID.get(oidConfig);
    await oneid.init();
    const defaultReporting = {
      source: 'Email Sign-up',
      context: 'Registration',
      custom1: '',
      custom2: '',
      custom3: '',
    };
    const reporting = { ...defaultReporting, ...customReporting };
    oneid.launchNewsletters('runDisney', {
      optionalConfigs: {
        reporting,
      },
    });
    // add event listeners
    oneid.on('close', () => {
      // check the previous page.
      // if it is the same as '/email-signup' then send them back to the home page
      const previousPage = window.history.state.back;
      if (previousPage.includes('/email-signup')) {
        window.location.href = '/';
      } else {
        window.location.href = previousPage;
      }
    });
    oneid.on('opt-in', () => {
      // go to confirmation page
      window.location.href = '/email-signup/thank-you';
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize OneID:', error);
  }
}

/**
 * Loads and decorates the OneID block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  try {
    const { clientId, responderPage, scriptUrl } = getConfig();
    await loadOneIDScript(scriptUrl);
    block.textContent = '';
    const div = createElement('div', { id: 'oneid-wrapper' });
    block.appendChild(div);
    await initializeOneID(clientId, responderPage);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to initialize OneID:', error);
    block.classList.add('error');
  }
}
