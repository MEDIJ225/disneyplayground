export function isComboboxItemElement(el) {
    return el.hasAttribute('data-combobox-item') &&
        typeof el.value === 'string' &&
        'value' in el &&
        'label' in el &&
        'mode' in el &&
        'selected' in el &&
        'disabled' in el &&
        'isFocused' in el &&
        'isHidden' in el;
}
//# sourceMappingURL=wdpr-combobox.model.js.map
