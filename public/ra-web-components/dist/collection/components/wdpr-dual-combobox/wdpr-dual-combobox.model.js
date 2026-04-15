export function isDualComboboxItemElement(el) {
    return el.hasAttribute('data-dual-combobox-item') &&
        typeof el.value === 'string' &&
        'value' in el &&
        'label' in el &&
        'selected' in el &&
        'disabled' in el &&
        'isFocused' in el &&
        'isHidden' in el;
}
//# sourceMappingURL=wdpr-dual-combobox.model.js.map
