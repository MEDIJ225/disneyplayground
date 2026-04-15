import { DropdownItemElement, DropdownNavigationDirection } from "./wdpr-dropdown.model";
/**
 * Finds the next enabled index in the items array, given a start index and direction ('up' or 'down').
 * Returns the original index if all items are disabled.
 */
export declare function findNextEnabledIndex(items: DropdownItemElement[], start: number, direction: DropdownNavigationDirection): number;
/**
 * Determines the initial index to focus within a dropdown list based on the current selection and navigation direction.
 *
 * - If there is a selected and enabled item, its index is returned.
 * - If navigating 'down', returns the index of the first enabled item, or 0 if none are enabled.
 * - If navigating 'up', returns the index of the last enabled item by searching backwards.
 */
export declare function getInitialFocusIndex(items: DropdownItemElement[], direction: DropdownNavigationDirection): number;
