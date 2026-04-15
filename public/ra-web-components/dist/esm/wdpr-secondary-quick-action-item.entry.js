import { r as registerInstance, c as createEvent, a as getElement, h } from './index-CykM8GCN.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const getLabelClass = (colorClass, customClass) => {
    return customTwMerge(labelBaseClass, colorClass, customClass);
};
const getColorClass = (disabled) => {
    const baseClass = 'text-text-actionable-alt-default cursor-pointer group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed';
    const disabledClass = 'text-text-actionable-alt-disabled cursor-not-allowed';
    return disabled ? disabledClass : baseClass;
};
const getMediaClass = (showBackground) => {
    const baseClass = 'w-dimension-700 h-dimension-700';
    const backgroundClass = 'w-dimension-500 h-dimension-500';
    return showBackground ? backgroundClass : baseClass;
};
const getContainerClass = (showBackground) => {
    const backgroundClass = 'rounded-100 bg-white elevation-small-soft p-200';
    const hoverClass = "hover:outline-stroke-actionable-alt-hover hover:outline-solid hover:outline-[1px]";
    const activeClass = "active:outline-stroke-actionable-alt-pressed active:outline-solid active:outline-[1px]";
    return showBackground ? customTwMerge(containerBaseClass, backgroundClass, hoverClass, activeClass) : containerBaseClass;
};
const labelBaseClass = 'font-[var(--font-weight-heading-alt)] leading-heading-small text-[18px] tracking--05 px-075 pt-025';
const containerBaseClass = `
  flex items-center rounded-075 h-full group border-transparent
  border-012 border-solid
  focus-visible:outline-stroke-actionable-focused
  focus-visible:outline-solid
  focus-visible:outline-offset-[3px]
  focus-visible:outline-025
`;

const WdprSecondaryQuickActionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.itemSelected = createEvent(this, "itemSelected", 7);
    }
    get el() { return getElement(this); }
    label;
    showMedia = false;
    showBackground = false;
    mediaSrc = null;
    customLabelClass = '';
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
    get _containerClass() {
        return getContainerClass(this.showBackground);
    }
    get _mediaClass() {
        return getMediaClass(this.showBackground);
    }
    _itemClick() {
        if (this.disabled)
            return;
        this.selected = !this.selected;
        this.itemSelected.emit(this.selected);
    }
    render() {
        return (h("div", { key: '17a22f31e9c54bab51e185678fe249a381466c24', class: this._containerClass, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-pressed": this.selected ? 'true' : 'false', "aria-disabled": this.disabled ? 'true' : undefined, onClick: this._itemClick.bind(this) }, this.showMedia && (h("div", { key: '98a009de73aa74207579818f7735f33d6392a156', class: this._mediaClass }, h("wdpr-media", { key: '41300d75ebc974d3d58f3b5ddf8a40b80a9d640b', src: this.mediaSrc, alt: this.label, fade: true, aspect: "square", shape: "flat", objectFit: "fill", landscapeRatio: "16:9", portraitRatio: "3:4" }))), h("div", { key: '05baba6d9b5adefeb9b81e6d59893c00bcf2897f', class: this._labelClass }, this.label)));
    }
};

export { WdprSecondaryQuickActionItem as wdpr_secondary_quick_action_item };
//# sourceMappingURL=wdpr-secondary-quick-action-item.entry.js.map

//# sourceMappingURL=wdpr-secondary-quick-action-item.entry.js.map