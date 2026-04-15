/**
 * Focus management utilities for the modal component.
 */
/** CSS selectors for natively focusable elements. */
export const FOCUSABLE_SELECTORS = [
    'a[href]',
    'area[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'iframe',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
].join(',');
/**
 * Gets the deepest active element by traversing through shadow roots.
 */
export function getDeepActiveElement() {
    let active = document.activeElement;
    while (active?.shadowRoot?.activeElement) {
        active = active.shadowRoot.activeElement;
    }
    return active;
}
/**
 * Finds all focusable elements within a container, traversing shadow DOM and slots.
 */
export function findFocusableElements(root) {
    const elements = [];
    const seen = new WeakSet();
    function walk(node) {
        const children = 'children' in node ? Array.from(node.children) : [];
        for (const child of children) {
            const el = child;
            // Add if focusable and visible
            if (el.matches?.(FOCUSABLE_SELECTORS) && _isVisible(el) && !seen.has(el)) {
                seen.add(el);
                elements.push(el);
            }
            // Traverse shadow root
            if (el.shadowRoot) {
                walk(el.shadowRoot);
            }
            // Handle native slots - traverse assigned elements
            if (child.tagName === 'SLOT') {
                for (const assigned of child.assignedElements({ flatten: true })) {
                    const assignedEl = assigned;
                    if (assignedEl.matches?.(FOCUSABLE_SELECTORS) && _isVisible(assignedEl) && !seen.has(assignedEl)) {
                        seen.add(assignedEl);
                        elements.push(assignedEl);
                    }
                    if (assignedEl.shadowRoot) {
                        walk(assignedEl.shadowRoot);
                    }
                    walk(assigned);
                }
            }
            // Continue to children
            walk(child);
        }
    }
    walk(root);
    return elements;
}
/**
 * Checks if an element is visible, traversing across shadow DOM boundaries.
 */
function _isVisible(el) {
    let current = el;
    while (current) {
        if (current.hasAttribute('hidden')) {
            return false;
        }
        try {
            const style = getComputedStyle(current);
            if (style.display === 'none' || style.visibility === 'hidden') {
                return false;
            }
        }
        catch { }
        // Traverse up, crossing shadow DOM boundaries
        if (current.parentElement) {
            current = current.parentElement;
        }
        else {
            const root = current.getRootNode();
            current = root instanceof ShadowRoot ? root.host : null;
        }
    }
    return true;
}
/**
 * Finds an element by selector, searching through shadow DOM.
 */
export function findElementBySelector(root, selector) {
    // Try light DOM first
    const lightEl = root.querySelector(selector);
    if (lightEl)
        return lightEl;
    // Try shadow DOM
    const shadowEl = root.shadowRoot?.querySelector(selector);
    if (shadowEl)
        return shadowEl;
    // Deep search through nested shadow roots
    function deepSearch(el) {
        if (el.shadowRoot) {
            const found = el.shadowRoot.querySelector(selector);
            if (found)
                return found;
            for (const child of Array.from(el.shadowRoot.querySelectorAll('*'))) {
                const result = deepSearch(child);
                if (result)
                    return result;
            }
        }
        return null;
    }
    return deepSearch(root);
}
/**
 * Gets a focusable element from a target (handles shadow DOM hosts).
 */
export function getFocusableTarget(target) {
    if (target.matches(FOCUSABLE_SELECTORS)) {
        return target;
    }
    // Check shadow root for focusable element
    const shadowFocusable = target.shadowRoot?.querySelector(FOCUSABLE_SELECTORS);
    if (shadowFocusable)
        return shadowFocusable;
    // Check children
    const childFocusable = target.querySelector(FOCUSABLE_SELECTORS);
    if (childFocusable)
        return childFocusable;
    // Make target focusable as fallback
    if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
    }
    return target;
}
/**
 * Finds the modal's heading element (h1-h6), prioritizing modal header.
 */
export function findHeadingElement(root) {
    const headingSelector = 'h1, h2, h3, h4, h5, h6';
    // Check wdpr-modal-header first
    const modalHeader = root.querySelector('wdpr-modal-header');
    const headerHeading = modalHeader?.shadowRoot?.querySelector(headingSelector);
    if (headerHeading)
        return headerHeading;
    // Check direct children's shadow roots
    for (const child of Array.from(root.children)) {
        const shadowHeading = child.shadowRoot?.querySelector(headingSelector);
        if (shadowHeading)
            return shadowHeading;
    }
    // Check light DOM
    const lightHeading = root.querySelector(headingSelector);
    if (lightHeading)
        return lightHeading;
    // Deep search as fallback
    for (const el of Array.from(root.querySelectorAll('*'))) {
        const shadowHeading = el.shadowRoot?.querySelector(headingSelector);
        if (shadowHeading)
            return shadowHeading;
    }
    return null;
}
//# sourceMappingURL=focus.utils.js.map
