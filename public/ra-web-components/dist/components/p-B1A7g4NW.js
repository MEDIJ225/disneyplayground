import { p as proxyCustomElement, H, c as createEvent, h, d as Host } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprSegment = /*@__PURE__*/ proxyCustomElement(class WdprSegment extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.segmentClick = createEvent(this, "segmentClick", 7);
    }
    get el() { return this; }
    /**
     * The label text for the segment
     */
    label;
    /**
     * Icon name to display (when variant is icon-label)
     */
    iconName;
    /**
     * Whether this segment is currently selected
     */
    selected = false;
    /**
     * Whether the segment is disabled
     */
    disabled = false;
    /**
     * Variant of the segment
     */
    variant = 'label-only';
    /**
     * Value associated with this segment
     */
    value;
    /**
     * Index of this segment in the group
     */
    index = 0;
    /**
     * Name for the radio group (all segments in same group share this)
     */
    name;
    /**
     * Unique ID for this segment
     */
    segmentId;
    /**
     * Event emitted when segment is clicked
     */
    segmentClick;
    /**
     * Focus the segment programmatically
     */
    async setFocus() {
        const button = this.el.shadowRoot?.querySelector('button');
        button?.focus();
    }
    _handleClick = () => {
        if (!this.disabled) {
            this.segmentClick.emit({
                value: this.value || this.label,
                index: this.index,
            });
        }
    };
    _getSegmentClasses() {
        const baseClasses = `
      relative flex items-center justify-center rounded-pill gap-050
      min-w-0 w-full h-[34px] py-125 px-200
      bg-surface-actionable-alt-default-alt text-text-actionable-alt-default
      transition-colors duration-200 ease-in-out
      cursor-pointer select-none
      focus:outline-none focus-visible:outline-focus
      focus-visible:outline-stroke-actionable-alt-selected
      focus-visible:outline-solid focus-visible:outline-offset-[2px]
      focus-visible:rounded-pill
      hover:text-text-actionable-alt-hover
      active:text-text-actionable-alt-pressed
      disabled:cursor-not-allowed disabled:pointer-events-none disabled:text-text-actionable-alt-disabled
    `;
        const variantClasses = this.variant === 'icon-label'
            ? 'flex-col h-[50px] py-100 px-200'
            : 'flex-row';
        const stateClasses = this.selected
            ? `bg-surface-actionable-alt-pressed text-text-actionable-inverse-default
      hover:bg-surface-actionable-alt-hover hover:text-text-actionable-inverse-default
      active:bg-surface-actionable-alt-selected active:text-text-actionable-inverse-default
      disabled:bg-surface-actionable-alt-disabled disabled:text-text-actionable-inverse-default z-10`
            : '';
        return customTwMerge(baseClasses, variantClasses, stateClasses);
    }
    _getLabelClasses() {
        return customTwMerge('text-label-small font-label-default leading-label-small tracking-default text-inherit truncate');
    }
    render() {
        const uniqueId = this.segmentId || `segment-${this.index}`;
        return (h(Host, { key: 'efc908e7b478e185598b97449a4d1aecf0cae242', style: { minWidth: '0' } }, h("button", { key: 'febbd9b615c6b18e531c613ddcd2ffd9a57bb0ff', type: "button", id: uniqueId, class: this._getSegmentClasses(), onClick: this._handleClick, disabled: this.disabled, tabIndex: this.selected ? 0 : -1, role: "radio", "aria-checked": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this.label }, this.variant === 'icon-label' && this.iconName && (h("wdpr-icon-library", { key: 'c8d63933f6e1de0be98ac41daee0ae0fec82a068', icon: this.iconName, size: "small", decorative: true })), h("span", { key: 'f4a782f46e9750bd73b9392a22a306ef798cacef', class: this._getLabelClasses() }, this.label))));
    }
}, [257, "wdpr-segment", {
        "label": [1],
        "iconName": [1, "icon-name"],
        "selected": [516],
        "disabled": [4],
        "variant": [1],
        "value": [1],
        "index": [2],
        "name": [1],
        "segmentId": [1, "segment-id"],
        "setFocus": [64]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-segment", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-segment":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprSegment);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprSegment as W, defineCustomElement as d };
//# sourceMappingURL=p-B1A7g4NW.js.map

//# sourceMappingURL=p-B1A7g4NW.js.map