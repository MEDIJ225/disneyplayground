import { getMetadata, fetchPlaceholders } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { createElement, createIcon } from '../../utils/dom.js';
import { hideDecorativeIcons } from '../../scripts/scripts.js';

const isDesktop = window.matchMedia('(min-width: 1024px)');

/**
 * Gets all focusable elements within a container
 * @param {Element} container The container element
 * @returns {Array<Element>} Array of focusable elements
 */
function getFocusableElements(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');
  return Array.from(container.querySelectorAll(focusableSelectors))
    .filter((el) => {
      // Filter out hidden elements
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    });
}

/**
 * Traps focus within the navigation when it's open
 * Focus is restricted to .nav-hamburger and .nav-sections only
 * @param {Element} nav The navigation element
 * @param {Event} e The keyboard event
 */
function trapFocus(nav, e) {
  if (e.key !== 'Tab' || !nav || nav.getAttribute('aria-expanded') !== 'true' || nav.classList.contains('search-active')) {
    return;
  }

  const hamburgerSection = nav.querySelector('.nav-hamburger');
  const navSections = nav.querySelector('.nav-sections');
  if (!hamburgerSection && !navSections) {
    return;
  }

  const hamburgerElements = hamburgerSection ? getFocusableElements(hamburgerSection) : [];
  const navSectionsElements = navSections ? getFocusableElements(navSections) : [];
  const allFocusableElements = [...hamburgerElements, ...navSectionsElements];

  if (allFocusableElements.length === 0) {
    return;
  }

  const { activeElement } = document;
  const activeIndex = allFocusableElements.indexOf(activeElement);
  const hamburgerCount = hamburgerElements.length;
  const totalCount = allFocusableElements.length;
  const firstElement = allFocusableElements[0];
  const lastElement = allFocusableElements[totalCount - 1];

  // Redirect if focus is outside allowed containers or not in list
  const isOutsideContainers = !hamburgerSection?.contains(activeElement)
    && !navSections?.contains(activeElement);
  if (activeIndex === -1 || isOutsideContainers) {
    e.preventDefault();
    e.stopPropagation();
    firstElement.focus();
    return;
  }

  // Handle boundary cases
  const isAtStart = activeIndex === 0;
  const isAtEnd = activeIndex === totalCount - 1;
  const isFirstNavSection = activeIndex === hamburgerCount;
  const isOnHamburger = activeIndex < hamburgerCount;

  if (e.shiftKey) {
    // Shift+Tab: backward navigation
    if (isAtStart) {
      e.preventDefault();
      e.stopPropagation();
      lastElement.focus();
    } else if (isFirstNavSection) {
      e.preventDefault();
      e.stopPropagation();
      firstElement.focus();
    }
  } else if (isAtEnd) {
    // Tab: forward navigation - at end, wrap to start
    e.preventDefault();
    e.stopPropagation();
    firstElement.focus();
  } else if (isOnHamburger && navSectionsElements.length > 0) {
    // Tab: forward navigation - move from hamburger to nav sections
    e.preventDefault();
    e.stopPropagation();
    navSectionsElements[0].focus();
  }
}

let focusTrapHandler = null;
let focusInHandler = null;

/**
 * Handles focusin events to prevent focus from leaving .nav-hamburger and .nav-sections
 * @param {Element} nav The navigation element
 * @param {Event} e The focusin event
 */
function handleFocusIn(nav, e) {
  if (!nav || nav.getAttribute('aria-expanded') !== 'true' || nav.classList.contains('search-active')) {
    return;
  }

  const { target: activeElement } = e;
  const hamburgerSection = nav.querySelector('.nav-hamburger');
  const navSections = nav.querySelector('.nav-sections');

  if (!hamburgerSection?.contains(activeElement) && !navSections?.contains(activeElement)) {
    const hamburgerButton = hamburgerSection?.querySelector('button');
    if (hamburgerButton) {
      e.preventDefault();
      e.stopPropagation();
      hamburgerButton.focus();
    }
  }
}

/**
 * Sets up focus trapping for the navigation
 * @param {Element} nav The navigation element
 */
function setupFocusTrap(nav) {
  // Remove existing trap if any
  if (focusTrapHandler) {
    document.removeEventListener('keydown', focusTrapHandler, true);
    focusTrapHandler = null;
  }
  if (focusInHandler) {
    document.removeEventListener('focusin', focusInHandler, true);
    focusInHandler = null;
  }

  // Only set up trap on mobile (when nav is open)
  if (!isDesktop.matches && nav.getAttribute('aria-expanded') === 'true') {
    // Handle Tab key navigation
    focusTrapHandler = (e) => trapFocus(nav, e);
    document.addEventListener('keydown', focusTrapHandler, true);

    // Handle any focus attempts outside .nav-hamburger and .nav-sections
    focusInHandler = (e) => handleFocusIn(nav, e);
    document.addEventListener('focusin', focusInHandler, true);
  }
}

/**
 * Removes focus trapping for the navigation
 */
function removeFocusTrap() {
  if (focusTrapHandler) {
    document.removeEventListener('keydown', focusTrapHandler, true);
    focusTrapHandler = null;
  }
  if (focusInHandler) {
    document.removeEventListener('focusin', focusInHandler, true);
    focusInHandler = null;
  }
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  sections.querySelectorAll('.nav-sections .default-content-wrapper > ul > li').forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
    section.querySelectorAll('.nav-nested-drop').forEach((nested) => {
      nested.setAttribute('aria-expanded', false);
    });
  });
}

/**
 * Handles keyboard interactions for opening nav dropdowns
 * @param {Event} e The keyboard event
 */
function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.classList.contains('nav-drop') || focused.classList.contains('nav-nested-drop');
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    e.preventDefault();
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    if (focused.classList.contains('nav-drop')) {
      toggleAllNavSections(focused.closest('.nav-sections'));
      focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
    } else if (focused.classList.contains('nav-nested-drop')) {
      focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
    }
  }
}

/**
 * Closes all open nested dropdowns
 */
function closeAllNestedDropdowns() {
  document.querySelectorAll('.nav-nested-drop[aria-expanded="true"]').forEach((dropdown) => {
    dropdown.setAttribute('aria-expanded', 'false');
    const icon = dropdown.querySelector('i');
    if (icon) {
      icon.className = 'icon icon__norgie-closed';
    }
  });
}

/**
 * Sets up keyboard navigation for focused nav sections
 */
function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
async function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  const span = button.querySelector('span');

  if (span) {
    span.classList.toggle('icon__menu-global-nav', expanded);
    span.classList.toggle('icon__close-button', !expanded);
  }

  document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
  const willBeOpen = !(expanded || isDesktop.matches);
  nav.setAttribute('aria-expanded', willBeOpen ? 'true' : 'false');
  const placeholders = await fetchPlaceholders();
  toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
  button.setAttribute('aria-label', expanded ? (placeholders.openNavigation || 'Open navigation') : (placeholders.closeNavigation || 'Close navigation'));

  // Set up or remove focus trap based on nav state
  if (willBeOpen) {
    // Nav is opening - set up focus trap
    setupFocusTrap(nav);
    // Move focus to hamburger button (close button) when nav opens
    setTimeout(() => {
      const hamburgerSection = nav.querySelector('.nav-hamburger');
      const hamburgerButton = hamburgerSection
        ? hamburgerSection.querySelector('button')
        : null;
      if (hamburgerButton) {
        hamburgerButton.focus();
      } else {
        // Fallback: focus first element in nav-sections
        const navSectionsFallback = nav.querySelector('.nav-sections');
        if (navSectionsFallback) {
          const focusableElements = getFocusableElements(navSectionsFallback);
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }
    }, 0);
  } else {
    // Nav is closing - remove focus trap
    removeFocusTrap();
  }

  const navDrops = navSections.querySelectorAll('.nav-drop, .nav-nested-drop');
  if (isDesktop.matches) {
    navDrops.forEach((drop) => {
      // Only add tabindex if it doesn't have one and doesn't have a direct <a> child
      const hasDirectLink = drop.querySelector(':scope > a');
      const hasParagraph = drop.querySelector(':scope > p');
      if (!drop.hasAttribute('tabindex') && hasParagraph && !hasDirectLink) {
        drop.setAttribute('tabindex', 0);
        drop.addEventListener('focus', focusNavSection);
      } else if (hasDirectLink) {
        // Remove tabindex from <li> if it has a direct <a> child
        drop.removeAttribute('tabindex');
      }
    });
  } else {
    navDrops.forEach((drop) => {
      // Only keep tabindex on nav-drop items with <p> elements (not <a>)
      const hasDirectLink = drop.querySelector(':scope > a');
      const hasParagraph = drop.querySelector(':scope > p');
      if (hasParagraph && !hasDirectLink) {
        if (!drop.hasAttribute('tabindex')) {
          drop.setAttribute('tabindex', 0);
        }
      } else if (hasDirectLink) {
        // Remove tabindex from <li> if it has a direct <a> child
        drop.removeAttribute('tabindex');
      }
      drop.removeEventListener('focus', focusNavSection);
    });
  }
}

/**
 * Handles clicks outside the navigation to close dropdowns
 * @param {Event} event The click event
 */
function handleOutsideClick(event) {
  const navElement = document.querySelector('nav');
  if (navElement && !navElement.contains(event.target)) {
    // If nav is open, close it and remove focus trap
    if (navElement.getAttribute('aria-expanded') === 'true' && !isDesktop.matches) {
      const navSections = navElement.querySelector('.nav-sections');
      if (navSections) {
        toggleMenu(navElement, navSections, false);
      }
    }
    document.querySelectorAll('.nav-drop[aria-expanded="true"]').forEach((section) => {
      section.setAttribute('aria-expanded', 'false');
    });
    closeAllNestedDropdowns();
  }
}

/**
 * Handles escape key press to close all dropdowns
 * @param {Event} event The keyboard event
 */
function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const navElement = document.querySelector('nav');
    // If nav is open, close it first
    if (navElement && navElement.getAttribute('aria-expanded') === 'true' && !isDesktop.matches) {
      const navSections = navElement.querySelector('.nav-sections');
      if (navSections) {
        toggleMenu(navElement, navSections, false);
        // Focus should return to hamburger button
        const button = navElement.querySelector('.nav-hamburger button');
        if (button) {
          button.focus();
        }
      }
    } else {
      // Close dropdowns if nav is not open
      document.querySelectorAll('.nav-drop[aria-expanded="true"]').forEach((section) => {
        section.setAttribute('aria-expanded', 'false');
      });
      closeAllNestedDropdowns();
    }
  }
}

let isInteractingWithNested = false;

/**
 * Checks if mouse is outside the dropdown area
 * @param {Element} navSection The nav section element
 * @param {Event} event The mouse event
 * @returns {Boolean} True if mouse is genuinely outside
 */
function isMouseOutsideDropdown(navSection, event) {
  if (isInteractingWithNested) {
    return false;
  }

  const rect = navSection.getBoundingClientRect();
  const dropdown = navSection.querySelector('ul');

  if (!dropdown) return true;

  const dropdownRect = dropdown.getBoundingClientRect();

  const combinedRect = {
    left: Math.min(rect.left, dropdownRect.left),
    right: Math.max(rect.right, dropdownRect.right),
    top: Math.min(rect.top, dropdownRect.top),
    bottom: Math.max(rect.bottom, dropdownRect.bottom),
  };

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  return mouseX < combinedRect.left
    || mouseX > combinedRect.right
    || mouseY < combinedRect.top
    || mouseY > combinedRect.bottom;
}

/**
 * Handles hover interactions for main nav dropdowns
 * @param {Element} navSection The nav section element
 * @param {Boolean} shouldOpen Whether to open or close the dropdown
 */
function handleDropdownHover(navSection, shouldOpen, event = null) {
  if (!isDesktop.matches) return;
  if (shouldOpen) {
    // On desktop, close other nav dropdowns when opening one
    const navSections = navSection.closest('.nav-sections');
    navSections.querySelectorAll('.nav-drop').forEach((section) => {
      if (section !== navSection) {
        section.setAttribute('aria-expanded', 'false');
        const norgieIcon = section.querySelector('.icon__norgie-closed, .icon__norgie-opened');
        if (norgieIcon) {
          norgieIcon.className = 'icon icon__norgie-closed';
        }
      }
    });

    navSection.setAttribute('aria-expanded', 'true');
    const parentIcon = navSection.querySelector('.icon__norgie-closed, .icon__norgie-opened');
    if (parentIcon) {
      parentIcon.className = 'icon icon__norgie-opened';
    }

    const hasOpenNested = navSection.querySelector('.nav-nested-drop[aria-expanded="true"]');
    if (!hasOpenNested) {
      const firstNested = navSection.querySelector('.nav-nested-drop');
      if (firstNested) {
        navSection.querySelectorAll('.nav-nested-drop').forEach((dropdown) => {
          dropdown.setAttribute('aria-expanded', 'false');
          const icon = dropdown.querySelector('i');
          if (icon) {
            icon.className = 'icon icon__norgie-closed';
          }
        });

        firstNested.setAttribute('aria-expanded', 'true');
        const icon = firstNested.querySelector('i');
        if (icon) {
          icon.className = 'icon icon__norgie-opened';
        }
      }
    }
  } else if (!event || isMouseOutsideDropdown(navSection, event)) {
    navSection.setAttribute('aria-expanded', 'false');
    const parentIcon = navSection.querySelector('.icon__norgie-closed, .icon__norgie-opened');
    if (parentIcon) {
      parentIcon.className = 'icon icon__norgie-closed';
    }
  }
}

/**
 * Handles click and keyboard interactions for nested dropdownsn
 * @param {Event} event The click or keyboard event
 */
function handleNestedToggle(event) {
  const { target } = event;
  const { currentTarget } = event;

  if (target.tagName === 'A') {
    return;
  }

  if (target.closest('.nav-nested-list') && target.closest('.nav-nested-list') !== currentTarget.querySelector('.nav-nested-list')) {
    return;
  }

  if (target.closest('a')) {
    return;
  }

  event.preventDefault();
  event.stopPropagation();

  isInteractingWithNested = true;

  setTimeout(() => {
    isInteractingWithNested = false;
  }, 50);

  const isExpanded = currentTarget.getAttribute('aria-expanded') === 'true';
  const parentNav = currentTarget.closest('.nav-drop');

  if (parentNav) {
    parentNav.querySelectorAll('.nav-nested-drop').forEach((dropdown) => {
      if (dropdown !== currentTarget) {
        dropdown.setAttribute('aria-expanded', 'false');
        const icon = dropdown.querySelector('i');
        if (icon) {
          icon.className = 'icon icon__norgie-closed';
        }
      }
    });
  }

  currentTarget.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
  const icon = currentTarget.querySelector('i');
  if (icon) {
    icon.className = isExpanded ? 'icon icon__norgie-closed' : 'icon icon__norgie-opened';
  }
}

/**
 * Decorates nested dropdowns within a nav section
 * @param {Element} navSection The nav section containing nested dropdowns
 */
function decorateNestedDropdowns(navSection) {
  const subList = navSection.querySelector('ul');
  if (!subList) return;

  if (!isDesktop.matches) {
    subList.classList.add('hidden');
    const topLevelLink = navSection.querySelector(':scope > a,:scope > p') || navSection.querySelector(':scope > span');

    if (topLevelLink) {
      // Always add click handler, but check if it's keyboard-triggered
      topLevelLink.addEventListener('click', (e) => {
        // Ignore keyboard-triggered clicks (e.detail === 0 means keyboard)
        // Also ignore if parent is focused (keyboard navigation)
        if (e.detail === 0 || document.activeElement === navSection) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        const isHidden = subList.classList.contains('hidden');

        if (isHidden) {
          subList.classList.remove('hidden');
          navSection.setAttribute('aria-expanded', 'true');
          const parentIcon = navSection.querySelector('.icon__norgie-closed, .icon__norgie-opened');
          if (parentIcon) {
            parentIcon.className = 'icon icon__norgie-opened';
          }
        } else {
          subList.classList.add('hidden');
          navSection.setAttribute('aria-expanded', 'false');
          const parentIcon = navSection.querySelector('.icon__norgie-closed, .icon__norgie-opened');
          if (parentIcon) {
            parentIcon.className = 'icon icon__norgie-closed';
          }
        }
      });
    }
  }

  subList.querySelectorAll('li').forEach((item) => {
    const nestedList = item.querySelector('ul');
    const hasDirectLink = item.querySelector(':scope > a');

    if (nestedList) {
      nestedList.classList.add('nav-nested-list');

      if (!hasDirectLink) {
        item.classList.add('nav-nested-drop');
        item.setAttribute('tabindex', '0');
        item.setAttribute('aria-expanded', 'false');
        item.prepend(createIcon('norgie-closed'));

        // Replace p tags with span tags in nav-nested-drop
        item.querySelectorAll('p').forEach((p) => {
          const span = createElement('span', {});
          span.innerHTML = p.innerHTML;
          p.replaceWith(span);
        });

        nestedList.querySelectorAll('a').forEach((a) => {
          const listItem = a.closest('li');
          const img = listItem.querySelector('img');
          listItem.innerHTML = '';

          // Get both textContent (for date extraction) and innerHTML (to preserve HTML tags)
          const dateMatch = a.textContent.match(/\([^)]+\)/);
          let dateText;
          let labelContent = a.innerHTML;

          if (dateMatch) {
            [dateText] = dateMatch;
            // Remove date from HTML content while preserving other HTML tags
            labelContent = labelContent.replace(dateText, '');
          }

          const labelSpan = createElement('span', { class: 'label' });
          labelSpan.innerHTML = labelContent;

          const anchor = createElement(
            'a',
            {
              href: a.href,
              ...(dateText ? {} : { class: 'no-date' }),
            },
            [
              ...(img ? [img] : []),
              createElement('div', { class: 'label-date-wrapper' }, [
                labelSpan,
                ...(dateText ? [createElement('span', { class: 'date' }, [dateText])] : []),
              ]),
            ],
          );

          listItem.append(anchor);
        });

        item.addEventListener('click', handleNestedToggle);

        const hasDirectChildLink = item.querySelector(':scope > a');
        if (!hasDirectChildLink) {
          item.addEventListener('keydown', (e) => {
            if (e.code === 'Enter' || e.code === 'Space') {
              const focusedElement = document.activeElement;
              if (focusedElement && focusedElement.tagName === 'A') {
                return;
              }

              // Stop propagation to prevent parent dropdown from handling this event
              e.stopPropagation();
              e.stopImmediatePropagation();

              handleNestedToggle(e);
            }
          }, true); // Use capture phase to handle before parent handlers
        }
      }
    } else {
      // Add nav-non-nested-drop class when there's no nested list
      item.classList.add('nav-non-nested-drop');
      item.querySelectorAll('p').forEach((p) => {
        const span = createElement('span', {});
        span.innerHTML = p.innerHTML;
        p.replaceWith(span);
      });
    }
  });
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/fragments/nav';
  const fragment = await loadFragment(navPath);

  block.innerHTML = '';
  const nav = createElement('nav', { id: 'nav' });
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  const classes = ['brand', 'sections', 'tools'];
  classes.forEach((c, i) => {
    const section = nav.children[i];
    if (section) section.classList.add(`nav-${c}`);
  });

  const navBrand = nav.querySelector('.nav-brand');
  const brandLink = navBrand.querySelector('.button');

  if (brandLink) {
    brandLink.className = '';
    brandLink.closest('.button-container').className = '';
  }

  const navSections = nav.querySelector('.nav-sections');
  if (navSections) {
    const navList = navSections.querySelector(':scope .default-content-wrapper > ul');
    if (navList) {
      const allLiItems = navList.querySelectorAll(':scope > li');
      allLiItems.forEach((li, index) => {
        if (index >= 7) {
          li.classList.add('nav-mobile-only');
        }
      });
      const children = Array.from(navList.childNodes);
      children.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim()) {
          const li = createElement('li', {}, child.textContent);
          navList.replaceChild(li, child);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'LI') {
          const li = createElement('li');
          navList.replaceChild(li, child);
          li.appendChild(child);
        }
      });
    }

    navSections.querySelectorAll(':scope .default-content-wrapper > ul > li').forEach((navSection) => {
      const paragraphTags = navSection.querySelectorAll(':scope p');
      paragraphTags.forEach((p) => {
        const directAnchor = p.querySelector(':scope > a');
        const hasExtraText = directAnchor && (
          p.textContent.trim() !== directAnchor.textContent.trim()
        );
        if (directAnchor && !hasExtraText) {
          p.replaceWith(directAnchor);
        } else if (p.querySelector(':scope > picture')) {
          const img = p.querySelector(':scope img');
          p.replaceWith(img);
        } else if (p.querySelector(':scope > p,:scope > i')) {
          p.replaceWith(p);
        } else {
          const span = createElement('span', {});
          span.innerHTML = p.innerHTML;
          p.replaceWith(span);
        }
      });

      const hasSubmenu = navSection.querySelector('ul');
      if (hasSubmenu) {
        navSection.classList.add('nav-drop');
        navSection.setAttribute('aria-haspopup', 'true');
        navSection.setAttribute('aria-expanded', 'false');

        // Add norgie-closed icon to parent nav (don't replace existing icons)
        const topLevelLink = navSection.querySelector(':scope > a,:scope > span,:scope > p');
        if (topLevelLink && !navSection.querySelector('.icon__norgie-closed, .icon__norgie-opened')) {
          topLevelLink.prepend(createIcon('norgie-closed'));
        }

        // Only make <li> focusable if it has a <p> element (not an <a>)
        // If it has an <a>, the <a> should be the focusable element
        const hasParagraph = navSection.querySelector(':scope > p');
        const hasDirectLink = navSection.querySelector(':scope > a');
        if (hasParagraph && !hasDirectLink) {
          navSection.setAttribute('tabindex', '0');
          // Mark this as keyboard-accessible so click handlers know to skip it
          navSection.dataset.keyboardAccessible = 'true';
        } else if (hasDirectLink) {
          // Remove tabindex from <li> if it has a direct <a> child - let the <a> be focusable
          navSection.removeAttribute('tabindex');
        }

        decorateNestedDropdowns(navSection);

        // Sync aria-expanded with actual hidden state for keyboard-accessible elements
        if (navSection.dataset.keyboardAccessible === 'true') {
          const subListForSync = navSection.querySelector('ul');
          if (subListForSync) {
            const isActuallyHidden = subListForSync.classList.contains('hidden');
            navSection.setAttribute('aria-expanded', isActuallyHidden ? 'false' : 'true');
          }
        }

        navSection.addEventListener('mouseenter', (e) => handleDropdownHover(navSection, true, e));
        navSection.addEventListener('mouseleave', (e) => handleDropdownHover(navSection, false, e));

        // Handle keyboard events for dropdown toggle (works on both mobile and desktop)
        navSection.addEventListener('keydown', (e) => {
          if (e.code === 'Enter' || e.code === 'Space') {
            // Check if this is a dropdown (has a submenu)
            const subList = navSection.querySelector('ul');
            if (!subList) return; // Not a dropdown, let default behavior happen

            // Check if the event is coming from a nested dropdown item
            // Nested dropdowns handle their own keyboard events, so ignore them here
            const nestedDropdown = e.target.closest('.nav-nested-drop');
            if (nestedDropdown && nestedDropdown.closest('ul') === subList) {
              // This is a nested dropdown - let it handle its own events
              return;
            }

            // Check if the target is a nested link (inside the dropdown menu)
            // Nested links should navigate normally, not toggle the dropdown
            const targetLink = e.target.closest('a');
            if (targetLink) {
              // Check if this link is inside the submenu (nested link)
              const linkParent = targetLink.closest('ul');
              if (linkParent && linkParent === subList) {
                // This is a nested link - let it navigate normally
                return;
              }

              // Check if this is the top-level link (direct child of navSection)
              const topLevelLinkElement = navSection.querySelector(':scope > a');
              if (topLevelLinkElement && targetLink === topLevelLinkElement) {
                // This is the top-level link - toggle dropdown instead of navigating
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
              } else {
                // Some other link - let it navigate
                return;
              }
            } else {
              // Not a link - toggle the dropdown
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            }

            // Determine current state and what action to take
            let shouldOpen;
            if (isDesktop.matches) {
              // On desktop, check aria-expanded (CSS controls visibility)
              const isExpanded = navSection.getAttribute('aria-expanded') === 'true';
              shouldOpen = !isExpanded;
            } else {
              // On mobile, check hidden class
              shouldOpen = subList.classList.contains('hidden');
            }

            if (isDesktop.matches) {
              // Desktop: use handleDropdownHover
              handleDropdownHover(navSection, shouldOpen);
            } else if (shouldOpen) {
              // Mobile: toggle hidden class on ul
              subList.classList.remove('hidden');
              navSection.setAttribute('aria-expanded', 'true');
              const parentIcon = navSection.querySelector('.icon__norgie-closed, .icon__norgie-opened');
              if (parentIcon) {
                parentIcon.className = 'icon icon__norgie-opened';
              }
            } else {
              subList.classList.add('hidden');
              navSection.setAttribute('aria-expanded', 'false');
              const parentIcon = navSection.querySelector('.icon__norgie-closed, .icon__norgie-opened');
              if (parentIcon) {
                parentIcon.className = 'icon icon__norgie-closed';
              }
            }
          }
        }, true); // Use capture phase to handle before other listeners

        // For keyboard-accessible elements, prevent keyboard-triggered click events
        if (navSection.dataset.keyboardAccessible === 'true') {
          const paragraphElement = navSection.querySelector(':scope > p');
          if (paragraphElement) {
            // Block only keyboard-triggered click events (e.detail === 0)
            // Allow real mouse clicks to work normally
            paragraphElement.addEventListener('click', (e) => {
              // Only block if it's keyboard-triggered (e.detail === 0) AND parent is focused
              if (e.detail === 0 && document.activeElement === navSection) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();
              }
            }, true); // Capture phase - intercept early
          }
        }

        // Ensure child elements (like <p>) don't interfere with parent <li> focus
        const childElements = navSection.querySelectorAll(':scope > p, :scope > span');
        childElements.forEach((child) => {
          if (!child.closest('a')) {
            // Make child elements not focusable - focus should go to parent <li>
            child.setAttribute('tabindex', '-1');
          }
        });

        const handleFocusInLocal = () => {
          // On desktop, close other nav dropdowns when focusing on one
          if (isDesktop.matches) {
            navSections.querySelectorAll('.nav-drop').forEach((section) => {
              if (section !== navSection && section.getAttribute('aria-expanded') === 'true') {
                section.setAttribute('aria-expanded', 'false');
                const norgieIcon = section.querySelector('.icon__norgie-closed, .icon__norgie-opened');
                if (norgieIcon) {
                  norgieIcon.className = 'icon icon__norgie-closed';
                }
              }
            });
          }
          // On mobile, allow multiple nav dropdowns to be open at the same time
        };

        navSection.addEventListener('focus', handleFocusInLocal);
        navSection.addEventListener('focusin', handleFocusInLocal);
      } else {
        navSection.removeAttribute('aria-expanded');
        navSection.classList.add('no-submenu');
        navSection.addEventListener('mouseenter', () => {
          const navSectionsP = navSection.closest('.nav-sections');
          navSectionsP.querySelectorAll('.nav-drop[aria-expanded="true"]').forEach((section) => {
            section.setAttribute('aria-expanded', 'false');
          });
        });
      }
    });
  }

  nav.querySelectorAll('a[href^="tel:"]').forEach((phoneLink) => {
    phoneLink.classList.add('nav-phone-link');

    const parentLi = phoneLink.closest('li');
    if (parentLi) {
      parentLi.classList.add('nav-phone-container');
    }
  });

  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
    <span class="icon size-s icon__menu-global-nav"></span>
  </button>`;
  hamburger.addEventListener('click', () => {
    const searchContainer = nav.querySelector('.nav-search-container');
    if (searchContainer) {
      // Close search if it's open
      if (nav.classList.contains('search-active')) {
        nav.classList.remove('search-active');
        searchContainer.classList.remove('open');
        const navTools = nav.querySelector('.nav-tools');
        const searchIcon = navTools.querySelector('i');
        if (searchIcon) {
          searchIcon.className = 'icon size-s icon__search';
          searchIcon.setAttribute('aria-label', 'Search');
        }
        const main = document.querySelector('main');
        if (main) {
          main.style.marginTop = '0px';
        }
      }
      toggleMenu(nav, navSections);
    }
  });

  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');

  toggleMenu(nav, navSections, isDesktop.matches);
  isDesktop.addEventListener('change', () => toggleMenu(nav, navSections, isDesktop.matches));

  document.addEventListener('click', handleOutsideClick);
  document.addEventListener('keydown', handleEscapeKey);

  // Make Space work like Enter for navigation links
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      if (e.target.tagName === 'A' && nav.contains(e.target)) {
        e.preventDefault();
        e.target.click();
      }
    }
  });

  const placeholders = await fetchPlaceholders();

  const navTools = nav.querySelector('.nav-tools');
  if (navTools) {
    const searchIcon = navTools.querySelector('i');
    if (searchIcon) {
      // Set accessibility attributes early to ensure proper screen reader announcement
      searchIcon.setAttribute('aria-label', 'search');
      searchIcon.setAttribute('role', 'button');
      searchIcon.setAttribute('tabindex', '0');
      // Hide any child elements from screen readers so only aria-label is announced
      Array.from(searchIcon.children).forEach((child) => {
        child.setAttribute('aria-hidden', 'true');
      });

      const searchContainer = createElement('div', { class: 'nav-search-container' });
      const searchForm = createElement('form', { class: 'nav-search-form', action: '/search-results', method: 'GET' });
      const searchInput = createElement('input', {
        type: 'search',
        name: 'q',
        placeholder: placeholders.searchPlaceholder || 'Search runDisney...',
        'aria-label': 'Search',
        class: 'nav-search-input',
      });

      searchForm.append(searchInput);
      searchContainer.append(searchForm);
      nav.prepend(searchContainer);

      const toggleSearch = () => {
        const willOpen = !nav.classList.contains('search-active');

        // If opening search, close nav menu and remove focus trap
        if (willOpen) {
          // Update icon FIRST, before closing nav, to ensure it's visible
          searchIcon.className = 'icon size-s icon__close-reversed';
          searchIcon.setAttribute('aria-label', 'Close search');

          // Close hamburger menu explicitly and remove focus trap
          const navWasOpen = nav.getAttribute('aria-expanded') === 'true' && !isDesktop.matches;
          if (navWasOpen) {
            toggleMenu(nav, navSections, false);
          }
          // Ensure focus trap is removed when search opens
          removeFocusTrap();

          // Set search as active
          nav.classList.add('search-active');
          searchContainer.classList.add('open');
          searchInput.focus();
          const main = document.querySelector('main');
          if (main) {
            main.style.marginTop = '80px';
          }
        } else {
          // Closing search
          nav.classList.remove('search-active');
          searchContainer.classList.remove('open');
          searchInput.value = '';
          searchIcon.className = 'icon size-s icon__search';
          searchIcon.setAttribute('aria-label', 'Search');
          const main = document.querySelector('main');
          if (main) {
            main.style.marginTop = '0px';
          }
        }
      };

      searchIcon.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent any parent handlers from interfering
        toggleSearch();
      });

      // Enable keyboard activation (Enter/Space) for search icon
      searchIcon.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation(); // Prevent any parent handlers from interfering
          // Call toggleSearch directly to ensure it executes
          toggleSearch();
        }
        // When search is active and user presses Tab (not Shift+Tab), move focus to search input
        // Only handle Tab when search is active, otherwise let focus trap handle it
        if (e.key === 'Tab' && !e.shiftKey && nav.classList.contains('search-active')) {
          e.preventDefault();
          e.stopPropagation();
          searchInput.focus();
        }
        // Don't handle Tab when search is not active - let focus trap handle it
      }, false); // Use bubble phase so focus trap (capture phase) runs first

      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          toggleSearch();
          // Move focus back to search icon after closing
          searchIcon.focus();
        }
        // When search is active and user presses Shift+Tab, move focus to close icon
        if (e.key === 'Tab' && e.shiftKey && nav.classList.contains('search-active')) {
          e.preventDefault();
          searchIcon.focus();
        }
      });

      searchForm.addEventListener('submit', (e) => {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
          e.preventDefault();
        }
      });
    }
  }

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
  hideDecorativeIcons('.icon__norgie-opened', '.icon__norgie-closed');
}
