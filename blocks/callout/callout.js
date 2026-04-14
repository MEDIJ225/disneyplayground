import { createElement, createIcon } from '../../utils/dom.js';

export default function decorate(block) {
  const isImageVariant = block.classList.contains('plain');
  const calloutItems = createElement('div', { class: 'callout-items' });

  [...block.children].forEach((child) => {
    if (!isImageVariant) {
      child.classList.add('callout-clickable');
    }
    const icon = child.querySelector('.icon, [class*="icon__"], [class*="icon-"]');
    const link = child.querySelector('a');
    const linkHref = link ? link.href : null;

    if (icon) {
      icon.remove();
    }
    const content = createElement('div', { class: 'callout-content' });
    while (child.firstChild) {
      content.appendChild(child.firstChild);
    }

    const linkInContent = content.querySelector('a');
    if (linkInContent && !isImageVariant) {
      linkInContent.remove();
    }

    child.textContent = '';

    if (icon) {
      const iconContainer = createElement('div', { class: 'callout-icon' }, icon);
      child.appendChild(iconContainer);
    }

    child.appendChild(content);

    if (linkHref && !isImageVariant) {
      child.setAttribute('role', 'link');
      child.setAttribute('tabindex', '0');
      child.setAttribute('aria-label', child.innerText.trim());

      const chevron = createIcon('next');
      chevron.classList.add('callout-chevron');
      child.appendChild(chevron);

      child.addEventListener('click', () => {
        window.location.href = linkHref;
      });

      child.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.location.href = linkHref;
        }
      });
    }
    calloutItems.appendChild(child);
  });

  block.textContent = '';
  block.appendChild(calloutItems);
}
