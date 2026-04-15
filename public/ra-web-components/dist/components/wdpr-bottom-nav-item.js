import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { K as KEYBOARD_KEYS } from './p-CgKa3i1r.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$6 } from './p-B0ImOrmz.js';
import { d as defineCustomElement$5 } from './p-CTYL3_rK.js';
import { d as defineCustomElement$4 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$3 } from './p-BOubPl_u.js';
import { d as defineCustomElement$2 } from './p-BeIHu0tu.js';

const getLabelClass = (colorClass, customLabelClass) => {
    return customTwMerge(labelBaseClass, colorClass, customLabelClass);
};
const getColorClass = (disabled) => {
    const baseClass = 'text-text-actionable-alt-default cursor-pointer group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    return disabled ? disabledClass : baseClass;
};
const labelBaseClass = 'label-container font-[var(--font-weight-component-alt)] leading-component-medium-alt text-component-large tracking-default px-075 pt-025';
const containerBaseClass = `
  flex items-center rounded-075 h-full group
  border-transparent border-012 border-solid
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[3px]
  focus-visible:outline-025
`;

const WdprBottomNavItem$1 = /*@__PURE__*/ proxyCustomElement(class WdprBottomNavItem extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.itemSelected = createEvent(this, "itemSelected", 7);
    }
    get el() { return this; }
    label;
    mediaType = 'icon';
    mediaSize = 'medium';
    iconName;
    iconBackground = 'none';
    iconVariant = 'secondary';
    customLabelClass = '';
    imageUrl;
    disabled = false;
    selected = false;
    itemSelected;
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ENTER || ev.key == KEYBOARD_KEYS.SPACE) {
            ev.preventDefault();
            this._itemClick();
        }
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _labelClass() {
        return getLabelClass(this._colorClass, this.customLabelClass);
    }
    get _colorClass() {
        return getColorClass(this.disabled);
    }
    _itemClick() {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.itemSelected.emit(this.selected);
    }
    render() {
        return (h("div", { key: 'b341baf490414d6f7926c79b424d68423c73ed3f', class: containerBaseClass, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-pressed": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, onClick: this._itemClick.bind(this) }, this.mediaType == 'avatar' && this.imageUrl && (h("span", { key: 'da604ca68e95ca825320a9615f9f4b3064ed7d23', class: "w-400 h-400 mr-025" }, h("wdpr-avatar", { key: '6cc7b1883097d2f08d2516bd1bd6b74eead34350', imageSrc: this.imageUrl, size: this.mediaSize, isInteractive: false }))), this.mediaType == 'icon' && this.iconBackground === 'none' && (h("span", { key: '92a5fabfa8822d9114fe7d32932dd7d335439e69', class: this._colorClass + ' p-075' }, h("wdpr-icon-library", { key: '6da24deb49619f575a066ff490e742e8c451b6a1', size: this.mediaSize, icon: this.iconName, decorative: true }))), this.mediaType == 'icon' && this.iconBackground !== 'none' && (h("wdpr-icon", { key: 'befa65f74d588afb5323b11954521d6bd589a2fb', size: this.mediaSize, icon: this.iconName, customClass: this._colorClass, decorative: true, background: this.iconBackground, variant: this.iconVariant })), h("span", { key: 'ce320e8b0083d0155464b3466f744d3b73df86a4', class: this._labelClass }, this.label)));
    }
}, [257, "wdpr-bottom-nav-item", {
        "label": [1],
        "mediaType": [1, "media-type"],
        "mediaSize": [1, "media-size"],
        "iconName": [1, "icon-name"],
        "iconBackground": [1, "icon-background"],
        "iconVariant": [1, "icon-variant"],
        "customLabelClass": [1, "custom-label-class"],
        "imageUrl": [1, "image-url"],
        "disabled": [516],
        "selected": [516]
    }, [[0, "keydown", "handleKeyDown"]]]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-bottom-nav-item", "wdpr-avatar", "wdpr-icon", "wdpr-icon-library", "wdpr-notification-indicator", "wdpr-surface-style"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-bottom-nav-item":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprBottomNavItem$1);
            }
            break;
        case "wdpr-avatar":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-surface-style":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprBottomNavItem = WdprBottomNavItem$1;
const defineCustomElement = defineCustomElement$1;

export { WdprBottomNavItem, defineCustomElement };
//# sourceMappingURL=wdpr-bottom-nav-item.js.map

//# sourceMappingURL=wdpr-bottom-nav-item.js.map