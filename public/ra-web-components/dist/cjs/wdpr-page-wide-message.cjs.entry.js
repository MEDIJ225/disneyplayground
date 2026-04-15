'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');

const WdprPageWideMessage = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.actionClicked = index.createEvent(this, "actionClicked", 7);
    }
    get el() { return index.getElement(this); }
    variant = 'success';
    titleMessage = '';
    description = '';
    showDescription = false;
    buttonText = '';
    showButton = false;
    a11yAriaRole = 'status';
    a11yButtonLabel;
    actionClicked;
    handleKeyDown(event) {
        if (event.key == keycodes_model.KEYBOARD_KEYS.ESCAPE) {
            event.preventDefault();
            document.activeElement?.blur();
        }
    }
    _handleClick = (event) => {
        event?.stopPropagation?.();
        this.actionClicked.emit();
    };
    _getCapitalValue(value) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    get _mapVariant() {
        const map = {
            success: 'success-extra-bright-large',
            informational: 'informational-extra-bright-large',
            warning: 'warning-extra-bright-large',
            error: 'critical-dim-large',
        };
        return map[this.variant];
    }
    get _ariaRole() {
        const value = (this?.a11yAriaRole || '').trim().toLowerCase();
        return value === 'alert' || value === 'status' ? value : undefined;
    }
    get _buttonVariant() {
        return this.variant === 'error' ? 'tertiary-alt' : 'tertiary';
    }
    get _containerClasses() {
        return `flex flex-wrap sm:flex-nowrap ${this.showDescription ? 'items-start' : 'items-center'} gap-150 w-full`;
    }
    get _contentClasses() {
        return `min-w-0 flex flex-1 flex-wrap sm:flex-nowrap items-start gap-150 `;
    }
    get _titleClasses() {
        return `line-clamp-1 heading-xsmall-alt ${this.variant === 'error' ? 'text-text-inverse' : 'text-text-heading'}`;
    }
    get _descriptionClasses() {
        return `body-small line-clamp-4 ${this.variant === 'error' ? 'text-text-inverse' : 'text-text-body'}`;
    }
    render() {
        return (index.h("wdpr-surface-style", { key: 'e4d6ecc0167f02d4f0aaaeb7bb9f86506f6f6e02', class: this._containerClasses, role: this._ariaRole, padding: "md", variant: this._mapVariant }, index.h("div", { key: '863c11a42e4e048d7f18d5f7f659bcde3813ff87', class: this._contentClasses }, index.h("div", { key: '087e990888f6e7dbdbdd6374aa3a9d1792215a41', class: "shrink-0" }, index.h("wdpr-status-icon", { key: 'a1e00e70e1d2d4dce501baa187b378cb026ea665', variant: this.variant, size: "xxsmall", ariaLabel: this._getCapitalValue(this.variant) })), index.h("div", { key: '81a5e7e5e0bd1d1f33204438bce04dc85c38280d', class: "flex-1 items-start flex flex-col gap-050 min-w-0 pt-025" }, index.h("h2", { key: 'b99140e77d17132773d96fe21127d6f2dd045a4a', part: "title", class: this._titleClasses, title: this.titleMessage || undefined }, this.titleMessage), this.showDescription && (index.h("p", { key: '934553e4d3d79790e4a45b29b099de844702960c', part: "description", class: this._descriptionClasses, title: this.description || undefined }, this.description))), this.showButton && (index.h("div", { key: '06c571ecf5ae576a8235b0081c658f85cfef3f1a', class: "shrink-0 w-full sm:w-auto" }, index.h("slot", { key: '6f7fff28304ffc174979bc0cfd145f1efc2b72f3', name: "action" }, index.h("wdpr-button", { key: '3a82200f889ef4030be697080f20c01473d889c1', variant: this._buttonVariant, onClick: this._handleClick, a11yLabel: this.a11yButtonLabel ?? this.buttonText, display: "block" }, this.buttonText)))))));
    }
};

exports.wdpr_page_wide_message = WdprPageWideMessage;
//# sourceMappingURL=wdpr-page-wide-message.entry.cjs.js.map

//# sourceMappingURL=wdpr-page-wide-message.cjs.entry.js.map