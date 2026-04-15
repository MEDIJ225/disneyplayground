/**
 * Focus management utilities for the modal component.
 */
/** CSS selectors for natively focusable elements. */
export declare const FOCUSABLE_SELECTORS: string;
/**
 * Gets the deepest active element by traversing through shadow roots.
 */
export declare function getDeepActiveElement(): HTMLElement | null;
/**
 * Finds all focusable elements within a container, traversing shadow DOM and slots.
 */
export declare function findFocusableElements(root: Element | ShadowRoot): HTMLElement[];
/**
 * Finds an element by selector, searching through shadow DOM.
 */
export declare function findElementBySelector(root: HTMLElement, selector: string): HTMLElement | null;
/**
 * Gets a focusable element from a target (handles shadow DOM hosts).
 */
export declare function getFocusableTarget(target: HTMLElement): HTMLElement;
/**
 * Finds the modal's heading element (h1-h6), prioritizing modal header.
 */
export declare function findHeadingElement(root: HTMLElement): HTMLElement | null;
