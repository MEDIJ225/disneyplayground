import { decorateButtons } from '../../scripts/aem.js';
import { decorateFourthButtons, hideDecorativeIconsInBlock } from '../../scripts/scripts.js';
import { createElement } from '../../utils/dom.js';

export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  block.classList.forEach((className) => {
    if (/^\d/.test(className)) {
      const columnSplitClass = `col-${className}`;
      block.classList.replace(className, columnSplitClass);
    }
  });

  if (block.classList.contains('icon-separator')) {
    [...block.children].forEach((row) => {
      const columns = [...row.children];

      const icons = row.querySelectorAll('.icon, [class*="icon__"], [class*="icon-"]');

      icons.forEach((icon) => {
        icon.classList.add('circle-border');
        icon.setAttribute('aria-hidden', 'true'); // ✅ Add this line
        const parentP = icon.closest('p');
        if (parentP) {
          parentP.remove();
        }
      });

      columns.forEach((col) => {
        if (col.querySelector('picture')) {
          return;
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'columns-content';

        while (col.firstChild) {
          contentDiv.appendChild(col.firstChild);
        }

        col.appendChild(contentDiv);
      });

      columns.forEach((col, index) => {
        if (index < columns.length - 1 && icons.length > 0) {
          const icon = icons[0];

          const separator = document.createElement('div');
          separator.className = 'columns-icon-separator';

          const iconClone = icon.cloneNode(true);
          separator.appendChild(iconClone);

          col.parentNode.insertBefore(separator, col.nextSibling);
        }
      });
    });
  }

  [...block.children].forEach((row) => {
    const columns = [...row.children];

    columns.forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-img-col');
        }
      } else {
        col.classList.add('columns-content-col');
      }
    });
  });

  if (block.classList.contains('wrap')) {
    [...block.children].forEach((row) => {
      const columns = [...row.children];
      if (columns.length === 2) {
        const imgCol = columns.find((col) => col.classList.contains('columns-img-col'));
        const textCol = columns.find((col) => !col.classList.contains('columns-img-col'));

        if (imgCol && textCol) {
          const pic = imgCol.querySelector('picture');
          if (pic) {
            textCol.insertBefore(pic, textCol.firstChild);
            imgCol.remove();
          }
        }
      }
    });
  }

  if (block.classList.contains('full-width-left') || block.classList.contains('full-width-right')) {
    const left = block.classList.contains('full-width-left');
    const div1 = createElement('div', { class: left ? 'empty' : 'apply-background' });
    const div2 = createElement('div', { class: left ? 'apply-background' : 'empty' });
    block.parentElement.prepend(div1);
    block.parentElement.append(div2);
  }

  if (block.classList.contains('footer-contact')) {
    const section = block.closest('.section');
    const titleContainer = section.querySelector('.default-content-wrapper');
    const row = block.querySelector(':scope > div');
    if (row) {
      row.classList.add('footer-contact-row');
      if (titleContainer && titleContainer.firstElementChild) {
        const title = titleContainer.firstElementChild;
        title.classList.add('columns-footer-title');
        row.prepend(title);
        if (!titleContainer.textContent.trim()) titleContainer.remove();
      }
      const columns = row.querySelectorAll('.columns-content-col');
      columns.forEach((col, index) => {
        const bgParagraph = [...col.querySelectorAll('p')].find((p) => /\[background-color\s*=\s*.*?\]/.test(p.textContent));
        if (bgParagraph) {
          const colorMatch = bgParagraph.textContent.match(/\[background-color\s*=\s*(.*?)\]/);
          if (colorMatch && colorMatch[1]) {
            col.classList.add(colorMatch[1].trim());
          }
          bgParagraph.remove();
        }
        if (index === 1) col.classList.add('second-column');
      });
    }
  }

  decorateButtons(block);
  decorateFourthButtons(block);
  if (block.classList.contains('acc-aria-hidden')) {
    hideDecorativeIconsInBlock(block);
  }
}
