import { getMetadata, decorateIcons, decorateButtons } from '../../scripts/aem.js';
import { decorateLinks } from '../../scripts/scripts.js';
import { createElement } from '../../utils/dom.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Process the footer-links div and convert to responsive column layout
 * @param {Element} footerLinks The footer-links div element
 */
function processFooterLinks(footerLinks) {
  const columnsContainer = footerLinks.querySelector('div > div');
  if (!columnsContainer) return;

  columnsContainer.className = 'footer-columns';
  const columns = columnsContainer.children;

  if (columns[2]) {
    columns[2].classList.add('footer-desktop-only');
  }

  [...columns].forEach((column) => {
    const headings = column.querySelectorAll('p strong');
    headings.forEach((h) => {
      const span = createElement('span', { class: 'footer-columns-title' });
      span.innerHTML = h.innerHTML;
      const pElement = h.closest('p');
      if (pElement) pElement.parentNode.replaceChild(span, pElement);
    });

    const socialLinksTarget = column.querySelector('p code');
    if (socialLinksTarget) {
      const socialLinksP = socialLinksTarget.parentElement;
      const socialLinksUl = socialLinksTarget.parentElement.nextElementSibling;
      if (socialLinksP && socialLinksUl) {
        column.classList.add('footer-social-links-container');
        socialLinksP.classList.add('footer-desktop-only');
        socialLinksUl.classList.add('footer-desktop-only', 'footer-social-links');
      }
    }
  });
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/fragments/footer';

  const resp = await fetch(
    `${footerPath}.plain.html`,
    window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {},
  );

  if (resp.ok) {
    const html = await resp.text();
    const footer = createElement('div', {}, html);

    const authoredPicture = footer.querySelector('picture');
    const footerLinks = footer.querySelector('.footer-links');

    if (authoredPicture && footerLinks) {
      const img = authoredPicture.querySelector('img');
      if (img) {
        footerLinks.style.backgroundImage = `url(${img.src})`;
        authoredPicture.parentElement.remove();
      }
    }
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Footer Navigation');
    const footerLegal = footer.querySelector('.footer-legal');

    [...footer.children].forEach((child) => {
      if (child !== footerLegal) {
        nav.appendChild(child);
      }
    });

    footer.innerHTML = '';
    footer.appendChild(nav);

    if (footerLegal) {
      footer.appendChild(footerLegal);
      const optAnonLinks = footerLegal.querySelectorAll('em > a');

      if (optAnonLinks.length > 0) {
        optAnonLinks.forEach((link) => {
          link.classList.add('optanon-show-settings');
          if (link.href) {
            link.href = '#';
            link.addEventListener('click', (event) => {
              event.preventDefault();
            });
          }
        });
      }
    }

    const footerContact = getMetadata('footer-contact');

    if (footerContact && footerContact !== 'false') {
      const isDefaultFooterContact = footerContact.toLowerCase() === 'true';
      const footerContactFragmentPath = isDefaultFooterContact ? '/fragments/contact/default' : new URL(footerContact, window.location).pathname;
      const footerContactFragment = await loadFragment(footerContactFragmentPath);

      if (footerContactFragment) {
        footerContactFragment.classList.add('footer-contact');
        footer.prepend(footerContactFragment);
      }
    }

    decorateIcons(footer);
    decorateButtons(footer);
    decorateLinks(footer);

    if (footerLinks) {
      processFooterLinks(footerLinks);
    }
    block.append(footer);
  }
}
