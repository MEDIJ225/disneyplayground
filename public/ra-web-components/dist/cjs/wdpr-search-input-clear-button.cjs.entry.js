'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprSearchInputClearButton = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    /**
     * Disables the button, preventing user interaction.
     */
    disabled = false;
    /**
     * Accessibility label for the clear button.
     */
    a11yLabel = 'Clear search';
    render() {
        return (index.h("button", { key: '2fe5d784a255f024ae125e7e36395bc6f36915e9', type: "button", class: buttonClasses, disabled: this.disabled, "aria-label": this.a11yLabel }, index.h("wdpr-icon-library", { key: 'faf6d9535fef7aeed42e4631a42b7eabf96d9d93', icon: "close", size: "small", decorative: true })));
    }
};
const buttonClasses = `
  flex items-center justify-center cursor-pointer rounded-pill
  min-w-dimension-300 min-h-dimension-300
  bg-surface-transparent transition-colors
  focus-visible:outline-solid focus-visible:outline-offset-[-2px] focus-visible:outline-037
  focus-visible:outline-stroke-actionable-focused
  text-icon-search-default
  hover:text-icon-search-hover
  active:text-icon-search-pressed
  disabled:text-icon-search-disabled disabled:cursor-not-allowed
`;

exports.wdpr_search_input_clear_button = WdprSearchInputClearButton;
//# sourceMappingURL=wdpr-search-input-clear-button.entry.cjs.js.map

//# sourceMappingURL=wdpr-search-input-clear-button.cjs.entry.js.map