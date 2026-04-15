import { DualComboboxItemElement, DualComboboxNavigationDirection } from "./wdpr-dual-combobox.model";
/**
 * Finds the next enabled and visible index in the items array, given a start index and direction ('up' or 'down').
 * Returns -1 if all items are disabled or hidden.
 */
export declare function findNextEnabledIndex(items: DualComboboxItemElement[], start: number, direction: DualComboboxNavigationDirection): number;
/**
 * Determines the initial index to focus within a dropdown list based on the current selection and navigation direction.
 *
 * - If there is a selected, enabled, and visible item, its index is returned.
 * - If navigating 'down', returns the index of the first enabled and visible item, or -1 if none are enabled or visible.
 * - If navigating 'up', returns the index of the last enabled and visible item by searching backwards.
 */
export declare function getInitialFocusIndex(items: DualComboboxItemElement[], direction: DualComboboxNavigationDirection): number;
export declare function itemMatchesFilter(item: DualComboboxItemElement, filterText: string): boolean;
export declare function splitLabel(label: string): [string, string];
