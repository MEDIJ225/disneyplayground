/**
 * Finds the next enabled and visible index in the items array, given a start index and direction ('up' or 'down').
 * Returns -1 if all items are disabled or hidden.
 */
export function findNextEnabledIndex(items, start, direction) {
    if (!items.length)
        return start;
    if (items.every(item => item.disabled || item.isHidden))
        return -1;
    const increment = direction === 'down' ? 1 : -1;
    let idx = start;
    let attempts = 0;
    // This block finds the next enabled and visible item in the desired direction,
    // wrapping around the array if necessary, and stops if all items are disabled or hidden.
    do {
        idx = (idx + increment + items.length) % items.length;
        attempts++;
    } while ((items[idx].disabled || items[idx].isHidden) && attempts < items.length);
    return items[idx].disabled || items[idx].isHidden ? -1 : idx;
}
/**
 * Determines the initial index to focus within a dropdown list based on the current selection and navigation direction.
 *
 * - If there is a selected, enabled, and visible item, its index is returned.
 * - If navigating 'down', returns the index of the first enabled and visible item, or -1 if none are enabled or visible.
 * - If navigating 'up', returns the index of the last enabled and visible item by searching backwards.
 */
export function getInitialFocusIndex(items, direction) {
    // If there is a selected, enabled, and visible item, its index is returned.
    const selectedIndex = items.findIndex(item => item.selected && !item.disabled && !item.isHidden);
    if (selectedIndex !== -1) {
        return selectedIndex;
    }
    // If navigating 'down', returns the index of the first enabled and visible item, or -1 if none are enabled or visible.
    if (direction === 'down') {
        const firstEnabled = items.findIndex(item => !item.disabled && !item.isHidden);
        return firstEnabled !== -1 ? firstEnabled : -1;
    }
    // If navigating 'up', returns the index of the last enabled and visible item by searching backwards.
    for (let i = items.length - 1; i >= 0; i--) {
        if (!items[i].disabled && !items[i].isHidden)
            return i;
    }
    return -1;
}
export function itemMatchesFilter(item, filterText) {
    if (!filterText)
        return true;
    const lowerFilter = filterText.toLowerCase();
    const labelMatches = item.label.toLowerCase().includes(lowerFilter);
    const descriptionMatches = item.description ?
        item.description.toLowerCase().includes(lowerFilter) : false;
    return labelMatches || descriptionMatches;
}
export function splitLabel(label) {
    const [leading = '', trailing = ''] = label.split(' ');
    return [leading, trailing];
}
//# sourceMappingURL=wdpr-dual-combobox.utils.js.map
