export function findNextEnabledIndex(items, start, direction) {
    if (!items.length)
        return start;
    if (items.every(item => item.disabled || item.isHidden))
        return -1;
    const increment = direction === 'down' ? 1 : -1;
    let idx = start;
    let attempts = 0;
    do {
        idx = (idx + increment + items.length) % items.length;
        attempts++;
    } while ((items[idx].disabled || items[idx].isHidden) && attempts < items.length);
    return items[idx].disabled || items[idx].isHidden ? -1 : idx;
}
export function getInitialFocusIndex(items, direction) {
    const selectedIndex = items.findIndex(item => item.selected && !item.disabled && !item.isHidden);
    if (selectedIndex !== -1)
        return selectedIndex;
    if (direction === 'down') {
        const firstEnabled = items.findIndex(item => !item.disabled && !item.isHidden);
        return firstEnabled !== -1 ? firstEnabled : -1;
    }
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
    const combined = `${item.callingCode} ${item.label}`.toLowerCase();
    return combined.includes(lowerFilter) || item.label.toLowerCase().includes(lowerFilter) || item.callingCode.toLowerCase().includes(lowerFilter);
}
//# sourceMappingURL=wdpr-country-code.utils.js.map
