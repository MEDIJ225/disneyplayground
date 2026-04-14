import { loadFragment } from '../fragment/fragment.js';
import {
  buildBlock, decorateBlock, loadBlock, loadCSS, fetchPlaceholders,
} from '../../scripts/aem.js';
import { createElement } from '../../utils/dom.js';

if (!window.modalOpening) {
  window.modalOpening = false;
}
/*
  This is not a traditional block, so there is no decorate function.
  Instead, links to a /modals/ path are automatically transformed into a modal.
  Other blocks can also use the createModal() and openModal() functions.
*/

export async function createModal(contentNodes, externalUrl) {
  const placeholders = await fetchPlaceholders();
  await loadCSS(`${window.hlx.codeBasePath}/blocks/modal/modal.css`);
  const dialog = createElement('dialog');
  const dialogContent = createElement('div', { class: 'modal-content' });
  dialogContent.append(...contentNodes);
  if (externalUrl) {
    const externalLink = createElement('a', { href: externalUrl, class: 'button primary', target: '_blank' }, placeholders.continue || 'Continue');
    const strongLink = createElement('strong', {}, externalLink);
    const p = createElement('p', { class: 'button-container' }, strongLink);
    const section = dialogContent.querySelector('.columns.external-links > div > div');
    section.appendChild(p);

    // for accessibilty fix 237 &170 to make announce heading title when modal opens
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');

    // Find heading inside dialog
    const heading = dialogContent.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      // Ensure heading has an ID
      if (!heading.id) {
        heading.id = `dialog-title-${Math.random().toString(36).slice(2)}`;
      }
      dialog.setAttribute('aria-labelledby', heading.id);
    } else {
      // Remove if no heading available
      dialog.removeAttribute('aria-labelledby');
    }
  }
  dialog.append(dialogContent);

  const closeButton = createElement('button', { class: 'close-button', 'aria-label': placeholders.close || 'Close', type: 'button' }, '<span class="icon icon-close"></span>');
  closeButton.addEventListener('click', () => dialog.close());
  dialog.prepend(closeButton);

  const block = buildBlock('modal', '');
  document.querySelector('main').append(block);
  // decorateButtons(block);
  decorateBlock(block);
  await loadBlock(block);

  // close on click outside the dialog
  dialog.addEventListener('click', (e) => {
    const {
      left, right, top, bottom,
    } = dialog.getBoundingClientRect();
    const { clientX, clientY } = e;
    if (clientX < left || clientX > right || clientY < top || clientY > bottom) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    block.remove();
  });

  block.innerHTML = '';
  block.append(dialog);

  return {
    block,
    showModal: () => {
      const focusableSelectors = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const focusableElements = dialog.querySelectorAll(focusableSelectors);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      const lastActiveElement = document.activeElement; // save focus before opening

      dialog.showModal();
      setTimeout(() => { dialogContent.scrollTop = 0; }, 0);
      document.body.classList.add('modal-open');

      // Focus first focusable element
      firstElement?.focus();

      // Keydown listener for tab trapping
      const trapFocus = (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      dialog.addEventListener('keydown', trapFocus);
      dialog.showModal();
      document.body.classList.add('modal-open');
      requestAnimationFrame(() => {
        (firstElement || dialog).focus();
      });
      setTimeout(() => {
        dialogContent.scrollTop = 0;
      }, 0);

      // Restore focus when modal closes
      dialog.addEventListener('close', () => {
        dialog.removeEventListener('keydown', trapFocus);
        document.body.classList.remove('modal-open');
        lastActiveElement?.focus();
      }, { once: true });
    },
  };
}

export async function openModal(fragmentUrl, externalUrl) {
  if (window.modalOpening) return;
  window.modalOpening = true;
  try {
    const path = fragmentUrl.startsWith('http')
      ? new URL(fragmentUrl, window.location).pathname
      : fragmentUrl;

    const fragment = await loadFragment(path);
    const { showModal } = await createModal(fragment.childNodes, externalUrl);
    showModal();
  } finally {
    // Unlock AFTER initial modal has opened
    setTimeout(() => {
      window.modalOpening = false;
    }, 300);
  }
}
