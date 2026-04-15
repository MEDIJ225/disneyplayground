'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprAvatar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprToggle = index.createEvent(this, "wdprToggle", 7);
    }
    _imageLoaded = true;
    get el() { return index.getElement(this); }
    imageSrc = '';
    /**
     * Alternate text for the image
     */
    altText = '';
    size = 'medium';
    /**
     * Text to display if the image is not available
     */
    text = '';
    label = '';
    subLabel = '';
    labelPosition = 'inline';
    showBorder = false;
    isOverflow = false;
    selected = false;
    isInteractive = true;
    /** Number displayed inside the notification badge. */
    notificationNumber = 0;
    /** Type of the notification badge — controls its color/icon. */
    notificationType = 'alert';
    /** When true, renders a notification badge anchored to the avatar. */
    showNotificationBadge = false;
    /**
     * Emitted whenever the avatar toggles its selected state (also isInteractive must be true).
     * @event
     * @type {{ selected?: boolean }}
     * Object containing the selected flag.
     */
    wdprToggle;
    /**
     * Reset the imageLoaded state when the image source changes
     */
    handleImageChange() {
        this._imageLoaded = true;
    }
    _onImageError = () => {
        this._imageLoaded = false;
    };
    _handleClick = () => {
        if (!this.isInteractive)
            return;
        this.selected = !this.selected;
        this.wdprToggle.emit({ selected: this.selected });
    };
    get _containerClasses() {
        const labelPositionClasses = this.labelPosition === 'stacked' ? 'inline-flex flex-col items-center gap-050' : 'inline-flex items-center gap-150';
        const interactiveClasses = this.isInteractive ? 'cursor-pointer' : null;
        const borderRadiusClasses = this.label || this.subLabel ? 'rounded-050' : 'rounded-pill';
        return utils.customTwMerge(containerBaseClasses, labelPositionClasses, interactiveClasses, borderRadiusClasses);
    }
    get _avatarClasses() {
        const borderClasses = this.showBorder ? 'border-stroke-inverse' : 'border-transparent';
        const colorClasses = this.isOverflow ? 'text-text-heading bg-surface-neutral-light' : 'text-text-inverse bg-surface-neutral-extra-dark';
        const selectedStateClasses = this.isInteractive && this.selected && 'border-stroke-actionable-alt-selected';
        const interactiveClasses = this.isInteractive && 'group-hover:border-stroke-actionable-alt-hover group-active:border-stroke-actionable-alt-pressed';
        return utils.customTwMerge(avatarBaseClasses, colorClasses, sizeClasses[this.size], borderClasses, selectedStateClasses, interactiveClasses);
    }
    get _labelContainerClasses() {
        return this.labelPosition === 'stacked' ? 'flex flex-col items-center' : 'flex flex-col items-start';
    }
    get _labelClasses() {
        const selectedStateClasses = this.isInteractive && this.selected && 'text-text-actionable-alt-selected text-heading-xxsmall font-heading-default leading-heading-xxsmall';
        const interactiveClasses = this.isInteractive &&
            ` group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed
        group-hover:text-heading-xxsmall group-active:text-heading-xxsmall
        group-hover:font-heading-default group-active:font-heading-default
        group-hover:leading-heading-xxsmall group-active:leading-heading-xxsmall`;
        return utils.customTwMerge(labelBaseClasses, selectedStateClasses, interactiveClasses);
    }
    get _subLabelClasses() {
        const selectedStateClasses = this.isInteractive && this.selected && 'text-text-actionable-alt-selected text-body-small font-body-alt leading-body-small';
        const interactiveClasses = this.isInteractive &&
            ` group-hover:text-text-actionable-alt-hover group-active:text-text-actionable-alt-pressed
      group-hover:text-body-small group-active:text-body-small
      group-hover:font-body-alt group-active:font-body-alt
      group-hover:leading-body-small group-active:leading-leading-body-small`;
        return utils.customTwMerge(subLabelBaseClasses, interactiveClasses, selectedStateClasses);
    }
    get _formattedText() {
        const maxCharsToDisplay = 3;
        if (this.text.length <= maxCharsToDisplay) {
            return this.text.toUpperCase();
        }
        return this.text.slice(0, maxCharsToDisplay).toUpperCase();
    }
    get _isDecorative() {
        // If author provided altText (non-empty) → informative
        if (this.imageSrc && this.altText.trim().length > 0)
            return false;
        // If label/subLabel provided → informative
        if (this.label || this.subLabel)
            return false;
        // If initials text present → informative (name-ish)
        if (this.text && this.text.trim().length > 0)
            return false;
        // overflow chip is informative too (“+N more”)
        if (this.isOverflow)
            return false;
        return true;
    }
    get imgAlt() {
        if (this._isDecorative)
            return '';
        return this.altText?.trim() || this.label || this._formattedText || '';
    }
    get _accessibleNotificationLabel() {
        if (!this.showNotificationBadge || this.notificationNumber <= 0)
            return undefined;
        const word = this.notificationNumber === 1 ? 'notification' : 'notifications';
        return `${this.notificationNumber} ${word}`;
    }
    _renderNotificationBadge() {
        if (!this.showNotificationBadge)
            return null;
        return (index.h("span", { class: utils.customTwMerge('absolute', notificationOffsetClasses[this.size]) }, index.h("wdpr-notification-indicator", { size: "small", type: this.notificationType, number: this.notificationNumber, decorative: true })));
    }
    render() {
        // For non-image (initials) informative avatars, expose an aria-label on the avatar box
        const avatarAria = {};
        if (this._isDecorative) {
            avatarAria['aria-hidden'] = 'true';
        }
        else if ((!this.imageSrc || !this._imageLoaded) && !this.isOverflow) {
            const baseLabel = this.label || this.altText || this._formattedText || this.subLabel || '';
            const notifSuffix = this._accessibleNotificationLabel;
            avatarAria['role'] = 'img';
            avatarAria['aria-label'] = notifSuffix && baseLabel ? `${baseLabel}, ${notifSuffix}` : (notifSuffix ?? baseLabel);
        }
        else if (this.isOverflow) {
            const overflowBase = `${this.text?.replace('+', '')?.trim() || ''} more`;
            const notifSuffix = this._accessibleNotificationLabel;
            avatarAria['role'] = 'img';
            avatarAria['aria-label'] = notifSuffix && overflowBase ? `${overflowBase}, ${notifSuffix}` : (notifSuffix ?? overflowBase);
        }
        return (index.h("div", { key: '93605fafb2d227aed2e6a2c5df1b130b6fb1eceb', class: this._containerClasses, tabindex: this.isInteractive ? 0 : -1, onClick: this._handleClick }, index.h("div", { key: 'b6e9cc1fc9a65b1ff3f4a10ba8beea7181c0d823', class: "relative inline-flex" }, index.h("div", { key: '1fea8e659489f32694c5132e4bf0a94bfe77be0f', class: this._avatarClasses, part: "avatar", ...avatarAria }, this.imageSrc && this._imageLoaded ? (index.h("img", { src: this.imageSrc, alt: this.imgAlt, onError: this._onImageError, class: "w-full h-full rounded-pill" })) : (index.h("span", null, this._formattedText))), this._renderNotificationBadge()), (this.label || this.subLabel) && (index.h("div", { key: '58452ecff7c2a5b651529449a16feb0f49d95c4e', class: this._labelContainerClasses }, this.label && index.h("span", { key: '56704e3aaeeb30a710c7dc139705ad7e1b559f96', class: this._labelClasses }, this.label), this.subLabel && index.h("span", { key: 'd10dd5aea4f37b78ee3b138256a1080c74d3305d', class: this._subLabelClasses }, this.subLabel)))));
    }
    static get watchers() { return {
        "imageSrc": ["handleImageChange"]
    }; }
};
const notificationOffsetClasses = {
    large: '-top-025 right-025',
    medium: '-top-050 right-[1px]',
    small: '-top-050 right-000',
};
const sizeClasses = {
    large: 'size-dimension-800 text-component-xxxlarge font-component-accent leading-component-xxlarge-alt tracking--05',
    medium: 'size-dimension-550 text-component-xlarge font-component-accent leading-component-xlarge tracking--05',
    small: 'size-dimension-450 text-component-medium font-component-accent leading-component-medium-alt tracking-default'
};
const containerBaseClasses = 'group focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2';
const avatarBaseClasses = 'flex items-center justify-center gap-100 shrink-0 rounded-pill box-content border-025 bg-clip-content';
const labelBaseClasses = 'text-text-heading heading-xxsmall-alt';
const subLabelBaseClasses = 'text-text-body body-small';

exports.wdpr_avatar = WdprAvatar;
//# sourceMappingURL=wdpr-avatar.entry.cjs.js.map

//# sourceMappingURL=wdpr-avatar.cjs.entry.js.map