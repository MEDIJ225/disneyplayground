import { createElement, createIcon } from '../../utils/dom.js';
import { fetchPlaceholders } from '../../scripts/aem.js';

/**
 * Fetches the pyt index with caching
 * @returns {Promise<Array>} - The pyt index data
 */
async function fetchPytIndex() {
  if (window.pytIndex) {
    return window.pytIndex;
  }
  const response = await fetch('/pyt-index.json');
  if (!response.ok) throw new Error('Failed to load pyt index');
  const json = await response.json();
  const { data = [] } = json;
  window.pytIndex = data;
  return data;
}

/**
 * Extracts pages from subfolders only (not directly under /plan-your-trip)
 * @param {Array} pytIndex - The pyt index data
 * @returns {Array} - Array of page objects with path and title
 */
function extractSubfolderPages(pytIndex) {
  const pages = [];

  pytIndex.forEach((item) => {
    if (item.path && item.path.startsWith('/plan-your-trip/')) {
      const pathParts = item.path.split('/').filter((part) => part);
      const pytIndexPosition = pathParts.indexOf('plan-your-trip');

      if (pytIndexPosition !== -1 && pathParts.length > pytIndexPosition + 2) {
        let title = item.title || item.path.split('/').pop();
        if (title.includes('|')) {
          title = title.split('|')[1].trim();
        }
        pages.push({
          path: item.path,
          title,
        });
      }
    }
  });

  pages.sort((a, b) => a.title.localeCompare(b.title));

  return pages;
}

/**
 * Gets all menu options from a dropdown menu
 * @param {HTMLElement} menu - The menu element
 * @returns {NodeList} - All custom select option elements
 */
function getMenuOptions(menu) {
  return menu.querySelectorAll('.custom-select-option');
}

/**
 * Clamps an index value within the bounds of menu options
 * @param {number} index - The index to clamp
 * @param {number} maxLength - Maximum length (menuOptions.length)
 * @returns {number} - Clamped index value
 */
function clampIndex(index, maxLength) {
  return Math.max(0, Math.min(maxLength - 1, index));
}

/**
 * Creates a keydown event handler for dropdown navigation
 * @param {Object} dropdown - The dropdown object with all necessary methods and state
 * @param {boolean} isMenuHandler - Whether this is for menu navigation (vs trigger)
 * @returns {Function} - Event handler function
 */
function createKeydownHandler(dropdown, isMenuHandler = false) {
  return (e) => {
    const {
      openDropdown,
      closeDropdown,
      selectOption,
      updateSelectedOption,
      menu,
    } = dropdown;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault();
        e.stopPropagation();
        const menuOptions = getMenuOptions(menu);
        const direction = e.key === 'ArrowDown' ? 1 : -1;

        if (isMenuHandler) {
          const newIndex = clampIndex(dropdown.selectedIndex + direction, menuOptions.length);
          dropdown.selectedIndex = newIndex;
          updateSelectedOption();
        } else if (!dropdown.isOpen()) {
          openDropdown();
        } else {
          const newIndex = clampIndex(dropdown.selectedIndex + direction, menuOptions.length);
          dropdown.selectedIndex = newIndex;
          updateSelectedOption();
        }
        break;
      }
      case 'Enter':
      case ' ': {
        e.preventDefault();
        e.stopPropagation();
        if (isMenuHandler) {
          selectOption(dropdown.selectedIndex);
        } else if (!dropdown.isOpen()) {
          openDropdown();
        } else if (dropdown.selectedIndex >= 0) {
          selectOption(dropdown.selectedIndex);
        }
        break;
      }
      case 'Escape': {
        e.preventDefault();
        e.stopPropagation();
        if (dropdown.isOpen()) {
          closeDropdown();
        }
        break;
      }
      case 'Tab': {
        if (dropdown.isOpen()) {
          closeDropdown();
        }
        break;
      }
      default:
        break;
    }
  };
}

/**
 * Creates a custom dropdown element
 * @param {string} id - Element ID
 * @param {string} title - Title text
 * @param {string} placeholder - Placeholder text
 * @param {Array} options - Array of option objects with value and text
 * @returns {Object} - Object with root, trigger, menu, title, summary elements
 */
function createCustomDropdown(id, title, placeholder, options) {
  const container = createElement('div', { class: 'pyt-filter-dropdown' });
  const root = createElement('div', { class: 'custom-select' });
  const trigger = createElement('button', {
    type: 'button',
    role: 'combobox',
    class: 'custom-select-trigger',
    'aria-label': title,
    'aria-haspopup': 'true',
    'aria-expanded': 'false',
    'aria-describedby': `${id}-summary`,
    'data-id': id,
  });
  const text = createElement('div', { class: 'custom-select-text' });
  const titleEl = title ? createElement('span', { class: 'custom-select-title' }, title) : null;
  const summary = createElement('span', {
    class: 'custom-select-summary',
    id: `${id}-summary`,
  }, placeholder);
  const caret = createIcon('norgie-opened');

  if (titleEl) {
    text.append(titleEl, summary);
  } else {
    text.append(summary);
  }
  trigger.append(text, caret);

  const menu = createElement('div', {
    class: 'custom-select-menu',
    role: 'listbox',
    'aria-labelledby': `${id}-summary`,
  });

  options.forEach((option, index) => {
    const optionId = `${id}-option-${index}`;
    const optionEl = createElement('div', {
      class: 'custom-select-option',
      'data-value': option.value,
      role: 'option',
      'aria-selected': 'false',
      'aria-expanded': 'true',
      id: optionId,
      tabindex: '-1',
    }, option.text);
    menu.append(optionEl);
  });

  root.append(trigger, menu);
  container.append(root);

  let selectedIndex = -1;
  let isOpen = false; // eslint-disable-line no-unused-vars

  function updateSelectedOption() {
    const menuOptions = getMenuOptions(menu);
    menuOptions.forEach((option, index) => {
      option.setAttribute('aria-selected', index === selectedIndex ? 'true' : 'false');
    });

    if (selectedIndex >= 0 && selectedIndex < menuOptions.length && isOpen) {
      const activeOption = menuOptions[selectedIndex];
      activeOption.focus();
    }
  }

  function openDropdown() {
    root.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    isOpen = true;

    const menuOptions = getMenuOptions(menu);
    if (menuOptions.length > 0) {
      let foundSelected = false;
      for (let i = 0; i < menuOptions.length; i += 1) {
        if (menuOptions[i].classList.contains('selected')) {
          selectedIndex = i;
          foundSelected = true;
          break;
        }
      }
      if (!foundSelected) {
        selectedIndex = 0;
      }
      updateSelectedOption();
    }
  }

  function closeDropdown(shouldFocus = true) {
    root.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    isOpen = false;
    if (shouldFocus) {
      trigger.focus();
    }
  }

  function selectOption(index) {
    const menuOptions = getMenuOptions(menu);
    if (index >= 0 && index < menuOptions.length) {
      const option = menuOptions[index];
      const { value } = option.dataset;
      const optionText = option.textContent;

      summary.textContent = optionText;

      closeDropdown();

      const changeEvent = new CustomEvent('change', {
        detail: { value, text: optionText, index },
      });
      root.dispatchEvent(changeEvent);
    }
  }

  trigger.addEventListener('click', () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  trigger.addEventListener('keydown', createKeydownHandler({
    isOpen: () => isOpen,
    openDropdown,
    closeDropdown,
    selectOption,
    updateSelectedOption,
    menu,
    get selectedIndex() { return selectedIndex; },
    set selectedIndex(value) { selectedIndex = value; },
  }, false));

  menu.addEventListener('click', (e) => {
    const option = e.target.closest('.custom-select-option');
    if (option) {
      const index = [...getMenuOptions(menu)].indexOf(option);
      selectOption(index);
    }
  });

  menu.addEventListener('keydown', createKeydownHandler({
    isOpen: () => isOpen,
    openDropdown,
    closeDropdown,
    selectOption,
    updateSelectedOption,
    menu,
    get selectedIndex() { return selectedIndex; },
    set selectedIndex(value) { selectedIndex = value; },
  }, true));

  document.addEventListener('click', (e) => {
    if (!root.contains(e.target)) {
      closeDropdown(false);
    }
  });

  return {
    container,
    root,
    trigger,
    menu,
    title: titleEl,
    summary,
    openDropdown,
    closeDropdown,
    selectOption,
  };
}

/**
 * Plan Your Trip filter block with a single dropdown for navigation
 */
export default async function decorate(block) {
  try {
    const placeholders = await fetchPlaceholders();
    const pytIndex = await fetchPytIndex();
    if (!pytIndex || pytIndex.length === 0) {
      block.innerHTML = `<p>${placeholders.noPytDataAvailable || 'No plan your trip data available.'}</p>`;
      return;
    }

    const pages = extractSubfolderPages(pytIndex);

    if (pages.length === 0) {
      block.innerHTML = `<p>${placeholders.noPagesFound || 'No pages found.'}</p>`;
      return;
    }

    const filterContainer = createElement('div', { class: 'pyt-filter-container' });

    const pageOptions = pages.map((page) => ({
      value: page.path,
      text: page.title,
    }));

    const pageDropdown = createCustomDropdown(
      'page-select',
      placeholders.selectTravelProvider || 'Select Travel Provider & Charities',
      placeholders.chooseAPage || 'Choose a page',
      pageOptions,
    );

    filterContainer.append(pageDropdown.container);

    block.innerHTML = '';
    block.append(filterContainer);

    const currentPath = window.location.pathname;
    const currentPage = pages.find((page) => page.path === currentPath);
    if (currentPage) {
      pageDropdown.summary.textContent = currentPage.title;
      const pageIndex = pages.findIndex((page) => page.path === currentPath);
      if (pageIndex >= 0) {
        const menuOptions = getMenuOptions(pageDropdown.menu);
        menuOptions[pageIndex].setAttribute('aria-selected', 'true');
        menuOptions[pageIndex].classList.add('selected');
      }
    }

    // Navigate when selection changes
    pageDropdown.root.addEventListener('change', (e) => {
      const { value } = e.detail;
      if (value) {
        window.location.href = value;
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error loading pyt filter:', error);
    const placeholders = await fetchPlaceholders();
    block.innerHTML = `<p>${placeholders.errorLoadingPytFilter || 'Error loading filter. Please try again later.'}</p>`;
  }
}
