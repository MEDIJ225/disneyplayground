'use strict';

function isDualComboboxItemElement(el) {
    return el.hasAttribute('data-dual-combobox-item') &&
        typeof el.value === 'string' &&
        'value' in el &&
        'label' in el &&
        'selected' in el &&
        'disabled' in el &&
        'isFocused' in el &&
        'isHidden' in el;
}

exports.isDualComboboxItemElement = isDualComboboxItemElement;
//# sourceMappingURL=wdpr-dual-combobox.model-fwta1-FG.js.map

//# sourceMappingURL=wdpr-dual-combobox.model-fwta1-FG.js.map