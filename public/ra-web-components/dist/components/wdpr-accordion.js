import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { g as generateRandId } from './p-CXZGMLMW.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { F as FOCUSABLE_SELECTORS } from './p-BruAnD1D.js';
import { d as defineCustomElement$3 } from './p-QL-JXwKm.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';
import { b as bundleCjsExports } from './p-CF3xLdU_.js';

const WdprAccordion$1 = /*@__PURE__*/ proxyCustomElement(class WdprAccordion extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.expandedChanged = createEvent(this, "expandedChanged", 7);
    }
    get el() { return this; }
    _internalId;
    iconPosition = 'leading';
    expanded = false;
    header = '';
    subheader = '';
    size = 'xsmall';
    showTopDivider = true;
    showBottomDivider = true;
    accordionId;
    a11yLabel = '';
    expandedChanged;
    componentWillLoad() {
        this._internalId = this.accordionId || `wdpr-accordion-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    /**
     * When the accordion is expanded by user interaction, focus the first focusable element inside the accordion content.
     * Uses a timeout to ensure the content is rendered before trying to focus.
     */
    _focusContentOnExpand = () => {
        if (this.expanded) {
            setTimeout(() => this._focusFirstSlotElement(), 0);
        }
    };
    _handleClickEvent = () => {
        this.expanded = !this.expanded;
        this.expandedChanged.emit({ expanded: this.expanded });
        this._focusContentOnExpand();
    };
    _handleKeyDown = (ev) => {
        if (ev.key === KEYBOARD_KEYS.ENTER || ev.key === KEYBOARD_KEYS.SPACE) {
            ev.preventDefault();
            this.expanded = !this.expanded;
            this.expandedChanged.emit({ expanded: this.expanded });
            this._focusContentOnExpand();
        }
    };
    _focusFirstSlotElement = () => {
        if (this.expanded) {
            const slot = this.el.shadowRoot?.querySelector('slot[name="accordion-content"]');
            if (!slot)
                return;
            const res = slot.assignedElements({ flatten: true })
                .flatMap(el => Array.from(el.querySelectorAll(FOCUSABLE_SELECTORS)))[0];
            res?.focus({ preventScroll: true });
        }
    };
    get _titleClass() {
        const headingClass = `heading-${this.size}`;
        return bundleCjsExports.twMerge(titleBaseClass, this.iconPosition == 'leading' ? 'order-1' : 'order-0', headingClass);
    }
    ;
    get _subheaderClass() {
        let bodySize;
        if (this.size === 'xxsmall' || this.size === 'xsmall') {
            bodySize = 'small';
        }
        else if (this.size === 'small' || this.size === 'medium') {
            bodySize = 'medium';
        }
        else {
            bodySize = 'large';
        }
        return bundleCjsExports.twMerge('text-text-body', this.iconPosition == 'leading' ? 'order-1' : 'order-0', `body-${bodySize}`);
    }
    ;
    get _iconSize() {
        if (this.size === 'xxsmall' || this.size === 'xsmall' || this.size === 'small') {
            return 'small';
        }
        else if (this.size === 'medium') {
            return 'medium';
        }
        else {
            return 'large';
        }
    }
    ;
    get _accordionHeaderClass() {
        return bundleCjsExports.twMerge('flex items-center gap-100 flex-1', this.iconPosition == 'leading' ? 'order-1' : 'order-0');
    }
    get _accordionContentClass() {
        return this.showBottomDivider ? 'pb-200' : '';
    }
    render() {
        const iconName = this.expanded ? 'expand-show-less' : 'expand-show-more';
        return (h(Host, { key: '3b68484112d84b5a92de8e35507d5f7aa2fa45ff' }, this.showTopDivider && h("wdpr-divider", { key: '6458672d899d011d588a6f79b3086bd7692d9acf' }), h("section", { key: '3cf43fa5f0e9cc0c7fb6bb9cba43055317b6afae', class: baseClass }, h("div", { key: '8e32b91c4780848aa55662223faf38b213351c40', class: toggleClass, role: "button", "aria-controls": this._internalId, "aria-expanded": this.expanded ? 'true' : 'false', "aria-label": this.a11yLabel || undefined, onClick: this._handleClickEvent, onKeyDown: this._handleKeyDown, tabIndex: 0 }, h("div", { key: '8d67a663ceb7806445214e5b058bc750ca2c8727', class: this._accordionHeaderClass }, h("slot", { key: '38b12797268918fb24d96c9af83cd81e35a43ccf', name: "icon" }), h("div", { key: '972d2484c5e828da4565548989b5651f4ec3d7f1' }, h("div", { key: '374adfeda9fe2fc7cb1ef5c5a967e8cfa179557e', class: this._titleClass, role: "heading", "aria-level": "3" }, this.header), this.subheader && (h("div", { key: 'c2465c4c69fa7fd597cd024fbdd6b0b67373d4fa', class: this._subheaderClass }, this.subheader)))), h("span", { key: '4425a0d683e282531fb11276c394f851597267a6', class: `${iconWrapperClass} ${this.iconPosition === 'leading' ? 'order-0' : 'order-1'}`, "aria-hidden": "true" }, h("wdpr-icon-library", { key: 'de277f8dabdacbe0e11e9b7cc66e333d87f1197d', icon: iconName, size: this._iconSize, decorative: true })))), this.expanded && (h("div", { key: '9c03afc11b6cac0d176d51c371f2a3b386d9fee6', class: this._accordionContentClass, id: this._internalId }, h("slot", { key: '310544c15b9401edb3ab7f6c4874a541c7b7242e', name: "accordion-content" }))), this.showBottomDivider && h("wdpr-divider", { key: 'c8f988a628e695413a97160920b4cec659ed3f64' })));
    }
}, [257, "wdpr-accordion", {
        "iconPosition": [1, "icon-position"],
        "expanded": [1540],
        "header": [1],
        "subheader": [1],
        "size": [1],
        "showTopDivider": [4, "show-top-divider"],
        "showBottomDivider": [4, "show-bottom-divider"],
        "accordionId": [1, "accordion-id"],
        "a11yLabel": [1, "a11y-label"],
        "_internalId": [32]
    }, [[0, "keydown", "handleKeyDown"]]]);
const baseClass = 'flex py-200';
const toggleClass = `
flex items-center cursor-pointer gap-200 py-050 w-full focus-visible:outline-solid
focus-visible:outline-037 focus-visible:outline-offset-2 focus-visible:outline-stroke-actionable-focused
focus-visible:rounded-050
`;
const iconWrapperClass = `
text-text-actionable-alt-default transition-colors
hover:text-text-actionable-alt-hover active:text-text-actionable-alt-pressed
`;
const titleBaseClass = 'label-container flex-1 text-text-heading';
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-accordion", "wdpr-divider", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-accordion":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprAccordion$1);
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprAccordion = WdprAccordion$1;
const defineCustomElement = defineCustomElement$1;

export { WdprAccordion, defineCustomElement };
//# sourceMappingURL=wdpr-accordion.js.map

//# sourceMappingURL=wdpr-accordion.js.map