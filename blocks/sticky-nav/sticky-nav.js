import { createIcon, createElement } from '../../utils/dom.js';

const createButton = (className, attributes = {}) => createElement('button', { class: className, ...attributes });

const createMenuButton = (text, iconName, iconSize = '', className = 'mobile-menu-toggle') => {
  const button = createButton(className, {
    'aria-expanded': 'false',
    'aria-haspopup': 'true',
  });
  button.textContent = text;

  const icon = createIcon(iconName, iconSize);
  if (className.includes('dropdown')) {
    icon.classList.add('dropdown-icon');
  } else {
    icon.classList.add('menu-icon');
  }
  button.appendChild(icon);

  return button;
};

const cloneLinks = (links) => Array.from(links).map((link) => link.cloneNode(true));

const toggleState = (element, isOpen, ariaElement = element) => {
  element.classList.toggle('open', isOpen);
  ariaElement.setAttribute('aria-expanded', isOpen);
};

function toggleMenu(toggle, overlay, panel, isOpen) {
  toggleState(toggle, isOpen);
  toggleState(overlay, isOpen);
  toggleState(panel, isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function toggleDropdown(dropdown, isOpen) {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  toggleState(dropdown, isOpen, toggle);
}

const closeAllDropdowns = (dropdowns, except = null) => {
  dropdowns.forEach((dropdown) => {
    if (dropdown !== except) {
      toggleDropdown(dropdown, false);
    }
  });
};

function setupDropdownBehavior(block) {
  const dropdowns = block.querySelectorAll('.dropdown');

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      closeAllDropdowns(dropdowns, dropdown);
      const isOpen = dropdown.classList.contains('open');
      toggleDropdown(dropdown, !isOpen);
    });

    const handleKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('open');
        toggleDropdown(dropdown, !isOpen);
      } else if (e.key === 'Escape') {
        toggleDropdown(dropdown, false);
      }
    };

    toggle.addEventListener('keydown', handleKeydown);
  });

  document.addEventListener('click', (e) => {
    dropdowns.forEach((dropdown) => {
      if (!dropdown.contains(e.target)) {
        toggleDropdown(dropdown, false);
      }
    });
  });
}

function setupMenuBehavior(menu) {
  const toggle = menu.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-menu-overlay');
  const panel = document.querySelector('.mobile-menu-panel');

  if (!toggle || !overlay || !panel) return;

  const links = panel.querySelectorAll('a');
  if (links.length === 0) return;

  const handleToggleMenu = () => {
    const isOpen = toggle.classList.contains('open');
    toggleMenu(toggle, overlay, panel, !isOpen);
  };

  const closeMenu = () => toggleMenu(toggle, overlay, panel, false);

  toggle.addEventListener('click', handleToggleMenu);
  overlay.addEventListener('click', closeMenu);

  const closeButton = panel.querySelector('.mobile-menu-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeMenu);
  }

  const setupMobileDropdowns = () => {
    const mobileDropdownToggles = panel.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach((mobileToggle) => {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const dropdown = mobileToggle.closest('.mobile-dropdown');
        const isOpen = dropdown.classList.contains('open');
        toggleState(dropdown, !isOpen, mobileToggle);
      });
    });
  };

  setupMobileDropdowns();

  const setupLinkBehavior = () => {
    links.forEach((link) => {
      if (!link.closest('.mobile-dropdown-menu')) {
        link.addEventListener('click', () => {
          const icon = toggle.querySelector('.menu-icon');
          toggle.textContent = link.textContent.trim();
          if (icon) {
            toggle.appendChild(icon);
          }
          closeMenu();
        });
      }
    });
  };

  setupLinkBehavior();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.classList.contains('open')) {
      closeMenu();
      toggle.focus();
    }
  });
}

function createMobileDropdown(dropdown) {
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  if (!toggle || !menu) return null;

  const mobileDropdown = createElement('div', { class: 'mobile-dropdown' });
  const mobileToggle = createMenuButton(
    toggle.textContent.trim(),
    'norgie-opened',
    'xs',
    'mobile-dropdown-toggle',
  );

  const mobileMenu = createElement('div', { class: 'mobile-dropdown-menu' });
  const menuLinks = menu.querySelectorAll('a');

  cloneLinks(menuLinks).forEach((link) => mobileMenu.appendChild(link));

  mobileDropdown.appendChild(mobileToggle);
  mobileDropdown.appendChild(mobileMenu);

  return mobileDropdown;
}

function createMobileMenu(block) {
  const nav = block.querySelector('ul');
  const items = nav.querySelectorAll('li');

  if (items.length === 0) return;

  const menu = createElement('div', { class: 'mobile-menu' });
  const activeLink = nav.querySelector('a.active:not(.dropdown-toggle)');
  const firstLink = nav.querySelector('a:not(.dropdown-toggle)');
  const displayLink = activeLink || firstLink;
  const toggle = createMenuButton(
    displayLink ? displayLink.textContent.trim() : 'Menu',
    'norgie-opened',
    '',
    'mobile-menu-toggle',
  );

  const overlay = createElement('div', { class: 'mobile-menu-overlay' });
  const panel = createElement('div', { class: 'mobile-menu-panel' });
  const closeButton = createButton('mobile-menu-close', {
    'aria-label': 'Close menu',
    type: 'button',
  });

  closeButton.appendChild(createIcon('close-reversed', 'm'));

  const populatePanel = () => {
    items.forEach((item) => {
      const dropdown = item.querySelector('.dropdown');
      const icon = item.querySelector('i.icon:not(.dropdown-icon)'); // 👈 original icon (skip the arrow icon)
      if (dropdown) {
        const mobileDropdown = createMobileDropdown(dropdown);
        if (mobileDropdown) {
          // ✅ If there's an icon, prepend it before the dropdown toggle text
          const mobiletoggle = mobileDropdown.querySelector('.mobile-dropdown-toggle');
          if (icon && mobiletoggle) {
            mobiletoggle.insertBefore(icon.cloneNode(true), mobiletoggle.firstChild);
          }
          panel.appendChild(mobileDropdown);
        }
      } else {
        const link = item.querySelector('a');
        if (icon) {
          const wrapper = document.createElement('p');
          wrapper.appendChild(icon.cloneNode(true));
          wrapper.appendChild(link.cloneNode(true));
          panel.appendChild(wrapper);
        } else {
          panel.appendChild(link.cloneNode(true));
        }
      }
    });
  };

  populatePanel();
  panel.appendChild(closeButton);
  menu.appendChild(toggle);
  nav.parentNode.insertBefore(menu, nav);
  document.body.append(overlay, panel);
  setupMenuBehavior(menu);
}

const createDropdownStructure = (mainLink, menuLinks) => {
  const dropdown = createElement('div', { class: 'dropdown' });
  const toggle = createMenuButton(
    mainLink.textContent.trim(),
    'norgie-opened',
    'xs',
    'dropdown-toggle',
  );

  // ✅ Fix: Preserve the original icon if it exists
  const icon = mainLink.previousElementSibling?.matches('i.icon') ? mainLink.previousElementSibling : null;
  if (icon) {
    toggle.insertBefore(icon.cloneNode(true), toggle.firstChild);
  }

  const menu = createElement('div', { class: 'dropdown-menu' });
  cloneLinks(menuLinks).forEach((link) => menu.appendChild(link));

  dropdown.appendChild(toggle);
  dropdown.appendChild(menu);

  return dropdown;
};

function processDropdowns(block) {
  const nav = block.querySelector('ul');
  const items = nav.querySelectorAll('li');

  items.forEach((item) => {
    const nestedList = item.querySelector('ul');
    if (nestedList) {
      const mainLink = item.querySelector('a');
      if (mainLink) {
        const menuLinks = nestedList.querySelectorAll('a');
        const dropdown = createDropdownStructure(mainLink, menuLinks);

        item.innerHTML = '';
        item.appendChild(dropdown);
      }
    }
  });
}

function createPlaceholder(block) {
  const placeholder = createElement('div', { class: 'sticky-nav-placeholder' });
  block.parentNode.insertBefore(placeholder, block.nextSibling);
  block.placeholder = placeholder;
}

function setActiveState(block) {
  const links = block.querySelectorAll('a');
  if (links.length === 0) return;

  const currentPath = window.location.pathname;
  let activeLink = null;

  links.forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      activeLink = link;
    }
  });

  if (!activeLink && links.length > 0) {
    [activeLink] = links;
  }

  if (activeLink) {
    activeLink.classList.add('active');
  }
}

function setupStickyBehavior(block) {
  const gradientContainer = document.querySelector('.event-hero-gradient');

  function updateEventHeroHeight() {
    if (window.innerWidth >= 1024) {
      if (gradientContainer) {
        const heroHeight = gradientContainer.classList.contains('is-sticky') ? gradientContainer.offsetHeight : 0;
        document.documentElement.style.setProperty('--event-hero-height', `${heroHeight - 2}px`);
      }
    } else {
      document.documentElement.style.setProperty('--event-hero-height', '0px');
    }
  }

  updateEventHeroHeight();
  window.addEventListener('resize', updateEventHeroHeight, { passive: true });

  window.addEventListener('heroStickyChange', (e) => {
    const { isSticky, heroHeight } = e.detail;
    document.documentElement.style.setProperty('--event-hero-height', `${isSticky ? (heroHeight - 1) : 0}px`);

    const navIsSticky = block.classList.contains('is-sticky');
    if (isSticky !== navIsSticky) {
      block.classList.toggle('is-sticky', isSticky);
      if (block.placeholder) {
        block.placeholder.style.height = isSticky ? `${block.offsetHeight}px` : '0px';
      }
    }
  });
}

export default async function decorate(block) {
  const nav = block.querySelector('ul');
  const boxview = document.querySelector('.box-view');
  if (!nav) return;

  if (boxview) {
    boxview.parentElement.classList.add('section-nav-container');
  }

  block.classList.add('sticky-nav');
  processDropdowns(block);
  setActiveState(block);
  setupDropdownBehavior(block);
  createMobileMenu(block);
  createPlaceholder(block);
  setupStickyBehavior(block);
}
