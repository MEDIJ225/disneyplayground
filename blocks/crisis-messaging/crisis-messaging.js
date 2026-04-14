import { fetchPlaceholders } from '../../scripts/aem.js';
import { createElement } from '../../utils/dom.js';

const placeholders = await fetchPlaceholders();
export default function decorate(block) {
  if (block.classList.contains('close-button')) {
    const closeButtonSpan = createElement('span', { class: 'icon icon-close' });
    const closeButton = createElement('button', { class: 'close-button', 'aria-label': placeholders.close || 'Close', type: 'button' }, closeButtonSpan);
    closeButton.addEventListener('click', (e) => {
      e.preventDefault();
      const parentSection = block.closest('.section');
      if (parentSection) {
        parentSection.remove();
      }
    });

    block.prepend(closeButton);
  }
}
