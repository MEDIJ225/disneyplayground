import { createElement, createIcon } from '../../utils/dom.js';
import formatToRDPrefix from '../../utils/analyticsModifier.js';

export default function decorate(block) {
  const accordionItems = block.querySelectorAll(':scope > div');

  accordionItems.forEach((item) => {
    const [header, content] = item.children;

    if (!header || !content) return;

    const details = createElement('details', { class: 'accordion-item' });

    const summary = createElement('summary', {}, [
      createIcon('norgie-opened'),
      createElement('span', { class: 'accordion-title' }, header.textContent),
    ]);

    const accordionContent = createElement('div', {}, content.innerHTML);

    details.appendChild(summary);
    details.appendChild(accordionContent);
    block.appendChild(details);
  });

  block.querySelectorAll(':scope > div:not(.accordion-item)').forEach((div) => div.remove());
  const summaries = block.querySelectorAll('.accordion-summary');

  // Add analytics tracking for accordion item clicks
  block.querySelectorAll('.accordion-title').forEach((item) => {
    item.addEventListener('click', () => {
      if (window.s_wdpro && typeof window.s_wdpro.trackClick === 'function') {
        if (block.classList.contains('faq')) {
          window.s_wdpro.trackClick(item, formatToRDPrefix(item.textContent, 'RD_FAQ_'));
        } else {
          window.s_wdpro.trackClick(item, formatToRDPrefix(item.textContent));
        }
      }
    });
  });

  summaries.forEach((summary) => {
    summary.addEventListener('click', () => {
      const details = summary.parentElement;

      // wait for native <details> open/close behaviour
      requestAnimationFrame(() => {
        const isOpen = details.hasAttribute('open');
        summary.setAttribute('aria-expanded', isOpen);

        if (isOpen) {
          // Scroll for screen readers like JAWS
          details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

          // Optional: move cursor only when user opens with keyboard
          if (document.activeElement === summary) {
            const region = summary.nextElementSibling;
            region.focus({ preventScroll: true });
          }
        }
      });
    });
  });
}
