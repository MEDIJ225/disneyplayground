import { createElement, createIcon } from '../../utils/dom.js';
import { fetchPlaceholders } from '../../scripts/aem.js';
import { getTag } from '../../utils/taxonomy.js';
import formatToRDPrefix from '../../utils/analyticsModifier.js';

/**
 * Checks if the current page is the blog page.
 * @returns {boolean}
 */
function isBlogPage() {
  const path = window.location.pathname;
  return path === '/blog' || path.endsWith('/blog');
}

/**
 * Parses URL parameters for categories and months.
 * Normalizes category values to include 'categories/' prefix for internal matching.
 * @returns {{categories: string[], months: string[]}}
 */
export function parseUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParams = urlParams.getAll('category');
  const categories = categoryParams.map((cat) => (cat.startsWith('categories/') ? cat : `categories/${cat}`));
  const months = urlParams.getAll('month');
  return { categories, months };
}

/**
 * Processes month selections to only include year parameters when a year is selected.
 * @param {string[]} months
 * @returns {string[]}
 */
function processMonthSelections(months) {
  const yearSelections = new Set();
  const monthSelections = new Set();

  months.forEach((selection) => {
    if (selection.startsWith('year:')) {
      yearSelections.add(selection);
    } else if (selection.startsWith('month:')) {
      monthSelections.add(selection);
    }
  });

  // If a year is selected, only include the year parameter
  // Otherwise, include individual month parameters
  if (yearSelections.size > 0) {
    return Array.from(yearSelections);
  }

  return Array.from(monthSelections);
}

/**
 * Updates URL parameters with current filter selections.
 * Strips 'categories/' prefix from category values for cleaner URLs.
 * @param {string[]} categories
 * @param {string[]} months
 */
function updateUrlParams(categories, months) {
  if (!isBlogPage()) return;

  // Get existing values from URL
  const url = new URL(window.location);
  const existingCategories = url.searchParams.getAll('category');
  const existingMonths = url.searchParams.getAll('month');

  const normalizedCategories = categories.map((cat) => cat.replace(/^categories\//, ''));
  const normalizedMonths = months.filter((m) => !m.startsWith('year'));

  const categoriesChanged = normalizedCategories.some((cat) => !existingCategories.includes(cat))
    || existingCategories.some((cat) => !normalizedCategories.includes(cat));

  const monthsChanged = normalizedMonths.some((m) => !existingMonths.includes(m))
    || existingMonths.some((m) => !normalizedMonths.includes(m));

  // If categories or months changed, reset page to 1
  if (categoriesChanged || monthsChanged) {
    if (normalizedCategories.length > 0 || normalizedMonths.length > 0) {
      url.searchParams.set('page', '1'); // only set page=1 if any filter is applied
    } else {
      url.searchParams.delete('page'); // remove page param if no filters
    }
  }

  url.searchParams.delete('category');
  url.searchParams.delete('month');

  normalizedCategories.forEach((cat) => url.searchParams.append('category', cat));
  normalizedMonths.forEach((month) => url.searchParams.append('month', month));

  window.history.replaceState({}, '', url.toString());
}

/**
 * Navigates to blog page with filter parameters.
 * Strips 'categories/' prefix from category values for cleaner URLs.
 * @param {string[]} categories
 * @param {string[]} months
 */
export function navigateToBlogWithParams(categories, months) {
  const url = new URL('/blog', window.location.origin);

  categories.forEach((cat) => {
    const cleanSlug = cat.replace(/^categories\//, '');
    url.searchParams.append('category', cleanSlug);
  });

  const processedMonths = processMonthSelections(months);
  processedMonths.forEach((month) => url.searchParams.append('month', month));

  window.location.href = url.toString();
}

/**
 * Formats a category string to a readable label.
 * @param {string} category
 * @returns {string}
 */
export function formatCategoryLabel(category) {
  if (!category) return '';
  return category
    .replace(/-/g, ' ')
    .replace(/\s*&\s*/g, ' & ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Converts an array of category values to display labels.
 * @param {string[]} categories
 * @returns {Promise<string[]>}
 */
async function getCategoryLabels(categories) {
  return Promise.all(categories.map(async (cat) => {
    const tagData = await getTag(cat);
    return tagData ? tagData.title : formatCategoryLabel(cat);
  }));
}

/**
 * Converts an array of month values to display labels.
 * @param {string[]} months
 * @returns {string[]}
 */
function getMonthLabels(months) {
  const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return months.map((month) => {
    if (month.startsWith('year:')) {
      return month.replace('year:', '');
    }
    // Convert month:YYYY-MM to readable format
    const match = month.match(/month:(\d{4})-(\d{2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const monthNum = parseInt(match[2], 10);
      const monthShort = monthShortNames[monthNum - 1];
      return `${monthShort} ${year}`;
    }
    return month;
  });
}

/**
 * Returns key like "YYYY-MM" for month grouping.
 * @param {number} epochSeconds
 * @returns {string}
 */
function getMonthKey(epochSeconds) {
  const d = new Date(epochSeconds * 1000);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

/**
 * Fires tracking events for cleared filters
 * @param {string[]} selectedValues - Array of selected values to track
 * @param {HTMLSelectElement} selectEl - The select element to find options from
 * @param {string} prefix - The prefix for tracking (e.g., 'RD_CATEGORY_' or 'RD_')
 * @param {boolean} useTextContent - If true, use textContent; if false, use value
 */
function trackClearedFilters(selectedValues, selectEl, prefix, useTextContent = false) {
  selectedValues.forEach((value) => {
    const optionEl = Array.from(selectEl.options).find((o) => o.value === value);
    if (optionEl && window.s_wdpro && typeof window.s_wdpro.trackClick === 'function') {
      const trackingValue = useTextContent ? optionEl.textContent : optionEl.value;
      window.s_wdpro.trackClick(optionEl, formatToRDPrefix(trackingValue, prefix));
    }
  });
}

/**
 * Creates a custom multi-select dropdown wrapper with a trigger and menu.
 * The trigger contains a title (e.g., "Category") and a summary (e.g., "All Categories").
 * @param {string} titleText
 * @param {string} placeholder
 * @returns {{
 * root:HTMLElement,
 * trigger:HTMLElement,
 * menu:HTMLElement,
 * title:HTMLElement,
 * summary:HTMLElement
 * }}
 */
function createMultiSelect(titleText, placeholder) {
  const root = createElement('div', { class: 'multi-select' });
  const trigger = createElement('button', { type: 'button', class: 'multi-select-trigger', 'aria-label': titleText });
  const text = createElement('div', { class: 'multi-select-text' });
  const title = createElement('span', { class: 'multi-select-title' }, titleText);
  const summary = createElement('span', { class: 'multi-select-summary' }, placeholder);
  const caret = createIcon('norgie-opened');
  text.append(title, summary);
  trigger.append(text, caret);
  const menu = createElement('div', { class: 'multi-select-menu' });
  root.append(trigger, menu);
  // toggle open/close
  trigger.addEventListener('click', () => root.classList.toggle('open'));
  // close on outside click
  document.addEventListener('click', (e) => { if (!root.contains(e.target)) root.classList.remove('open'); });
  // close on escape key
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') root.classList.remove('open'); });
  return {
    root,
    trigger,
    menu,
    title,
    summary,
  };
}

/**
 * Builds unique category list from tags.
 * @param {Array<object>} items
 * @returns {Promise<Array<{value: string, label: string}>>}
 */
async function buildCategoryOptions(items) {
  const set = new Set();
  items.forEach((it) => (it.tags || []).forEach((t) => { if (t) set.add(t); }));
  const values = Array.from(set);

  // Fetch display names from taxonomy
  const options = await Promise.all(values.map(async (v) => {
    const tagData = await getTag(v);
    return {
      value: v,
      label: tagData ? tagData.title : formatCategoryLabel(v),
    };
  }));

  // Sort by label
  options.sort((a, b) => a.label.localeCompare(b.label));
  return options;
}

/**
 * Builds a map of years to available months (1-12) from items.
 * @param {Array<object>} items
 * @returns {Map<number, Set<number>>}
 */
function buildYearMonthMap(items) {
  const map = new Map();
  items.forEach((it) => {
    if (!it.date) return;
    const d = new Date(it.date * 1000);
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth() + 1; // 1-12
    if (!map.has(year)) map.set(year, new Set());
    map.get(year).add(month);
  });
  return map;
}

function updateYearIndeterminateState(yearCheckbox, itemsContainer) {
  const months = [...itemsContainer.querySelectorAll('input[type="checkbox"]')];
  const checked = months.filter((m) => m.checked);

  if (checked.length === 0) {
    yearCheckbox.checked = false;
    yearCheckbox.indeterminate = false;
    yearCheckbox.setAttribute('aria-checked', 'false');
  } else if (checked.length === months.length) {
    yearCheckbox.checked = true;
    yearCheckbox.indeterminate = false;
    yearCheckbox.setAttribute('aria-checked', 'true');
  } else {
    yearCheckbox.checked = false;
    yearCheckbox.indeterminate = true;
    yearCheckbox.setAttribute('aria-checked', 'mixed');
  }
}

/**
 * Populates the month select with optgroups by year, including "All YYYY" and month options.
 * Values use prefixes: "year:YYYY" and "month:YYYY-MM".
 * @param {HTMLSelectElement} selectEl
 * @param {Map<number, Set<number>>} yearMonthMap
 */
function populateMonthSelect(selectEl, yearMonthMap) {
  selectEl.innerHTML = '';
  const all = createElement('option', { value: 'all' }, 'All Months');
  selectEl.append(all);

  const now = new Date();
  const currentYear = now.getUTCFullYear();

  const yearsFromData = Array.from(yearMonthMap.keys());
  const minYear = yearsFromData.length ? Math.max(Math.min(...yearsFromData), 2020) : 2020;

  for (let year = currentYear; year >= minYear; year -= 1) {
    const monthsInYear = yearMonthMap.get(year);
    if (!monthsInYear || monthsInYear.size === 0) {
      // eslint-disable-next-line no-continue
      continue;
    }

    const optgroup = createElement('optgroup', { label: String(year) });
    const allYear = createElement('option', { value: `year:${year}` }, String(year));
    optgroup.append(allYear);

    // Get months for this year and sort them (1-12)
    const sortedMonths = Array.from(monthsInYear).sort((a, b) => a - b);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    sortedMonths.forEach((monthNum) => {
      const mm = String(monthNum).padStart(2, '0');
      const monthName = monthNames[monthNum - 1];
      const option = createElement('option', { value: `month:${year}-${mm}` }, monthName);
      optgroup.append(option);
    });

    selectEl.append(optgroup);
  }
}

/**
 * Returns an array of selected option values, excluding 'all'.
 * @param {HTMLSelectElement} selectEl
 * @returns {string[]}
 */
function getSelectedValues(selectEl) {
  const values = Array.from(selectEl.selectedOptions).map((o) => o.value);
  return values.filter((v) => v !== 'all');
}

/**
 * Renders the select element with options.
 * @param {HTMLSelectElement} selectEl
 * @param {Array<{value: string, label: string}>} options
 * @param {string} allLabel
 */
function populateSelect(selectEl, options, allLabel) {
  selectEl.innerHTML = '';
  const all = createElement('option', { value: 'all' }, allLabel);
  selectEl.append(all);
  options.forEach((opt) => {
    const o = createElement('option', { value: opt.value }, opt.label);
    selectEl.append(o);
  });
}

/**
 * Creates a checkbox option element.
 * @param {string} value
 * @param {string} label
 * @param {(checked: boolean, value: string) => void} onChange
 * @returns {HTMLElement}
 */
function createCheckboxItem(value, label, onChange, yearId) {
  const item = createElement('label', { class: 'multi-select-item' });
  const input = createElement('input', { type: 'checkbox', value });
  const span = createElement('span', {}, label);
  item.append(input, span);
  const monthId = `month-${label}-${value}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

  span.id = monthId;

  // Combine: "2024 January" for SR users
  input.setAttribute('role', 'checkbox');
  input.setAttribute('aria-labelledby', `${yearId} ${monthId}`);
  input.addEventListener('change', () => onChange(input.checked, value));
  return item;
}

/**
 * Builds checkbox groups for months by year.
 * @param {HTMLElement} menu
 * @param {Map<number, Set<number>>} yearMonthMap
 * @param {(checked: boolean, value: string) => void} onChange
 */
function buildMonthCheckboxes(menu, yearMonthMap, onChange) {
  const years = Array.from(yearMonthMap.keys())
    .filter((year) => year >= 2020)
    .sort((a, b) => b - a);

  years.forEach((year) => {
    const group = createElement('div', { class: 'multi-select-group' });

    const header = createElement('div', { class: 'multi-select-group-header' });
    const yearCheckbox = createElement('input', { type: 'checkbox', value: `year:${year}` });
    const yearLabel = createElement('span', {}, String(year));
    header.append(yearCheckbox, yearLabel);

    const yearId = `year-${year}`;
    yearLabel.id = yearId;

    group.setAttribute('role', 'group');
    group.setAttribute('aria-labelledby', yearId);

    yearCheckbox.setAttribute('role', 'checkbox');
    yearCheckbox.setAttribute('aria-labelledby', yearId);

    const items = createElement('div', { class: 'multi-select-group-items' });

    const monthsInYear = yearMonthMap.get(year);
    if (!monthsInYear || monthsInYear.size === 0) return;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const sortedMonths = Array.from(monthsInYear).sort((a, b) => a - b);
    sortedMonths.forEach((m) => {
      const mm = String(m).padStart(2, '0');
      const monthLabel = monthNames[m - 1];
      const item = createCheckboxItem(`month:${year}-${mm}`, monthLabel, onChange, yearId);
      items.append(item);
      const monthCheckbox = item.querySelector('input');
      monthCheckbox.addEventListener('change', () => {
        updateYearIndeterminateState(yearCheckbox, items);
      });
    });

    // Toggle all for year
    yearCheckbox.addEventListener('change', () => {
      items.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = yearCheckbox.checked;
        onChange(cb.checked, cb.value);
      });
      yearCheckbox.indeterminate = false;
      yearCheckbox.setAttribute('aria-checked', yearCheckbox.checked ? 'true' : 'false');
      onChange(yearCheckbox.checked, yearCheckbox.value);
    });

    group.append(header, items);
    menu.append(group);
  });
}

/**
 * Applies current filters to items (OR within a group, AND across groups).
 * @param {Array<object>} items
 * @param {string[]} selectedCategories
 * @param {string[]} selectedMonths
 * @returns {Array<object>}
 */
export function applyFilters(items, selectedCategories, selectedMonths) {
  let result = items;

  if (selectedCategories && selectedCategories.length > 0) {
    const catSet = new Set(selectedCategories);
    result = result.filter((it) => Array.isArray(it.tags) && it.tags.some((t) => catSet.has(t)));
  }

  if (selectedMonths && selectedMonths.length > 0) {
    const monthSet = new Set(selectedMonths);
    result = result.filter((it) => {
      const d = new Date(it.date * 1000);
      const y = d.getUTCFullYear();
      const ym = getMonthKey(it.date);
      return monthSet.has(`year:${y}`) || monthSet.has(`month:${ym}`);
    });
  }

  return result;
}

// Function to trigger filter change event
function triggerFilterChange(categorySelect, monthSelect, blogIndex) {
  const selectedCategories = getSelectedValues(categorySelect);
  const selectedMonths = getSelectedValues(monthSelect);
  const filteredItems = applyFilters(blogIndex, selectedCategories, selectedMonths);

  // Update URL parameters if on blog page
  if (isBlogPage()) {
    updateUrlParams(selectedCategories, selectedMonths);
  }

  // Dispatch custom event with filtered data
  const event = new CustomEvent('blog-filter-change', {
    detail: {
      filteredItems,
      selectedCategories,
      selectedMonths,
      totalCount: blogIndex.length,
      filteredCount: filteredItems.length,
    },
  });
  window.dispatchEvent(event);
}

/**
 * Blog filters block that provides category and month filtering functionality.
 * Emits 'blog-filter-change' events with the filtered data.
 */
export default async function decorate(block) {
  block.classList.add('blog-filters');

  const placeholders = await fetchPlaceholders();

  // Get blog index data from window object
  const blogIndex = await window.fetchBlogIndex();
  if (!blogIndex) {
    // eslint-disable-next-line no-console
    console.error('Blog index not available. Make sure fetchBlogIndex() has been called first.');
    return;
  }

  const filters = createElement('div', { class: 'blog-filters-container' });

  const categoryWrap = createElement('label', { class: 'blog-filter' }, '');
  const categorySelect = createElement('select', { class: 'blog-filter-select', multiple: true });
  categoryWrap.append(categorySelect);

  const monthWrap = createElement('label', { class: 'blog-filter' }, '');
  const monthSelect = createElement('select', { class: 'blog-filter-select', multiple: true });
  monthWrap.append(monthSelect);

  // Custom dropdowns with checkboxes (labels inside trigger)
  const catMulti = createMultiSelect(placeholders.category || 'Category', placeholders.allCategories || 'All Categories');
  const monthMulti = createMultiSelect(placeholders.month || 'Month', placeholders.allMonths || 'All Months');
  categoryWrap.append(catMulti.root);
  monthWrap.append(monthMulti.root);

  filters.append(categoryWrap, monthWrap);

  // Mobile filter button
  const mobileFilterButton = createElement('button', {
    class: 'mobile-filter-button',
    type: 'button',
  }, placeholders.filter || 'Filter');

  // Mobile filter overlay
  const mobileFilterOverlay = createElement('div', { class: 'mobile-filter-overlay' });

  const mobileFilterHeader = createElement('div', { class: 'mobile-filter-header' });
  const mobileFilterTitle = createElement('h2', { class: 'mobile-filter-title' }, placeholders.filter || 'Filter');
  const mobileFilterClose = createElement('button', {
    class: 'mobile-filter-close',
    type: 'button',
    'aria-label': placeholders.closeFilter || 'Close filter',
  }, createIcon('close-reversed', 'm'));
  mobileFilterHeader.append(mobileFilterTitle, mobileFilterClose);

  const mobileFilterContent = createElement('div', { class: 'mobile-filter-content' });

  // Category section for mobile
  const mobileCategorySection = createElement('div', { class: 'mobile-filter-section' });
  const mobileCategoryHeader = createElement('div', { class: 'mobile-filter-section-header' });
  const mobileCategoryTitle = createElement('div', { class: 'mobile-filter-section-title' }, placeholders.category || 'Category');
  const mobileCategoryCaret = createIcon('norgie-opened', 's');
  mobileCategoryHeader.append(mobileCategoryTitle, mobileCategoryCaret);
  const mobileCategoryContent = createElement('div', { class: 'mobile-filter-section-content' });
  mobileCategorySection.append(mobileCategoryHeader, mobileCategoryContent);

  // Month section for mobile
  const mobileMonthSection = createElement('div', { class: 'mobile-filter-section' });
  const mobileMonthHeader = createElement('div', { class: 'mobile-filter-section-header' });
  const mobileMonthTitle = createElement('div', { class: 'mobile-filter-section-title' }, placeholders.month || 'Month');
  const mobileMonthCaret = createIcon('norgie-opened', 's');
  mobileMonthHeader.append(mobileMonthTitle, mobileMonthCaret);
  const mobileMonthContent = createElement('div', { class: 'mobile-filter-section-content' });
  mobileMonthSection.append(mobileMonthHeader, mobileMonthContent);

  mobileFilterContent.append(mobileCategorySection, mobileMonthSection);

  // Mobile filter actions
  const mobileFilterActions = createElement('div', { class: 'mobile-filter-actions' });
  const mobileFilterReset = createElement('button', {
    class: 'mobile-filter-reset',
    type: 'button',
  }, placeholders.reset || 'Reset');
  const mobileFilterApply = createElement('button', {
    class: 'mobile-filter-apply',
    type: 'button',
  }, placeholders.filter || 'Filter');
  mobileFilterActions.append(mobileFilterReset, mobileFilterApply);

  mobileFilterOverlay.append(mobileFilterHeader, mobileFilterContent, mobileFilterActions);

  block.innerHTML = '';
  block.append(filters, mobileFilterButton);

  document.body.append(mobileFilterOverlay);

  // Initialize filters (native selects for state; custom menus for UI)
  const categoryOptions = await buildCategoryOptions(blogIndex);
  populateSelect(categorySelect, categoryOptions, placeholders.allCategories || 'All Categories');
  populateMonthSelect(monthSelect, buildYearMonthMap(blogIndex));

  // Initialize filters from URL parameters
  const urlParams = parseUrlParams();
  if (urlParams.categories.length > 0 || urlParams.months.length > 0) {
    // Set category selections
    urlParams.categories.forEach((cat) => {
      const option = Array.from(categorySelect.options).find((o) => o.value === cat);
      if (option) option.selected = true;
    });

    // Set month selections - handle year selections by selecting all months in that year
    urlParams.months.forEach((month) => {
      if (month.startsWith('year:')) {
        const year = month.replace('year:', '');
        // Select all months in this year
        Array.from(monthSelect.options).forEach((option) => {
          if (option.value.startsWith(`month:${year}-`)) {
            option.selected = true;
          }
        });
      } else {
        const option = Array.from(monthSelect.options).find((o) => o.value === month);
        if (option) option.selected = true;
      }
    });

    // Update summary text to reflect URL parameter selections
    const selectedCategories = getSelectedValues(categorySelect);
    const selectedMonths = getSelectedValues(monthSelect);

    // Show category names instead of count
    if (selectedCategories.length > 0) {
      const categoryLabels = await getCategoryLabels(selectedCategories);
      catMulti.summary.textContent = categoryLabels.join(', ');
    } else {
      catMulti.summary.textContent = placeholders.allCategories || 'All Categories';
    }

    // Show month names instead of count
    if (selectedMonths.length > 0) {
      const monthLabels = getMonthLabels(selectedMonths);
      monthMulti.summary.textContent = monthLabels.join(', ');
    } else {
      monthMulti.summary.textContent = placeholders.allMonths || 'All Months';
    }

    // Trigger filter change event to update blog-home with filtered results
    triggerFilterChange(categorySelect, monthSelect, blogIndex);
  }

  // Build category checkbox menu (using already-fetched categoryOptions)
  categoryOptions.forEach((opt) => {
    if (opt.value === 'all') return;
    const item = createCheckboxItem(opt.value, opt.label, async (checked, value) => {
      const optionEl = Array.from(categorySelect.options).find((o) => o.value === value);
      if (optionEl) optionEl.selected = checked;
      const selected = getSelectedValues(categorySelect);
      // analytics event
      if (window.s_wdpro && typeof window.s_wdpro.trackClick === 'function') {
        window.s_wdpro.trackClick(optionEl, formatToRDPrefix(optionEl.textContent, 'RD_CATEGORY_'));
      }

      // Show category names instead of count
      if (selected.length > 0) {
        const categoryLabels = await getCategoryLabels(selected);
        catMulti.summary.textContent = categoryLabels.join(', ');
      } else {
        catMulti.summary.textContent = placeholders.allCategories || 'All Categories';
      }

      // If not on blog page, navigate to blog with parameters
      if (!isBlogPage()) {
        const selectedMonths = getSelectedValues(monthSelect);
        navigateToBlogWithParams(selected, selectedMonths);
        return;
      }

      triggerFilterChange(categorySelect, monthSelect, blogIndex);
    });
    catMulti.menu.append(item);
  });
  if (!catMulti.menu.children.length) catMulti.menu.append(createElement('div', { class: 'multi-select-empty' }, placeholders.noCategoriesAvailable || 'No categories available'));

  // Build month checkbox menu (grouped by year)
  buildMonthCheckboxes(monthMulti.menu, buildYearMonthMap(blogIndex), (checked, value) => {
    const optionEl = Array.from(monthSelect.options).find((o) => o.value === value);
    if (optionEl) optionEl.selected = checked;
    const selected = getSelectedValues(monthSelect);

    // analytics event
    if (window.s_wdpro && typeof window.s_wdpro.trackClick === 'function') {
      window.s_wdpro.trackClick(optionEl, formatToRDPrefix(optionEl.value, 'RD_'));
    }

    // Show month names instead of count
    if (selected.length > 0) {
      const monthLabels = getMonthLabels(selected);
      monthMulti.summary.textContent = monthLabels.join(', ');
    } else {
      monthMulti.summary.textContent = placeholders.allMonths || 'All Months';
    }

    // If not on blog page, navigate to blog with parameters
    if (!isBlogPage()) {
      const selectedCategories = getSelectedValues(categorySelect);
      navigateToBlogWithParams(selectedCategories, selected);
      return;
    }

    triggerFilterChange(categorySelect, monthSelect, blogIndex);
  });

  // Update checkbox states to reflect URL parameter selections
  if (urlParams.categories.length > 0 || urlParams.months.length > 0) {
    // Update category checkboxes
    const selectedCategories = getSelectedValues(categorySelect);
    catMulti.menu.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = selectedCategories.includes(checkbox.value);
    });

    // Update month checkboxes - handle year selections
    const selectedMonths = getSelectedValues(monthSelect);
    monthMulti.menu.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      if (checkbox.value.startsWith('year:')) {
        // For year checkboxes, check if this year is selected
        checkbox.checked = selectedMonths.some((month) => month.startsWith(`month:${checkbox.value.replace('year:', '')}-`));
      } else {
        // For month checkboxes, check if this month is selected
        checkbox.checked = selectedMonths.includes(checkbox.value);
      }
    });
    monthMulti.menu.querySelectorAll('.multi-select-group').forEach((group) => {
      const yearCheckbox = group.querySelector('.multi-select-group-header input[type="checkbox"]');
      const itemsContainer = group.querySelector('.multi-select-group-items');
      updateYearIndeterminateState(yearCheckbox, itemsContainer);
    });
  }

  // native change hooks (if any manual changes occur)
  categorySelect.addEventListener('change', async () => {
    const selected = getSelectedValues(categorySelect);

    // Show category names instead of count
    if (selected.length > 0) {
      const categoryLabels = await getCategoryLabels(selected);
      catMulti.summary.textContent = categoryLabels.join(', ');
    } else {
      catMulti.summary.textContent = placeholders.allCategories || 'All Categories';
    }

    // If not on blog page, navigate to blog with parameters
    if (!isBlogPage()) {
      const selectedMonths = getSelectedValues(monthSelect);
      navigateToBlogWithParams(selected, selectedMonths);
      return;
    }

    triggerFilterChange(categorySelect, monthSelect, blogIndex);
  });
  monthSelect.addEventListener('change', () => {
    const selected = getSelectedValues(monthSelect);

    // Show month names instead of count
    if (selected.length > 0) {
      const monthLabels = getMonthLabels(selected);
      monthMulti.summary.textContent = monthLabels.join(', ');
    } else {
      monthMulti.summary.textContent = placeholders.allMonths || 'All Months';
    }

    // If not on blog page, navigate to blog with parameters
    if (!isBlogPage()) {
      const selectedCategories = getSelectedValues(categorySelect);
      navigateToBlogWithParams(selectedCategories, selected);
      return;
    }

    triggerFilterChange(categorySelect, monthSelect, blogIndex);
  });

  // Mobile filter functionality
  let mobileFilterState = {
    categories: [...getSelectedValues(categorySelect)],
    months: [...getSelectedValues(monthSelect)],
  };

  // Populate mobile category checkboxes
  categoryOptions.forEach((opt) => {
    if (opt.value === 'all') return;
    const item = createCheckboxItem(opt.value, opt.label, (checked, value) => {
      if (checked) {
        if (!mobileFilterState.categories.includes(value)) {
          mobileFilterState.categories.push(value);
        }
      } else {
        mobileFilterState.categories = mobileFilterState.categories.filter((c) => c !== value);
      }
    });
    // Set initial state
    item.querySelector('input').checked = mobileFilterState.categories.includes(opt.value);
    mobileCategoryContent.append(item);
  });

  // Populate mobile month checkboxes
  buildMonthCheckboxes(mobileMonthContent, buildYearMonthMap(blogIndex), (checked, value) => {
    if (checked) {
      if (!mobileFilterState.months.includes(value)) {
        mobileFilterState.months.push(value);
      }
    } else {
      mobileFilterState.months = mobileFilterState.months.filter((m) => m !== value);
    }
  });

  // Set initial mobile month checkbox states
  mobileMonthContent.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    if (checkbox.value.startsWith('year:')) {
      checkbox.checked = mobileFilterState.months.some((month) => month.startsWith(`month:${checkbox.value.replace('year:', '')}-`));
    } else {
      checkbox.checked = mobileFilterState.months.includes(checkbox.value);
    }
  });

  // Mobile filter event handlers
  mobileFilterButton.addEventListener('click', () => {
    mobileFilterOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileFilterClose.addEventListener('click', () => {
    mobileFilterOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close overlay when clicking outside content
  mobileFilterOverlay.addEventListener('click', (e) => {
    if (e.target === mobileFilterOverlay) {
      mobileFilterOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // Section toggle functionality
  mobileCategoryHeader.addEventListener('click', () => {
    mobileCategorySection.classList.toggle('open');
  });

  mobileMonthHeader.addEventListener('click', () => {
    mobileMonthSection.classList.toggle('open');
  });

  // Reset button
  mobileFilterReset.addEventListener('click', () => {
    // Get currently selected values before clearing (for tracking)
    const selectedCategories = getSelectedValues(categorySelect);
    const selectedMonths = getSelectedValues(monthSelect);

    // Fire tracking events for cleared filters
    trackClearedFilters(selectedCategories, categorySelect, 'RD_CATEGORY_', true);
    trackClearedFilters(selectedMonths, monthSelect, 'RD_', false);

    // Reset mobile state
    mobileFilterState = { categories: [], months: [] };

    // Uncheck all mobile checkboxes
    mobileCategoryContent.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });
    mobileMonthContent.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });

    // Reset desktop selects
    categorySelect.selectedIndex = 0;
    monthSelect.selectedIndex = 0;

    // Update desktop summaries
    catMulti.summary.textContent = placeholders.allCategories || 'All Categories';
    monthMulti.summary.textContent = placeholders.allMonths || 'All Months';

    // Apply filters
    triggerFilterChange(categorySelect, monthSelect, blogIndex);
  });

  // Apply button
  mobileFilterApply.addEventListener('click', async () => {
    // Update desktop selects with mobile state
    Array.from(categorySelect.options).forEach((option) => {
      option.selected = mobileFilterState.categories.includes(option.value);
    });
    Array.from(monthSelect.options).forEach((option) => {
      option.selected = mobileFilterState.months.includes(option.value);
    });

    // Update desktop summaries with category names instead of count
    const selectedCategories = getSelectedValues(categorySelect);
    const selectedMonths = getSelectedValues(monthSelect);

    if (selectedCategories.length > 0) {
      const categoryLabels = await getCategoryLabels(selectedCategories);
      catMulti.summary.textContent = categoryLabels.join(', ');
    } else {
      catMulti.summary.textContent = placeholders.allCategories || 'All Categories';
    }

    if (selectedMonths.length > 0) {
      const monthLabels = getMonthLabels(selectedMonths);
      monthMulti.summary.textContent = monthLabels.join(', ');
    } else {
      monthMulti.summary.textContent = placeholders.allMonths || 'All Months';
    }

    // If not on blog page, navigate to blog with parameters
    if (!isBlogPage()) {
      navigateToBlogWithParams(selectedCategories, selectedMonths);
      return;
    }

    // Apply filters
    triggerFilterChange(categorySelect, monthSelect, blogIndex);

    // Close mobile overlay
    mobileFilterOverlay.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Listen for clear filters event
  window.addEventListener('blog-filter-clear', () => {
    // Get currently selected values before clearing (for tracking)
    const selectedCategories = getSelectedValues(categorySelect);
    const selectedMonths = getSelectedValues(monthSelect);

    // Fire tracking events for cleared filters
    trackClearedFilters(selectedCategories, categorySelect, 'RD_CATEGORY_', true);
    trackClearedFilters(selectedMonths, monthSelect, 'RD_', false);

    // Uncheck all desktop checkboxes
    catMulti.menu.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });
    monthMulti.menu.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });

    // Uncheck all mobile checkboxes
    mobileCategoryContent.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });
    mobileMonthContent.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
      cb.checked = false;
    });

    // Reset mobile filter state
    mobileFilterState = { categories: [], months: [] };

    // Reset desktop selects to first option (All)
    Array.from(categorySelect.options).forEach((option) => {
      option.selected = option.value === 'all';
    });
    Array.from(monthSelect.options).forEach((option) => {
      option.selected = option.value === 'all';
    });

    // Update desktop summaries
    catMulti.summary.textContent = placeholders.allCategories || 'All Categories';
    monthMulti.summary.textContent = placeholders.allMonths || 'All Months';

    // Apply filters (with no selections)
    triggerFilterChange(categorySelect, monthSelect, blogIndex);
  });

  // Listen for apply filters event (from tag clicks, etc.)
  window.addEventListener('blog-filter-apply', (event) => {
    const { categories = [], months = [] } = event.detail;

    // Update category selections
    Array.from(categorySelect.options).forEach((option) => {
      option.selected = categories.includes(option.value);
    });

    // Update month selections
    Array.from(monthSelect.options).forEach((option) => {
      option.selected = months.includes(option.value);
    });

    // Update desktop checkboxes
    catMulti.menu.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = categories.includes(checkbox.value);
    });

    monthMulti.menu.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = months.includes(checkbox.value);
    });

    // Update mobile checkboxes
    mobileCategoryContent.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = categories.includes(checkbox.value);
    });

    mobileMonthContent.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
      checkbox.checked = months.includes(checkbox.value);
    });

    // Update mobile filter state
    mobileFilterState = { categories: [...categories], months: [...months] };

    // Update desktop summaries with category names instead of count
    (async () => {
      if (categories.length > 0) {
        const categoryLabels = await getCategoryLabels(categories);
        catMulti.summary.textContent = categoryLabels.join(', ');
      } else {
        catMulti.summary.textContent = placeholders.allCategories || 'All Categories';
      }

      if (months.length > 0) {
        const monthLabels = getMonthLabels(months);
        monthMulti.summary.textContent = monthLabels.join(', ');
      } else {
        monthMulti.summary.textContent = placeholders.allMonths || 'All Months';
      }

      // Apply filters
      triggerFilterChange(categorySelect, monthSelect, blogIndex);
    })();
  });

  // Expose methods for external use
  block.getSelectedCategories = () => getSelectedValues(categorySelect);
  block.getSelectedMonths = () => getSelectedValues(monthSelect);
  block.applyFilters = (items) => applyFilters(
    items,
    getSelectedValues(categorySelect),
    getSelectedValues(monthSelect),
  );
}
