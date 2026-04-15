'use strict';

var utils = require('./utils-CARbI7sq.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');

const cardFocusClasses = 'focus:outline focus-visible:outline-solid focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused focus-visible:outline-offset-4';
const getCardStateClasses = (selected, isMouseDown) => {
    const cardHoverClasses = !isMouseDown ? 'hover:border-stroke-neutral-light' : '';
    const cardSelectedClasses = selected && !isMouseDown ? 'border-stroke-actionable-alt-pressed' : 'border-transparent';
    const cardActiveClasses = isMouseDown ? 'active:border-stroke-neutral-medium' : '';
    return utils.customTwMerge(cardHoverClasses, cardActiveClasses, cardFocusClasses, cardSelectedClasses);
};
// List of interactive element tag names that should handle their own events
const INTERACTIVE_ELEMENT_TAGS = [
    'WDPR-BUTTON',
    'WDPR-FAVORITES-BUTTON',
    'WDPR-CARD-LINK',
    'WDPR-ICON-BUTTON',
    'A',
    'BUTTON',
    'INPUT',
    'WDPR-CHECKBOX',
    'WDPR-RADIO-BUTTON',
    'SELECT',
    'TEXTAREA'
];
/**
 * Checks if an element is an interactive element that should handle its own events
 */
const isInteractiveElement = (el) => {
    if (!el)
        return false;
    const tagName = el.tagName?.toUpperCase();
    return INTERACTIVE_ELEMENT_TAGS.includes(tagName);
};
/**
 * Checks if an interactive element exists in the composed path before the card element
 * Returns the interactive element if found, null otherwise
 */
const findInteractiveElementInPath = (path, cardElement) => {
    for (const el of path) {
        if (el === cardElement)
            break;
        if (isInteractiveElement(el)) {
            return el;
        }
    }
    return null;
};
/**
 * Traverses through shadow DOM to find an interactive element from the active element
 * Returns the interactive element if found, null otherwise
 */
const findInteractiveActiveElement = (cardElement) => {
    let activeEl = document.activeElement;
    while (activeEl && activeEl !== cardElement && activeEl !== document.body) {
        if (isInteractiveElement(activeEl)) {
            return activeEl;
        }
        const root = activeEl.getRootNode();
        if (root instanceof ShadowRoot) {
            activeEl = root.host;
        }
        else {
            activeEl = activeEl.parentElement;
        }
    }
    return null;
};
/**
 * Handles keyboard events for card selection
 * Returns true if the event was handled by an interactive child element, false otherwise
 */
const handleCardKeyDown = (e, cardElement, disabled, onSelection) => {
    if (disabled)
        return;
    const isSpaceKey = e.key === keycodes_model.KEYBOARD_KEYS.SPACE;
    const isEnterKey = e.key === keycodes_model.KEYBOARD_KEYS.ENTER;
    if (isSpaceKey || isEnterKey) {
        const path = e.composedPath();
        const interactiveInPath = findInteractiveElementInPath(path, cardElement);
        if (interactiveInPath) {
            if (isEnterKey && typeof interactiveInPath.click === 'function') {
                interactiveInPath.click();
                e.preventDefault();
            }
            return;
        }
        const interactiveActive = findInteractiveActiveElement(cardElement);
        if (interactiveActive) {
            if (isEnterKey && typeof interactiveActive.click === 'function') {
                interactiveActive.click();
                e.preventDefault();
            }
            return;
        }
        onSelection();
        e.stopPropagation();
        e.preventDefault();
    }
};
/**
 * Handles click events for card selection
 * Returns true if the click was on an interactive element, false otherwise
 */
const handleCardClick = (e, disabled, onSelection) => {
    if (disabled)
        return;
    const path = e.composedPath();
    for (const el of path) {
        if (el.tagName && INTERACTIVE_ELEMENT_TAGS.includes(el.tagName.toUpperCase())) {
            return;
        }
    }
    onSelection();
};

exports.cardFocusClasses = cardFocusClasses;
exports.getCardStateClasses = getCardStateClasses;
exports.handleCardClick = handleCardClick;
exports.handleCardKeyDown = handleCardKeyDown;
//# sourceMappingURL=card.util-CQbi4RZB.js.map

//# sourceMappingURL=card.util-CQbi4RZB.js.map