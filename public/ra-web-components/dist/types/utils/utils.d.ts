export declare function format(first?: string, middle?: string, last?: string): string;
export declare const forwardCommonHostAttributes: (el: HTMLElement) => {
    [key: string]: string;
};
export declare function forwardHostAttributes(el: HTMLElement, ignore?: string[]): {
    [key: string]: string;
};
export { twMerge } from 'tailwind-merge';
/**
 * Creates a native Event or CustomEvent depending on whether `detail` is provided.
 * Works in browsers and Jest/JSDOM (falls back to `document.createEvent`).
 */
export declare function createEvent<T = unknown>(type: string, options?: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail?: T;
}): T extends undefined ? Event : CustomEvent<T>;
export declare const customTwMerge: (...classLists: import("tailwind-merge").ClassNameValue[]) => string;
/**
 * Generate a random ID for a11y.
 * @return {String}
 */
export declare const generateRandId: () => string;
/**
 * Propagate a property (and optional attribute fallback) to all assigned elements of a slot.
 *
 * @param slot        The slot element to inspect
 * @param propName    The property name to set (e.g. "disabled", "readonly")
 * @param value       The value to assign
 * @param attrName    Optional: attribute name to mirror as a fallback (defaults to propName)
 */
export declare function propagateToSlot(slot: HTMLSlotElement | null, propName: string, value: string | number | boolean | null | undefined, tagName?: string, attrName?: string): void;
/**
 * Finds the assigned elements of a specific tag name in a named slot.
 *
 * @param slot The slot element to inspect.
 * @param tagName The tag name to find (case-insensitive).
 * @returns The found elements or an empty array.
 */
export declare function findAssignedElementsByTag<T extends Element = Element>(slot: HTMLSlotElement | null, tagName: string): T[];
export declare const stopAnd: (cb: () => void) => (ev: Event) => void;
