/**
 * Finds the next enabled index in the items array, given a start index and direction ('up' or 'down').
 * Returns the original index if all items are disabled.
 */
export function findNextEnabledIndex(items, start, direction) {
    if (!items.length)
        return start;
    if (items.every(item => item.disabled))
        return -1;
    const increment = direction === 'down' ? 1 : -1;
    let idx = start;
    let attempts = 0;
    // This block finds the next enabled item in the desired direction,
    // wrapping around the array if necessary, and stops if all items are disabled.
    do {
        idx = (idx + increment + items.length) % items.length;
        attempts++;
    } while (items[idx].disabled && attempts < items.length);
    return items[idx].disabled ? -1 : idx;
}
/**
 * Determines the initial index to focus within a dropdown list based on the current selection and navigation direction.
 *
 * - If there is a selected and enabled item, its index is returned.
 * - If navigating 'down', returns the index of the first enabled item, or 0 if none are enabled.
 * - If navigating 'up', returns the index of the last enabled item by searching backwards.
 */
export function getInitialFocusIndex(items, direction) {
    // If there is a selected and enabled item, its index is returned.
    const selectedIndex = items.findIndex(item => item.selected && !item.disabled);
    if (selectedIndex !== -1) {
        return selectedIndex;
    }
    // If navigating 'down', returns the index of the first enabled item, or -1 if none are enabled.
    if (direction === 'down') {
        const firstEnabled = items.findIndex(item => !item.disabled);
        return firstEnabled !== -1 ? firstEnabled : -1;
    }
    // If navigating 'up', returns the index of the last enabled item by searching backwards.
    for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i].disabled)
            return i;
    }
    return -1;
}
//# sourceMappingURL=wdpr-dropdown.utils.js.map
