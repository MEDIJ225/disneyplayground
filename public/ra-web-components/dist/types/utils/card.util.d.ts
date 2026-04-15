export declare const cardFocusClasses = "focus:outline focus-visible:outline-solid focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused focus-visible:outline-offset-4";
export declare const getCardStateClasses: (selected: boolean, isMouseDown: boolean) => string;
export declare const INTERACTIVE_ELEMENT_TAGS: string[];
/**
 * Checks if an element is an interactive element that should handle its own events
 */
export declare const isInteractiveElement: (el: HTMLElement | null) => boolean;
/**
 * Checks if an interactive element exists in the composed path before the card element
 * Returns the interactive element if found, null otherwise
 */
export declare const findInteractiveElementInPath: (path: HTMLElement[], cardElement: HTMLElement) => HTMLElement | null;
/**
 * Traverses through shadow DOM to find an interactive element from the active element
 * Returns the interactive element if found, null otherwise
 */
export declare const findInteractiveActiveElement: (cardElement: HTMLElement) => HTMLElement | null;
/**
 * Handles keyboard events for card selection
 * Returns true if the event was handled by an interactive child element, false otherwise
 */
export declare const handleCardKeyDown: (e: KeyboardEvent, cardElement: HTMLElement, disabled: boolean, onSelection: () => void) => void;
/**
 * Handles click events for card selection
 * Returns true if the click was on an interactive element, false otherwise
 */
export declare const handleCardClick: (e: MouseEvent, disabled: boolean, onSelection: () => void) => void;
