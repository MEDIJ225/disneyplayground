import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';
import { c as customTwMerge, g as generateRandId } from './utils-B2sDCMk6.js';
import { K as KEYBOARD_KEYS } from './keycodes.model-CgKa3i1r.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';

const getPrimaryLabelClasses = (disabled) => {
    const textColor = disabled ? 'text-text-disabled' : 'text-text-label';
    return customTwMerge('main-label line-clamp-2', 'text-component-medium font-component-default leading-component-small tracking-default', textColor);
};
const getSecondaryLabelClasses = (disabled) => {
    const textColor = disabled ? 'text-text-disabled' : 'text-text-disclaimer';
    return customTwMerge('secondary-label mt-050 line-clamp-1', 'text-label-small font-label-default leading-label-small tracking-default', textColor);
};
const getDisabledClasses = (baseClasses) => {
    return customTwMerge(baseClasses, variantClasses.default, variantClasses.disabled, 'bg-surface-disabled', 'text-text-disabled');
};
const getFocusClasses = (orientation) => {
    return `
    focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-050
    ${orientation === 'vertical' ? 'focus-visible:outline-stroke-actionable-alt-pressed' : 'focus-visible:outline-stroke-actionable-focused'}
  `;
};
const getCustomIconClass = (isDisabled, backgroundIcon) => {
    const noneStyles = 'p-0 flex';
    if (isDisabled) {
        const disabledTextColor = 'text-text-disabled';
        return backgroundIcon !== 'none' ? iconClasses.disabled : bundleCjsExports.twMerge(disabledTextColor, noneStyles);
    }
    return backgroundIcon === 'none' ? bundleCjsExports.twMerge('text-text-label', noneStyles) : '';
};
const getIconClass = (isDisabled) => {
    return ['text-text-body', 'text-text-disabled'][isDisabled ? 1 : 0];
};
const getDefaultClasses = (baseClasses, orientation, backgroundIcon, hasSublabel) => {
    const alignmentClasses = orientation === 'horizontal' && backgroundIcon === 'none' && hasSublabel ? 'items-start' : '';
    return customTwMerge(baseClasses, alignmentClasses, variantClasses.focus, variantClasses.default, variantClasses.hover, variantClasses.active, getFocusClasses(orientation));
};
const getBaseClasses = (orientation, hasAvatarGroup, iconJustified) => {
    const gapClass = orientation === 'vertical' && hasAvatarGroup ? 'gap-050' : 'gap-100';
    const iconAlignClasses = iconJustified && orientation === 'horizontal' ? 'justify-center' : '';
    const orientationClasses = orientation === 'vertical' ? 'flex-col justify-center p-150' : 'flex-row items-center p-150';
    return customTwMerge(gapClass, orientationClasses, iconAlignClasses, 'w-full');
};
const variantClasses = {
    default: 'bg-surface-default elevation-xsmall-soft flex rounded-200 h-full border-transparent border-012 border-solid cursor-pointer',
    hover: 'hover:border-stroke-neutral-light',
    active: 'active:border-stroke-neutral-medium',
    focus: 'focus-visible:outline-solid focus-visible:outline-offset-[3px] focus-visible:outline-025',
    disabled: 'text-text-disabled bg-surface-disabled cursor-not-allowed elevation-none',
};
const iconClasses = {
    disabled: 'bg-surface-actionable-alt-disabled text-text-inverse',
};

const wdprTileCss = ":host{position:relative;display:block;width:fit-content}:host(.full-width){width:100%}.content-wrapper{display:block}";

const WdprTile = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.wdprClick = createEvent(this, "wdprClick", 7);
    }
    get el() { return getElement(this); }
    _hasAvatarGroup = false;
    _internalId;
    label = '';
    disabled = false;
    visualContent = 'icon';
    roleType = 'button';
    iconJustified = false;
    secondaryLabel = null;
    iconName;
    mediaSrc;
    orientation = 'vertical';
    fullWidth = 'false';
    backgroundIcon = 'none';
    tileId;
    showNotificationIcon = false;
    navigationPath = '';
    a11yLabel = '';
    a11yIconLabel;
    wdprClick;
    componentWillLoad() {
        this._hasAvatarGroup = !!this.el.querySelector('[slot="avatar-group"]');
        this._internalId = this.tileId || `wdpr-tile-${generateRandId()}`;
    }
    handleKeyDown(ev) {
        if (ev.key == KEYBOARD_KEYS.ESCAPE) {
            ev.preventDefault();
            document.activeElement?.blur();
        }
    }
    get _baseClasses() {
        return getBaseClasses(this.orientation, this._hasAvatarGroup, this.iconJustified);
    }
    get _disabledClasses() {
        return getDisabledClasses(this._baseClasses);
    }
    get _defaultClasses() {
        return getDefaultClasses(this._baseClasses, this.orientation, this.backgroundIcon, !!this.secondaryLabel);
    }
    get _customClass() {
        return getCustomIconClass(this.disabled, this.backgroundIcon);
    }
    get _iconClass() {
        return getIconClass(this.disabled);
    }
    _onPress = () => {
        if (this.disabled)
            return;
        this.wdprClick.emit({ tileElement: this.el, navigationPath: this.navigationPath });
    };
    _onKeyDown = (event) => {
        const key = event.key;
        if (key == KEYBOARD_KEYS.ENTER || (key == KEYBOARD_KEYS.SPACE && this.roleType !== 'link')) {
            event.preventDefault();
            this._onPress();
        }
    };
    render() {
        const isLink = this.roleType === 'link' && !!this.navigationPath;
        const Tag = this.roleType === 'link' ? 'a' : 'div';
        const linkProps = isLink ? { href: this.navigationPath } : {};
        return (h(Host, { key: '6b7dd28e3b8809c8d990f96ee64a9bc855e18568', class: { 'full-width': this.fullWidth == 'true' || this.fullWidth === true } }, this.showNotificationIcon && h("wdpr-notification-indicator", { key: 'ed22ac35859a9768c294846ea8de1bb44a33db7e', class: "absolute top-[-8] right-[-2]" }), h(Tag, { key: '69fa7b95903f51b2f661cc0a59bc685b283352bd', ...linkProps, class: this.disabled ? this._disabledClasses : this._defaultClasses, role: this.roleType === 'button' ? 'button' : undefined, tabindex: this.disabled ? -1 : 0, "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this.a11yLabel || undefined, id: this._internalId, onClick: this._onPress, onKeyDown: this._onKeyDown }, this.visualContent === 'icon' && (h("div", { key: '02c9141d1020e6a19d11dbf442ebfd12b3cc429f', class: this._iconClass }, this.orientation === 'vertical' && h("wdpr-icon-library", { key: '8d7d56dc6d1f77676bef3d087f112b2646afcf06', icon: this.iconName, size: "large", decorative: !this.a11yIconLabel, a11yLabel: this.a11yIconLabel }), this.orientation === 'horizontal' && (h("wdpr-icon", { key: '8b8e1b2eb2624a6b5ff01c7c26cfb70d66b7ed3a', icon: this.iconName, size: "medium", background: this.backgroundIcon, variant: "secondary", customClass: this._customClass, decorative: !this.a11yIconLabel, a11yLabel: this.a11yIconLabel })))), this.visualContent === 'media' && (h("div", { key: 'ae927145ffb5f55456c377f61ecfea2d6e2a9ff0', class: "w-dimension-400 h-dimension-400" }, h("wdpr-media", { key: '35d406bf43fce276d081f40e5c28f2520cbfee57', src: this.mediaSrc, alt: "alt", fade: true, aspect: "square", shape: "flat", objectFit: "fill", landscapeRatio: "16:9", portraitRatio: "3:4" }))), this.visualContent == 'avatarGroup' && this.orientation === 'vertical' && (h("div", { key: '834a1326ce9f6432211f1e18d3bfbd74e2e24d96', class: "ml-[-5px]" }, h("slot", { key: '62f7342fdc6dd9a97b5c09c306210adf1d900bf5', name: "avatar-group" }))), h("div", { key: '16b38c44b5d15a0aadaeb0523fdc782e92269d15', class: "content-wrapper overflow-hidden text-ellipsis" }, this.label && h("div", { key: 'b6d3a89459230b8e2ea3469d6cc7d7ceafdbd400', class: getPrimaryLabelClasses(this.disabled) }, this.label), this.secondaryLabel && h("div", { key: 'ee7c82f0a355c695685f002bc0874a6400e020ae', class: getSecondaryLabelClasses(this.disabled) }, this.secondaryLabel)))));
    }
};
WdprTile.style = wdprTileCss;

export { WdprTile as wdpr_tile };
//# sourceMappingURL=wdpr-tile.entry.js.map

//# sourceMappingURL=wdpr-tile.entry.js.map