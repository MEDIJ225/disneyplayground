import { createElement, createIcon } from '../../utils/dom.js';

export default function decorate(block) {
  const list = createElement('div', { class: 'download-list' });

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length < 3) return;

    // Simple text extraction from each cell
    const leftText = cells[0];
    const description = cells[1];
    const link = cells[2].querySelector('a');
    const href = link ? link.getAttribute('href') : '';

    // Build left column (single text block)
    const left = createElement('div', { class: 'dl-left' }, [
      createElement('div', { class: 'dl-primary' }, leftText),
    ]);

    // Middle column
    const middle = createElement('div', { class: 'dl-middle' }, description);

    // Right column with download link and icon
    const isPDF = href.toLowerCase().endsWith('.pdf');
    const iconType = isPDF ? 'pdf' : 'download';

    const right = createElement('div', { class: 'dl-right' }, [
      createElement('a', {
        href,
        target: '_blank',
      }, [
        createElement('span', { class: 'dl-divider', 'aria-hidden': 'true' }),
        createIcon(iconType),
        createElement('span', { class: 'dl-download-label' }, 'Download'),
      ]),
    ]);

    // Combine into item
    const item = createElement('div', { class: 'download-item' }, [left, middle, right]);
    list.append(item);
  });

  // Clear original content and add the new list
  block.textContent = '';
  block.append(list);
}
