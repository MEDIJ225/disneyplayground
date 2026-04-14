import { createOptimizedPicture, fetchPlaceholders } from '../../scripts/aem.js';
import { createElement, createIcon } from '../../utils/dom.js';
import { parseUrlParams, applyFilters } from '../blog-filter/blog-filter.js';
import { formatDate } from '../../utils/date.js';
import createShareButton from '../../utils/share.js';
import { getTag } from '../../utils/taxonomy.js';

const state = {
  allItems: [],
  filteredItems: [],
  currentPage: 1,
  totalCount: 0,
  pageSize: 2,
};

/**
 * Builds a post card element.
 * @param {object} item
 * @returns {Promise<HTMLElement>}
 */
async function buildPostCard(item) {
  const {
    path,
    title,
    description,
    image,
    date,
    author,
    tags,
  } = item;
  const article = createElement('article', { class: 'blog-home-card' });
  const link = createElement('a', { href: path, 'aria-label': title });

  const imageSection = createElement('div', { class: 'blog-home-card-image-section' });

  if (image) {
    const picture = createOptimizedPicture(
      image,
      title,
      false,
      [
        {
          media: '(min-width: 900px)',
          width: '1200',
        },
        {
          media: '(min-width: 600px)',
          width: '900',
        },
        {
          width: '600',
        },
      ],
    );
    picture.classList.add('blog-home-card-image');
    imageSection.append(picture);
  }

  // Add share button underneath image, right-aligned
  const shareButton = createShareButton({
    url: new URL(path, window.location.origin).href,
    title: title.replace(' | runDisney Blog', ''),
  });
  shareButton.classList.add('blog-home-card-share');

  imageSection.append(shareButton);
  link.append(imageSection);

  const body = createElement('div', { class: 'blog-home-card-body' });
  const h3 = createElement('h3', { class: 'blog-home-card-title' }, title.replace(' | runDisney Blog', '') || '');

  let authorName = '';
  if (author) {
    const authorData = await getTag(author);
    authorName = authorData ? authorData.title : author;
  }

  const meta = createElement('p', { class: 'blog-home-card-date' }, date ? `${formatDate(date)} ${authorName ? `${authorName}` : ''}` : '');
  const desc = createElement('p', { class: 'blog-home-card-desc' }, description || '');

  const tagsElement = createElement('p', { class: 'blog-home-card-tags' });
  if (tags && tags.length > 0) {
    const tagElements = await Promise.all(tags.map(async (tag) => {
      const tagData = await getTag(tag);
      const displayName = tagData ? tagData.title : tag;
      const cleanSlug = tag.replace(/^categories\//, '');
      const tagLink = createElement('a', {
        href: `/blog?category=${encodeURIComponent(cleanSlug)}`,
        class: 'blog-home-card-tags-link',
      }, displayName);

      tagLink.addEventListener('click', (e) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent('blog-filter-apply', {
          detail: { categories: [tag], months: [] },
        }));

        setTimeout(() => {
          const blogHomeWrapper = document.querySelector('.blog-home-wrapper');
          if (blogHomeWrapper) {
            blogHomeWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      });

      return tagLink;
    }));

    tagElements.forEach((tagEl, index) => {
      tagsElement.append(tagEl);
      if (index < tagElements.length - 1) {
        tagsElement.append(createElement('span', {}, ', '));
      }
    });
  }
  tagsElement.prepend('Categories: ');

  body.append(h3, meta, desc, tagsElement);

  // Add next icon on the right side, vertically centered
  const nextIcon = createIcon('next', 'm');
  nextIcon.classList.add('blog-home-card-next');

  link.append(body, nextIcon);
  article.append(link);

  return article;
}

/**
 * Parses the current page number from the URL.
 * Uses query parameter: /blog?page=2
 * @returns {number} The current page number (defaults to 1)
 */
function getCurrentPageFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const pageParam = urlParams.get('page');
  if (pageParam) {
    const page = parseInt(pageParam, 10);
    return Number.isNaN(page) || page < 1 ? 1 : page;
  }
  return 1;
}

/**
 * Generates the URL for a specific page number.
 * Uses query parameter: /blog?page=2
 * @param {number} page - Page number
 * @param {string[]} categories - Active category filters
 * @param {string[]} months - Active month filters
 * @returns {string} The page URL
 */
function getPageUrl(page, categories = [], months = []) {
  const url = new URL('/blog', window.location.origin);

  // Add page parameter (only if page > 1)
  if (page > 1) {
    url.searchParams.set('page', page.toString());
  }

  // Add category filters
  categories.forEach((cat) => {
    const cleanSlug = cat.replace(/^categories\//, '');
    url.searchParams.append('category', cleanSlug);
  });

  // Add month filters
  months.forEach((month) => {
    url.searchParams.append('month', month);
  });

  return url.pathname + url.search;
}

/**
 * Builds the pagination UI element.
 * @param {number} currentPage - Current page number
 * @param {number} totalPages - Total number of pages
 * @param {string[]} categories - Active category filters
 * @param {string[]} months - Active month filters
 * @returns {HTMLElement} The pagination element
 */
function buildPagination(currentPage, totalPages, categories = [], months = []) {
  const pagination = createElement('nav', {
    class: 'ever-after-blog-pagination',
    'aria-label': 'Blog pagination',
    role: 'navigation',
  });

  // Previous button
  const previousLink = createElement('a', {
    href: currentPage > 1 ? getPageUrl(currentPage - 1, categories, months) : '#',
    class: 'pagination-previous',
    'aria-label': currentPage > 1 ? `Go to page ${currentPage - 1}` : 'Previous page (disabled)',
  });
  if (currentPage <= 1) {
    previousLink.setAttribute('aria-disabled', 'true');
    previousLink.setAttribute('tabindex', '-1');
    previousLink.style.pointerEvents = 'none';
    previousLink.style.opacity = '0.5';
  }
  const previousIcon = createElement('span', {
    class: 'previous-icon',
    'aria-hidden': 'true',
  });
  const previousText = createElement('span', { class: 'pagination-button-text' }, 'PREVIOUS');
  previousLink.append(previousIcon, previousText);

  // Page numbers container
  const paginationNumbers = createElement('span', {
    class: 'pagination-numbers',
    'aria-label': `Page ${currentPage} of ${totalPages}`,
  });

  // Helper function to create a page link
  const createPageLink = (pageNum) => {
    const isCurrentPage = pageNum === currentPage;
    const classes = ['pagination-number'];
    if (isCurrentPage) {
      classes.push('active');
    }
    return createElement('a', {
      href: getPageUrl(pageNum, categories, months),
      class: classes,
      'aria-label': isCurrentPage ? `Current page, page ${pageNum} of ${totalPages}` : `Go to page ${pageNum} of ${totalPages}`,
      ...(isCurrentPage ? { 'aria-current': 'page' } : {}),
    }, pageNum.toString());
  };

  // Helper function to create ellipsis
  const createEllipsis = () => createElement('span', {
    class: 'pagination-ellipsis',
    'aria-hidden': 'true',
    'aria-label': 'More pages',
  }, '......');

  // Collect all pages to show
  const pagesToShow = new Set();

  // Always show first page
  pagesToShow.add(1);

  if (currentPage === 1) {
    pagesToShow.add(totalPages - 1);
  }

  // Show pages around current (1 before and 1 after, but not if they're first or last pages)
  if (currentPage > 1) {
    pagesToShow.add(currentPage - 1);
  }
  if (currentPage < totalPages) {
    pagesToShow.add(currentPage + 1);
  }
  pagesToShow.add(currentPage); // Always show current page

  // Always show last page
  if (totalPages > 0) {
    pagesToShow.add(totalPages);
  }

  // Convert to sorted array
  const sortedPages = Array.from(pagesToShow).sort((a, b) => a - b);

  // Build pagination display with ellipsis where needed
  sortedPages.forEach((page, index) => {
    // Add ellipsis before this page if there's a gap from previous page
    if (index > 0 && page - sortedPages[index - 1] > 1) {
      paginationNumbers.append(createEllipsis());
    }

    // Add the page link
    paginationNumbers.append(createPageLink(page));
  });

  // Next button
  const nextLink = createElement('a', {
    href: currentPage < totalPages ? getPageUrl(currentPage + 1, categories, months) : '#',
    class: 'pagination-next',
    'aria-label': currentPage < totalPages ? `Go to page ${currentPage + 1}` : 'Next page (disabled)',
  });
  if (currentPage >= totalPages) {
    nextLink.setAttribute('aria-disabled', 'true');
    nextLink.setAttribute('tabindex', '-1');
    nextLink.style.pointerEvents = 'none';
    nextLink.style.opacity = '0.5';
  }
  const nextIcon = createElement('span', {
    class: 'next-icon',
    'aria-hidden': 'true',
  });
  const nextText = createElement('span', { class: 'pagination-button-text' }, 'NEXT');
  nextLink.append(nextText, nextIcon);

  pagination.append(previousLink, paginationNumbers, nextLink);

  return pagination;
}

export default async function decorate(block) {
  // structure
  block.classList.add('blog-home');

  // Create blog-filters block
  const resultsHeader = createElement('div', { class: 'blog-home-results-header' });
  const totalResults = createElement('div', { class: 'blog-home-total-results' }, '0 results');
  const filterCount = createElement('div', { class: 'blog-home-filter-count' });
  filterCount.style.display = 'none';
  const clearFilters = createElement('a', {
    class: 'blog-home-clear-filters',
    href: '#',
  }, 'Clear Filters');
  clearFilters.style.display = 'none';
  resultsHeader.append(totalResults, filterCount, clearFilters);

  const results = createElement('div', { class: 'blog-home-results' });
  const noResults = createElement('p', { class: 'blog-home-no-results' }, 'No results match your filter selections. Please reset all filters.');
  noResults.style.display = 'none';
  const paginationContainer = createElement('div', { class: 'blog-home-pagination-container' });

  block.innerHTML = '';
  block.append(resultsHeader, results, noResults, paginationContainer);
  // Inside your decorate(block) function, after appending other elements:
  let liveRegiondiv = document.getElementById('results-live-region');
  if (!liveRegiondiv) {
    liveRegiondiv = createElement('div', {
      id: 'results-live-region',
      'aria-live': 'polite',
      'aria-atomic': 'true',
      style: 'position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;',
    }, '');
    block.append(liveRegiondiv);
  }

  // helpers
  const clearResults = () => {
    results.innerHTML = '';
  };

  const renderCurrentPage = async (pageParam = state.currentPage) => {
    // Ensure page is valid
    let page = pageParam;
    if (!page || page < 1) {
      page = 1;
    }

    const totalPages = Math.ceil(state.filteredItems.length / state.pageSize);
    const start = (page - 1) * state.pageSize;
    const end = Math.min(start + state.pageSize, state.filteredItems.length);

    if (start >= state.filteredItems.length || state.filteredItems.length === 0) {
      results.innerHTML = '';
      paginationContainer.innerHTML = '';
      return;
    }

    const fragment = document.createDocumentFragment();
    const itemsToRender = state.filteredItems.slice(start, end);
    const cards = await Promise.all(itemsToRender.map((item) => buildPostCard(item)));
    cards.forEach((card) => fragment.append(card));
    results.innerHTML = '';
    results.append(fragment);

    // Announce page change to screen readers
    const liveRegion = document.getElementById('results-live-region');
    if (liveRegion) {
      const message = `Page ${page} of ${totalPages} loaded. Showing ${itemsToRender.length} blog post${itemsToRender.length !== 1 ? 's' : ''}.`;
      setTimeout(() => {
        liveRegion.textContent = message;
      }, 100);
    }

    // Update pagination - show if there are multiple pages
    paginationContainer.innerHTML = '';

    if (totalPages > 1) {
      try {
        const urlParams = parseUrlParams();
        const pagination = buildPagination(
          page,
          totalPages,
          urlParams.categories,
          urlParams.months,
        );
        if (pagination) {
          paginationContainer.append(pagination);
        } else {
          // eslint-disable-next-line no-console
          console.error('Pagination element is null or undefined');
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error building pagination:', error, error.stack);
      }
    }
  };

  const updateNoResultsVisibility = () => { noResults.style.display = state.filteredItems.length === 0 ? '' : 'none'; };

  const updateResults = (
    filteredItems,
    totalCount,
    hasActiveFilters = false,
    filterCounts = null,
    pageParam = null,
  ) => {
    state.filteredItems = filteredItems;
    state.totalCount = totalCount;

    // Get current page from URL if not provided
    let page = pageParam;
    if (page === null) {
      page = getCurrentPageFromUrl();
    }

    // Validate page number
    const totalPages = Math.ceil(filteredItems.length / state.pageSize);
    if (page < 1) {
      page = 1;
    }
    if (page > totalPages && totalPages > 0) {
      page = totalPages;
    }

    state.currentPage = page;

    // Display results count
    totalResults.textContent = `${filteredItems.length} results`;

    const liveRegion = document.getElementById('results-live-region');
    if (liveRegion) {
      const message = `Results updated. ${filteredItems.length} result${filteredItems.length !== 1 ? 's' : ''}.`;

      setTimeout(() => {
        liveRegion.textContent = message;
      }, 300);
    }

    // Display filter counts in separate div
    if (filterCounts && (filterCounts.categories > 0 || filterCounts.months > 0)) {
      const filterParts = [];
      if (filterCounts.categories > 0) {
        const catCount = filterCounts.categories;
        filterParts.push(`${catCount} ${catCount === 1 ? 'category' : 'categories'}`);
      }
      if (filterCounts.months > 0) {
        const monthCount = filterCounts.months;
        filterParts.push(`${monthCount} ${monthCount === 1 ? 'month' : 'months'}`);
      }
      filterCount.textContent = `${filterParts.join(', ')} selected`;
      filterCount.style.display = '';
    } else {
      filterCount.style.display = 'none';
    }

    clearFilters.style.display = hasActiveFilters ? '' : 'none';
    clearResults();
    updateNoResultsVisibility();
    renderCurrentPage(page);
  };

  try {
    // Fetch page size from placeholder, default to 2
    const placeholders = await fetchPlaceholders();
    const blogPaginationCount = placeholders?.blogpaginationcount
      || placeholders?.blogPaginationCount;
    if (blogPaginationCount) {
      const parsedCount = parseInt(blogPaginationCount, 10);
      if (!Number.isNaN(parsedCount) && parsedCount > 0) {
        state.pageSize = parsedCount;
      }
    }

    state.allItems = await window.fetchBlogIndex();
    state.totalCount = window.blogIndexTotalCount || state.allItems.length;

    // Get current page from URL
    const currentPage = getCurrentPageFromUrl();
    state.currentPage = currentPage;

    // Check if there are URL parameters for filtering
    const urlParams = parseUrlParams();
    const hasFilterParams = urlParams.categories.length > 0 || urlParams.months.length > 0;

    if (hasFilterParams) {
      // Apply filters directly based on URL parameters
      const filteredItems = applyFilters(state.allItems, urlParams.categories, urlParams.months);
      const filterCounts = {
        categories: urlParams.categories.length,
        months: urlParams.months.length,
      };
      updateResults(filteredItems, state.totalCount, true, filterCounts, currentPage);
    } else {
      // No filter parameters, show all results
      updateResults(state.allItems, state.totalCount, false, null, currentPage);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    noResults.textContent = 'Failed to load blog posts.';
    noResults.style.display = '';
    return;
  }

  // Clear filters click handler
  clearFilters.addEventListener('click', (e) => {
    e.preventDefault();
    // Dispatch event to clear filter UI state
    window.dispatchEvent(new CustomEvent('blog-filter-clear'));
    // Navigate to /blog without any parameters (clears filters and page parameter)
    const url = new URL('/blog', window.location.origin);
    window.location.href = url.toString();
  });

  // Initialize blog-filters block
  try {
    // Listen for filter changes from the blog-filters block
    window.addEventListener('blog-filter-change', (event) => {
      const {
        filteredItems,
        totalCount,
        selectedCategories = [],
        selectedMonths = [],
      } = event.detail;
      const hasActiveFilters = selectedCategories.length > 0 || selectedMonths.length > 0;
      const filterCounts = {
        categories: selectedCategories.length,
        months: selectedMonths.length,
      };
      // Reset to page 1 when filters change
      updateResults(filteredItems, totalCount, hasActiveFilters, filterCounts, 1);
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error('Failed to load blog-filters block:', e);
    // Fallback: show all items without filters
    updateResults(state.allItems, state.totalCount);
  }

  // Inside your decorate(block) function, after appending other elements:
  const liveRegion = createElement('div', {
    id: 'results-live-region',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    style: 'position:absolute; left:-9999px; width:1px; height:1px; overflow:hidden;',
  }, '');
  block.append(liveRegion);
}
