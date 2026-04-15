import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';

const WdprNavSectionHeader$1 = /*@__PURE__*/ proxyCustomElement(class WdprNavSectionHeader extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    /**
     * The visual style used for section headings.
     */
    variant = 'quiet';
    /**
     * Optional fallback label when no slotted content is provided.
     */
    label = '';
    get _containerClass() {
        const quietClass = 'text-text-body font-weight-body-default leading-body-medium tracking-default';
        const loudClass = 'text-text-heading font-[var(--font-weight-heading-alt)] leading-heading-medium text-[20px] tracking--05';
        return customTwMerge('px-075 py-100', this.variant === 'loud' ? loudClass : quietClass);
    }
    render() {
        return (h("div", { key: 'cfc77dee9d1edf8f62239aa771c246983639898f', class: this._containerClass }, h("slot", { key: 'a3ff3746c1b26f7d8014ba90f809c1fdea4929f3' }, this.label)));
    }
}, [257, "wdpr-nav-section-header", {
        "variant": [513],
        "label": [1]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-nav-section-header"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-nav-section-header":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprNavSectionHeader$1);
            }
            break;
    } });
}

const WdprNavSectionHeader = WdprNavSectionHeader$1;
const defineCustomElement = defineCustomElement$1;

export { WdprNavSectionHeader, defineCustomElement };
//# sourceMappingURL=wdpr-nav-section-header.js.map

//# sourceMappingURL=wdpr-nav-section-header.js.map