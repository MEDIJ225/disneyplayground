import { createOptimizedPicture } from '../../scripts/aem.js';
import { hideDecorativeIconsInBlock, decorateLinks } from '../../scripts/scripts.js';

function applyCardColor(block) {
  if (!block) return;
  const items = block.querySelectorAll('ul > li');
  if (!items.length) return;

  items.forEach((li) => {
    const paragraphs = li.querySelectorAll(
      '.cards-card-body:first-child p',
    );

    if (!paragraphs.length) return;
    const bgColor = paragraphs[0].textContent.trim();
    const textColor = paragraphs[1]?.textContent.trim();
    li.style.backgroundColor = bgColor;
    if (textColor) {
      li.querySelectorAll('.cards-card-body').forEach((body) => {
        body.style.color = textColor;
        if (block.closest('.promo-grid')) {
          const arrow = body.querySelector('.arrow-span');
          arrow.style.borderBottomColor = bgColor;
        }
      });
    }
    paragraphs[0].remove();
    if (paragraphs[1]) paragraphs[1].remove();
  });
}

function applyMobileCardBg(block) {
  const section = block.closest('.rectangle-image-container');
  if (!section) return;
  const bgImage = section.dataset.backgroundImage;
  if (!bgImage) return;
  if (window.matchMedia('(min-width: 1024px)').matches) return;
  block.querySelectorAll('ul > li').forEach((li) => {
    li.classList.add('cards-bg-image');
    li.style.backgroundImage = `url(${bgImage})`;
  });
}

export default function decorate(block) {
  const thickBorderCard = block.closest('.thick-border');
  if (thickBorderCard) {
    thickBorderCard.classList.add('clickable');
  }

  if (block.classList.contains('rectangle-hover')) {
    if (block.querySelector('a')) {
      block.classList.add('clickable');
    }
    block.classList.add('rectangle-image');
  }
  if (block.classList.contains('card-group')) {
    if (block.querySelector('a')) {
      block.classList.add('clickable');
    }
  }
  const ul = document.createElement('ul');
  const childrenLength = block.children.length;
  block.classList.add(`size-${childrenLength}`);

  if (block.classList.contains('overlay')) {
    if (block.querySelector('a')) {
      block.classList.add('clickable');
    }
  }

  const isClickable = block.classList.contains('clickable');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });

    if (block.closest('.promo-grid')) {
      const cardBody = li.querySelectorAll('.cards-card-body');
      cardBody.forEach((body) => {
        const span = document.createElement('span');
        span.className = 'arrow-span';
        body.appendChild(span);
      });
    }

    const anchor = li.querySelector('a');

    if (isClickable && anchor) {
      const anchorClone = anchor.cloneNode(true);
      anchor.closest('p').remove();
      const children = [...li.children];
      anchorClone.innerHTML = '';
      children.forEach((child) => anchorClone.appendChild(child));
      li.innerHTML = '';
      li.appendChild(anchorClone);
      decorateLinks(li);
    }
    if (block.classList.contains('card-group')) {
      li.querySelectorAll('.cards-card-body').forEach((body) => {
        const desc = body.querySelector(':nth-child(2)');
        const iconP = body.querySelector(':nth-child(3)');
        if (!desc || !iconP) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'card-desc-arrow';
        wrapper.append(desc, iconP);
        body.appendChild(wrapper);
      });
    }

    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
  if (block.classList.contains('acc-aria-hidden')) {
    hideDecorativeIconsInBlock(block);
  }

  if (block.closest('.content-teaser')) {
    applyCardColor(block);
  }
  if (block.closest('.promo-grid')) {
    applyCardColor(block);
  }
  if (block.closest('.rectangle-image-container')) {
    applyMobileCardBg(block);
  }
}
