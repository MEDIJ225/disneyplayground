export function isDropdownItemElement(el) {
    return el.hasAttribute('data-dropdown-item') &&
        typeof el.value === 'string' &&
        'value' in el &&
        'label' in el &&
        'selected' in el &&
        'disabled' in el &&
        'mode' in el &&
        'isFocused' in el;
}
//# sourceMappingURL=wdpr-dropdown.model.js.map
