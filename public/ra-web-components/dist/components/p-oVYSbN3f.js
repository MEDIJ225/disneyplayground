import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprFabTrigger = /*@__PURE__*/ proxyCustomElement(class WdprFabTrigger extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprToggle = createEvent(this, "wdprToggle", 7);
    }
    get el() { return this; }
    open = false;
    size = 'large';
    label = 'Menu';
    icon = '';
    disabled = false;
    closeA11yLabel = 'Close menu';
    /**
     * Emitted when the FAB trigger is toggled
     */
    wdprToggle;
    _handleToggle = () => {
        if (this.disabled)
            return;
        this.wdprToggle.emit();
    };
    get _iconSize() {
        return iconSizeMap[this.size];
    }
    get _closedButtonClass() {
        return `${closedBaseClasses} ${closedSizeClasses[this.size]}`;
    }
    get _iconButtonClass() {
        return `${iconButtonBaseClasses} ${iconButtonSizeClasses[this.size]}`;
    }
    render() {
        if (!this.open) {
            return (h("button", { type: "button", class: this._closedButtonClass, onClick: this._handleToggle, disabled: this.disabled, "aria-haspopup": "true", "aria-expanded": "false", "aria-disabled": this.disabled ? 'true' : undefined }, this.icon && (h("span", { class: "flex items-center", "aria-hidden": "true" }, h("wdpr-icon-library", { icon: this.icon, size: this._iconSize, decorative: true }))), this.label));
        }
        return (h("button", { type: "button", class: this._iconButtonClass, onClick: this._handleToggle, disabled: this.disabled, "aria-label": this.closeA11yLabel, "aria-expanded": "true", "aria-disabled": this.disabled ? 'true' : undefined }, h("wdpr-icon-library", { icon: "close-reversed", size: this._iconSize, decorative: true })));
    }
}, [257, "wdpr-fab-trigger", {
        "open": [4],
        "size": [1],
        "label": [1],
        "icon": [1],
        "disabled": [4],
        "closeA11yLabel": [1, "close-a11y-label"]
    }]);
// FAB button (closed state) - base classes
const closedBaseClasses = `inline-flex items-center justify-center gap-2 rounded-pill
  component-medium whitespace-nowrap
  bg-surface-actionable-default text-text-inverse
  hover:bg-surface-actionable-hover active:bg-surface-actionable-focus
  elevation-xsmall-soft cursor-pointer
  focus:outline-none focus-visible:outline-solid focus-visible:outline-offset-2
  focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused
  disabled:bg-surface-actionable-disabled-alt disabled:text-text-actionable-disabled
  disabled:cursor-not-allowed disabled:elevation-none`;
// FAB button size classes
const closedSizeClasses = {
    medium: 'px-4 py-2 h-10',
    large: 'px-6 py-4 h-14',
};
// Icon button (open state) - base classes
const iconButtonBaseClasses = `relative inline-flex items-center justify-center rounded-pill
  bg-surface-default text-text-actionable-alt-default
  hover:bg-surface-actionable-alt-hover hover:text-text-inverse
  active:bg-surface-actionable-alt-pressed active:text-text-inverse
  elevation-xsmall-soft cursor-pointer
  focus:outline-none focus-visible:outline-solid focus-visible:outline-offset-2
  focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused
  disabled:bg-surface-disabled disabled:text-icon-disabled
  disabled:cursor-not-allowed disabled:elevation-none`;
// Icon button size classes
const iconButtonSizeClasses = {
    medium: 'w-10 h-10',
    large: 'w-14 h-14',
};
// Icon size mapping
const iconSizeMap = {
    medium: 'small',
    large: 'medium',
};
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-fab-trigger", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-fab-trigger":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprFabTrigger);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprFabTrigger as W, defineCustomElement as d };
//# sourceMappingURL=p-oVYSbN3f.js.map

//# sourceMappingURL=p-oVYSbN3f.js.map