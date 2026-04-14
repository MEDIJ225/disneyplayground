import {
  buildBlock, decorateBlock, loadBlock, fetchPlaceholders,
} from '../../scripts/aem.js';
import { createElement } from '../../utils/dom.js';
import { formatDate } from '../../utils/date.js';

function buildFeaturedCard(item, placeholders) {
  const {
    path,
    title,
    image,
    description,
    date,
    author,
  } = item;

  const imageHtml = image ? `<picture><img src="${image}" alt="${title}"></picture>` : '';
  const titleHtml = `<span class="featured-blog-title h5">${title.replace(' | runDisney Blog', '')}</span>`;
  const descHtml = `<span class="featured-blog-description">${description || ''}</span>`;
  const byText = placeholders.by || 'by';
  const metaHtml = `<span class="featured-blog-meta">${date ? `${formatDate(date)} ${author ? `${byText} ${author}` : ''}` : ''}</span>`;
  const linkHtml = `<a href="${path}">${placeholders.readMore || 'Read More'}</a>`;
  return [imageHtml, metaHtml, titleHtml, descHtml, linkHtml];
}

export default async function decorate(block) {
  try {
    const placeholders = await fetchPlaceholders();

    if (!window.fetchBlogIndex) {
      throw new Error('fetchBlogIndex is not available on window object');
    }

    const allItems = await window.fetchBlogIndex();
    const currentPath = window.location.pathname;

    const { featuredItems, nonFeaturedItems } = allItems.reduce((acc, item) => {
      if (item.path === currentPath) {
        return acc;
      }

      const hasFeaturedTag = item.tags?.some((tag) => tag === 'categories/featured');
      if (hasFeaturedTag) {
        acc.featuredItems.push(item);
      } else {
        acc.nonFeaturedItems.push(item);
      }
      return acc;
    }, { featuredItems: [], nonFeaturedItems: [] });

    let itemsToShow = [...featuredItems];

    if (itemsToShow.length < 3) {
      const needed = 3 - itemsToShow.length;
      itemsToShow = [...itemsToShow, ...nonFeaturedItems.slice(0, needed)];
    } else {
      itemsToShow = itemsToShow.slice(0, 3);
    }

    if (itemsToShow.length === 0) {
      block.innerHTML = `<p>${placeholders.noFeaturedBlogPosts || 'No featured blog posts found.'}</p>`;
      return;
    }

    const cardsContent = itemsToShow.map((item) => buildFeaturedCard(item, placeholders));
    const cardsBlock = buildBlock('cards', cardsContent);
    cardsBlock.classList.add('clickable');

    block.innerHTML = '';

    const isBlogPostTemplate = document.body.classList.contains('blog-post-template');
    if (isBlogPostTemplate) {
      block.appendChild(createElement('span', { class: 'featured-blogs-label' }, placeholders.featuredBlogs || 'Featured Blogs'));
    }

    block.appendChild(cardsBlock);
    decorateBlock(cardsBlock);
    await loadBlock(cardsBlock);
  } catch (error) {
    const placeholders = await fetchPlaceholders();
    block.innerHTML = `<p>${placeholders.failedLoadFeaturedBlogs || 'Failed to load featured blog posts:'} ${error.message}</p>`;
  }
}
