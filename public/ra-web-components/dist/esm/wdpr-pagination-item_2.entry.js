import { r as registerInstance, c as createEvent, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprPaginationItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprClick = createEvent(this, "wdprClick", 7);
    }
    page;
    selected = false;
    disabled = false;
    a11yLabel;
    wdprClick;
    _handleClick = (event) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        if (!this.selected) {
            this.wdprClick.emit();
        }
    };
    render() {
        const baseClasses = "relative inline-flex items-center justify-center rounded-pill border border-solid transition-colors cursor-pointer focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2 disabled:cursor-not-allowed select-none p-0 w-dimension-500 h-dimension-500";
        const labelClasses = "text-component-small font-component-accent leading-component-medium tracking-default whitespace-nowrap";
        const buttonClasses = customTwMerge(baseClasses, "text-text-actionable-alt-default border-stroke-actionable-alt-default bg-surface-default", "hover:text-text-actionable-alt-hover hover:border-stroke-actionable-alt-hover hover:bg-surface-default", "active:text-text-actionable-alt-pressed active:border-stroke-actionable-alt-pressed active:bg-surface-default", "disabled:text-text-actionable-alt-disabled disabled:border-stroke-actionable-alt-disabled disabled:bg-surface-disabled", 
        // Selected State (overrides)
        "data-[selected=true]:bg-surface-actionable-alt-selected data-[selected=true]:text-text-inverse data-[selected=true]:border-transparent", "data-[selected=true]:hover:bg-surface-actionable-alt-hover data-[selected=true]:hover:text-text-inverse", "data-[selected=true]:active:bg-surface-actionable-alt-pressed data-[selected=true]:active:text-text-inverse", "data-[selected=true]:disabled:bg-surface-actionable-alt-disabled data-[selected=true]:disabled:text-text-actionable-inverse-default");
        return (h("button", { key: 'be32e4a1b2c6a75d077a08f13b0772499d15673a', type: "button", class: buttonClasses, onClick: this._handleClick, disabled: this.disabled, "aria-pressed": this.selected ? 'true' : 'false', "data-selected": this.selected ? 'true' : 'false', "aria-label": this.a11yLabel }, h("span", { key: '7e49b8b4eca7a8c0d018e96d44250444b86a5678', class: labelClasses }, this.page)));
    }
};

const WdprPaginationReadonly = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("span", { key: 'df944eac9ff894ae67eb513543e6ab558f4cc01e', class: "w-dimension-500 h-dimension-500 flex items-center justify-center text-color-icon-body" }, h("wdpr-icon-library", { key: 'a5dd8b1ba60c6614780c4c4ab4e5283ef78d067e', icon: "more", size: "xsmall", decorative: true })));
    }
};

export { WdprPaginationItem as wdpr_pagination_item, WdprPaginationReadonly as wdpr_pagination_readonly };
//# sourceMappingURL=wdpr-pagination-item.wdpr-pagination-readonly.entry.js.map

//# sourceMappingURL=wdpr-pagination-item_2.entry.js.map