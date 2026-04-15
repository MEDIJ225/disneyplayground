import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';

const WdprPaginationItem = /*@__PURE__*/ proxyCustomElement(class WdprPaginationItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
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
}, [257, "wdpr-pagination-item", {
        "page": [8],
        "selected": [4],
        "disabled": [4],
        "a11yLabel": [1, "a11y-label"]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-pagination-item"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-pagination-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprPaginationItem);
            }
            break;
    } });
}

export { WdprPaginationItem as W, defineCustomElement as d };
//# sourceMappingURL=p-MW8he_pX.js.map

//# sourceMappingURL=p-MW8he_pX.js.map