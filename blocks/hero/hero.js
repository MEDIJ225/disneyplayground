import { buildBlock, decorateBlock, loadBlock } from '../../scripts/aem.js';
import { createIcon, createElement } from '../../utils/dom.js';

export default async function decorate(block) {
  const sectionContainer = block.closest('.section');

  if (sectionContainer.classList.contains('results-filter')) {
    const resultsFilterBlock = buildBlock('results-filter', []);
    const h1 = block.querySelector('h1');
    if (h1) {
      h1.parentNode.insertBefore(resultsFilterBlock, h1);
    } else {
      block.prepend(resultsFilterBlock);
    }
    decorateBlock(resultsFilterBlock);
    await loadBlock(resultsFilterBlock);
  } else if (sectionContainer.classList.contains('pyt-filter')) {
    const pytFilterBlock = buildBlock('pyt-filter', []);
    const h1 = block.querySelector('h1');
    if (h1) {
      h1.parentNode.insertBefore(pytFilterBlock, h1);
    } else {
      block.prepend(pytFilterBlock);
    }
    decorateBlock(pytFilterBlock);
    await loadBlock(pytFilterBlock);
  } else if (sectionContainer.classList.contains('overlay')) {
    const { icon } = sectionContainer.dataset;

    if (icon) {
      const isUrl = icon.includes('/') || icon.includes('.');
      let iconElement;

      if (isUrl) {
        iconElement = createElement('img', {
          class: 'hero-icon',
          src: icon,
          alt: '',
        });
      } else {
        const iconWrapper = createElement('div', { class: 'hero-icon' });
        iconWrapper.appendChild(createIcon(icon, 'xl'));
        iconElement = iconWrapper;
      }

      block.appendChild(iconElement);
    }
  }
}
