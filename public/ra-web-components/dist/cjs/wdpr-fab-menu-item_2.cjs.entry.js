'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprFabMenuItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprChange = index.createEvent(this, "wdprChange", 7);
    }
    _isHover = false;
    _isMousedown = false;
    item;
    isLast = false;
    wdprChange;
    _handleClick() {
        if (this.item.disabled) {
            return;
        }
        this.wdprChange.emit(this.item);
    }
    get textColorClass() {
        if (this.item.disabled) {
            return 'text-text-actionable-alt-disabled';
        }
        return this._isHover || this._isMousedown ? 'text-text-default' : 'text-text-actionable-alt-default';
    }
    get _labelClasses() {
        return utils.customTwMerge(fabMenuItemLabelClasses, this.textColorClass);
    }
    get menuItemClasses() {
        const textColorClass = this.textColorClass;
        const marginClass = this.isLast ? '' : 'mb-100';
        return utils.customTwMerge(fabMenuItemBaseClasses, marginClass, textColorClass);
    }
    render() {
        return (index.h("button", { key: '951011608071fea59d22238c8965b3a720b11d64', type: "button", role: "menuitem", disabled: this.item.disabled ? true : false, class: this.menuItemClasses, onClick: this._handleClick.bind(this), "aria-label": this.item.ariaLabel || undefined, "aria-disabled": this.item.disabled ? 'true' : undefined, onMouseDown: () => this._isMousedown = true, onMouseUp: () => this._isMousedown = false, onMouseEnter: () => this._isHover = true, onMouseLeave: () => this._isHover = false }, index.h("div", { key: '981815e3b36864564c65d9dbf7b485cc503b4c2e', class: `${this.textColorClass} mr-150 flex items-center` }, index.h("wdpr-icon-library", { key: 'c832463527680453da8ec86e2c23c160e8a9cb38', icon: this.item.icon, size: 'medium', decorative: true })), index.h("span", { key: 'f2cb3c2724f8ab4c8f7a372e04de3a5b5b39e4df', class: this._labelClasses }, this.item.label)));
    }
};
const fabMenuItemLabelClasses = 'text-body-large font-body-alt leading-body-large tracking-default';
const fabMenuItemBaseClasses = `flex items-center rounded-pill select-none
                                disabled:bg-surface-disabled disabled:text-text-actionable-alt-disabled disabled:cursor-not-allowed
                                bg-surface-default px-300 py-200 cursor-pointer w-[calc(100vw-48px)] sm:w-auto sm:min-w-[342px] h-dimension-700 
                                hover:bg-surface-actionable-alt-hover active:bg-surface-actionable-alt-pressed
                                focus:outline-none focus-visible:outline-solid focus-visible:outline-offset-2
                                focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused`;

const WdprFabTrigger = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprToggle = index.createEvent(this, "wdprToggle", 7);
    }
    get el() { return index.getElement(this); }
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
            return (index.h("button", { type: "button", class: this._closedButtonClass, onClick: this._handleToggle, disabled: this.disabled, "aria-haspopup": "true", "aria-expanded": "false", "aria-disabled": this.disabled ? 'true' : undefined }, this.icon && (index.h("span", { class: "flex items-center", "aria-hidden": "true" }, index.h("wdpr-icon-library", { icon: this.icon, size: this._iconSize, decorative: true }))), this.label));
        }
        return (index.h("button", { type: "button", class: this._iconButtonClass, onClick: this._handleToggle, disabled: this.disabled, "aria-label": this.closeA11yLabel, "aria-expanded": "true", "aria-disabled": this.disabled ? 'true' : undefined }, index.h("wdpr-icon-library", { icon: "close-reversed", size: this._iconSize, decorative: true })));
    }
};
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

exports.wdpr_fab_menu_item = WdprFabMenuItem;
exports.wdpr_fab_trigger = WdprFabTrigger;
//# sourceMappingURL=wdpr-fab-menu-item.wdpr-fab-trigger.entry.cjs.js.map

//# sourceMappingURL=wdpr-fab-menu-item_2.cjs.entry.js.map