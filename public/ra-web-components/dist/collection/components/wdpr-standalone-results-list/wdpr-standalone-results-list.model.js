export function isStandaloneResultsListItemElement(el) {
    return el.hasAttribute('data-standalone-results-list-item') && typeof el.value === 'string' && 'selected' in el && 'mode' in el && 'disabled' in el;
}
//# sourceMappingURL=wdpr-standalone-results-list.model.js.map
