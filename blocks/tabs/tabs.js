import { toClassName } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function updateNotchPosition(block, activeButton) {
  if (!activeButton) return;
  const containerRect = block.getBoundingClientRect();
  const buttonRect = activeButton.getBoundingClientRect();
  const centerX = (buttonRect.left - containerRect.left) + (buttonRect.width / 2);
  block.style.setProperty('--notch-x', `${Math.round(centerX)}px`);
}

function handleScrollToActive(tablist, selectedButton) {
  if (window.innerWidth <= 1024) {
    const { scrollWidth, offsetWidth: containerWidth } = tablist;
    if (scrollWidth > containerWidth) {
      const targetScrollLeft = selectedButton.offsetLeft;

      tablist.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth',
      });
    }
  }
}

async function loadAndSwapFragment(path, container) {
  if (!path) return;
  try {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const fragment = await loadFragment(normalizedPath);
    if (!fragment) return;

    container.innerHTML = '';
    const itemsToAppend = Array.from(fragment.children).filter((c) => c.classList.contains('section'));
    const content = itemsToAppend.length > 0 ? itemsToAppend : [fragment.cloneNode(true)];

    content.forEach((node) => {
      node.style.display = 'block';
      node.style.opacity = '0';
      node.style.transition = 'opacity 0.2s ease';
      container.appendChild(node);
      requestAnimationFrame(() => {
        node.style.opacity = '1';
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load fragment:', error);
  }
}

async function switchTab(selectedButton, config, isInitial = false) {
  const {
    tabButtons,
    tabPanels,
    contentContainer,
    block,
    tablist,
  } = config;
  const selectedIndex = Number(selectedButton.dataset.index);
  const selectedPanel = tabPanels[selectedIndex];

  if (!selectedPanel || (!isInitial && selectedButton.getAttribute('aria-selected') === 'true')) return;

  tabButtons.forEach((btn) => {
    btn.setAttribute('aria-selected', 'false');
    btn.setAttribute('tabindex', '-1');
  });
  selectedButton.setAttribute('aria-selected', 'true');
  selectedButton.setAttribute('tabindex', '0');

  const { fragmentPath } = selectedPanel.dataset;
  if (fragmentPath && contentContainer) {
    const delay = isInitial ? 0 : 50;
    setTimeout(() => loadAndSwapFragment(fragmentPath, contentContainer), delay);
  }

  updateNotchPosition(block, selectedButton);
  if (!isInitial) handleScrollToActive(tablist, selectedButton);
}

export default async function decorate(block) {
  const tablist = document.createElement('div');
  tablist.className = 'tabs-list';
  tablist.setAttribute('role', 'tablist');

  const section = block.closest('.section');
  let contentContainer = section?.querySelector('.tab-content-container');

  if (!contentContainer) {
    contentContainer = document.createElement('div');
    contentContainer.className = 'tab-content-container';
    block.insertAdjacentElement('afterend', contentContainer);
  }

  const tabButtons = [];
  const tabPanels = [];
  const tabElements = [...block.children].map((child) => child.firstElementChild);

  tabElements.forEach((tab, i) => {
    const id = toClassName(tab.textContent);
    const tabpanel = block.children[i];
    const fragmentBlock = tabpanel.querySelector('.fragment');
    const fragmentPath = fragmentBlock?.querySelector('a')?.getAttribute('href');
    if (fragmentBlock) fragmentBlock.remove();

    tabpanel.className = 'tabs-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', 'true');
    tabpanel.setAttribute('role', 'tabpanel');
    if (fragmentPath) tabpanel.dataset.fragmentPath = fragmentPath;
    tabPanels.push(tabpanel);

    const button = document.createElement('button');
    button.className = 'tabs-tab';
    button.id = `tab-${id}`;
    button.innerHTML = tab.innerHTML;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    button.setAttribute('tabindex', i === 0 ? '0' : '-1');
    button.dataset.index = i;
    tabButtons.push(button);
    tablist.append(button);
    tab.remove();
  });

  block.prepend(tablist);
  const config = {
    tabButtons,
    tabPanels,
    contentContainer,
    block,
    tablist,
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn, config));
  });

  let ticking = false;
  tablist.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const activeButton = tablist.querySelector('[aria-selected="true"]');
        updateNotchPosition(block, activeButton);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  block.addEventListener('keydown', (e) => {
    const currentTab = document.activeElement.closest('button');
    if (!currentTab || !block.contains(currentTab)) return;

    const currentIndex = Number(currentTab.dataset.index);
    let nextIndex = null;

    switch (e.key) {
      case 'Tab':
        if (!e.shiftKey && currentIndex + 1 < tabButtons.length) {
          e.preventDefault();
          nextIndex = currentIndex + 1;
        }
        break;
      case 'ArrowRight':
        if (currentIndex + 1 < tabButtons.length) nextIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        if (currentIndex - 1 >= 0) nextIndex = currentIndex - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        switchTab(currentTab, config);
        return;
      default:
        return;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextTab = tabButtons[nextIndex];
      tabButtons.forEach((t) => t.setAttribute('tabindex', '-1'));
      nextTab.setAttribute('tabindex', '0');
      nextTab.focus();
      handleScrollToActive(tablist, nextTab);
    }
  });

  window.addEventListener('resize', () => {
    const activeButton = tablist.querySelector('[aria-selected="true"]');
    updateNotchPosition(block, activeButton);
  }, { passive: true });

  const init = () => {
    if (tabButtons[0]) {
      switchTab(tabButtons[0], config, true);
      setTimeout(() => updateNotchPosition(block, tabButtons[0]), 500);
    }
  };

  if (section?.getAttribute('data-section-status') === 'loaded') {
    init();
  } else {
    const observer = new MutationObserver(() => {
      if (section?.getAttribute('data-section-status') === 'loaded') {
        init();
        observer.disconnect();
      }
    });
    observer.observe(section, { attributes: true });
  }
}
