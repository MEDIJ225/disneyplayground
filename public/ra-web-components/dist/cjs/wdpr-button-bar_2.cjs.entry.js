'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const SLOT_SELECTORS = {
    'primary-button': 'slot[name="primary-button"]',
    'secondary-button': 'slot[name="secondary-button"]',
    'tertiary-button': 'slot[name="tertiary-button"]',
};
const WdprButtonBar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    _hasPrimary = false;
    _hasSecondary = false;
    _hasTertiary = false;
    /**
     * Disables all slotted buttons in the bar.
     * @default false
     */
    disabled = false;
    /**
     * Layout mode:
     * - 'split'  : two or three columns (buttons distributed evenly)
     * - 'stacked': always one column (buttons stacked vertically)
     * - 'hug'    : compact layout for one or two buttons
     * - 'fill'   : buttons stretch to fill the available space
     * @default 'split'
     */
    layout = 'split';
    /**
     * When true, buttons stack vertically on mobile viewports for fill, split,
     * and hug layouts. When false, buttons remain side-by-side at all widths.
     * Has no effect on the stacked layout.
     * @default true
     */
    autoStack = true;
    _handleDisabledChange() {
        this._syncAllSlots();
    }
    _handleLayoutChange() {
        this._syncAllSlots();
    }
    // ---------- lifecycle ----------
    componentDidLoad() {
        this._handlePrimarySlotChange();
        this._handleSecondarySlotChange();
        this._handleTertiarySlotChange();
        this._syncAllSlots();
    }
    // ---------- slot helpers ----------
    _getSlotEl(slotName) {
        return this.el.shadowRoot?.querySelector(SLOT_SELECTORS[slotName]) ?? null;
    }
    _hasAssignedElements(slotEl) {
        return !!slotEl && slotEl.assignedElements({ flatten: true }).length > 0;
    }
    _syncSlot(slotName) {
        const slotEl = this._getSlotEl(slotName);
        // Propagate "disabled" to assigned elements, falling back to aria-disabled
        utils.propagateToSlot(slotEl, 'disabled', this.disabled, 'wdpr-button');
    }
    _syncAllSlots() {
        this._syncSlot('primary-button');
        this._syncSlot('secondary-button');
        this._syncSlot('tertiary-button');
    }
    // ---------- slot handlers ----------
    _handlePrimarySlotChange = () => {
        const slotEl = this._getSlotEl('primary-button');
        this._hasPrimary = this._hasAssignedElements(slotEl);
        this._syncSlot('primary-button');
    };
    _handleSecondarySlotChange = () => {
        const slotEl = this._getSlotEl('secondary-button');
        this._hasSecondary = this._hasAssignedElements(slotEl);
        this._syncSlot('secondary-button');
    };
    _handleTertiarySlotChange = () => {
        const slotEl = this._getSlotEl('tertiary-button');
        this._hasTertiary = this._hasAssignedElements(slotEl);
        this._syncSlot('tertiary-button');
    };
    // ---------- layout classes ----------
    get _containerClass() {
        const stack = this.autoStack ? 'flex-col sm:flex-row' : 'flex-row';
        switch (this.layout) {
            case 'split':
                return `flex ${stack} ${this._hasTertiary ? 'justify-between' : 'justify-around'} items-center gap-200 w-full`;
            case 'stacked':
                return `grid grid-cols-1 gap-200 w-full`;
            case 'hug':
                return `flex justify-end items-center gap-100 w-auto`;
            case 'fill':
                return `flex justify-between items-center w-full`;
            default:
                return '';
        }
    }
    get _rightClass() {
        const stack = this.autoStack ? 'flex-col sm:flex-row' : 'flex-row';
        switch (this.layout) {
            case 'split': {
                const justify = this._hasTertiary || !this._hasSecondary ? 'justify-end' : 'justify-between';
                return `flex ${stack} ${justify} items-center gap-200 w-full`;
            }
            case 'stacked':
                return `grid grid-cols-1 gap-200 w-full`;
            case 'hug':
                return `flex ${this.autoStack ? 'flex-col sm:flex-row' : 'flex-row'} justify-end items-center gap-100 w-auto`;
            case 'fill':
                if (this._hasSecondary) {
                    return this.autoStack
                        ? `grid grid-cols-1 sm:grid-cols-2 gap-200 w-full`
                        : `grid grid-cols-2 gap-200 w-full`;
                }
                return `grid grid-cols-1 gap-200 w-full`;
            default:
                return '';
        }
    }
    get _primaryWrapClass() {
        switch (this.layout) {
            case 'split':
                return this._hasTertiary ? 'md:col-start-3' : 'md:col-start-2';
            case 'stacked':
            case 'hug':
            default:
                return undefined;
        }
    }
    get _secondaryWrapClass() {
        if (!this._hasSecondary) {
            return 'hidden';
        }
        switch (this.layout) {
            case 'split':
                return 'md:col-start-1';
            case 'stacked':
            case 'hug':
            default:
                return undefined;
        }
    }
    get _tertiaryWrapClass() {
        switch (this.layout) {
            case 'split':
                return this._hasTertiary ? 'md:col-start-2' : 'hidden';
            case 'hug':
                return 'hidden';
            case 'stacked':
            default:
                return undefined;
        }
    }
    // ---------- render ----------
    render() {
        return (index.h(index.Host, { key: '332f0003f1b1d4314f9cf5c2a01230bb8d71ed96', role: "group", "aria-disabled": this.disabled ? 'true' : 'false' }, index.h("div", { key: 'df3b88f23c4bb32cafd4d36eef71ae79332a8e44', class: this._containerClass }, this.layout === 'split' && (index.h("div", { key: '4f7ca4b40628fcc98395b25dd23c1e1543c06927', class: this._tertiaryWrapClass }, index.h("slot", { key: '5671b5889704607a7c61eebfa521c583d6ee6a1b', name: "tertiary-button", onSlotchange: this._handleTertiarySlotChange }))), index.h("div", { key: '5ba328c9b3be5d5c6b23aa1a45d32e46f1851d04', class: this._rightClass }, index.h("div", { key: '646022fc2ec394a89ba0a1cf5cd19e801a51fe6e', class: this._secondaryWrapClass }, index.h("slot", { key: '6507a83bec29e56f443ac9927f8fc82a8b6ff63d', name: "secondary-button", onSlotchange: this._handleSecondarySlotChange })), index.h("div", { key: '4f04f2a81340e37421edec393e3bc2aa173ede3b', class: this._primaryWrapClass }, index.h("slot", { key: 'afddd7898b143dd58324d19a298de3028073ce86', name: "primary-button", onSlotchange: this._handlePrimarySlotChange }))))));
    }
    static get watchers() { return {
        "disabled": ["_handleDisabledChange"],
        "layout": ["_handleLayoutChange"]
    }; }
};

const WdprButtonDock = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.disabledChanged = index.createEvent(this, "disabledChanged", 7);
    }
    get el() { return index.getElement(this); }
    /**
     * @internal
     * State to detect content in slot total
     */
    hasTotal = false;
    /** The label that will be displayed
     * @type {string}
     */
    label;
    /** The sublabel that will be displayed
     * @type {string}
     */
    subLabel;
    /** The centered label that will be displayed
     * @type {string}
     */
    centeredLabel;
    /** Accessible name for the region container
     * @default 'Actions'
     * @type {string}
     */
    a11yLabel = 'Actions';
    showDivider = true;
    /**
     * Visually dim + sets aria-disabled on the container
     * @default false
     * @type {boolean}
     */
    disabled = false;
    handleDisabledChange(next) {
        this.disabledChanged.emit(next);
        // Propagate to slotted content
        this.syncButtonBarSlot();
    }
    /** Event emitted when disabled changes
     * @event
     * @type {boolean}
     */
    disabledChanged;
    componentDidLoad() {
        this.syncButtonBarSlot();
    }
    get headerAndTotalRowWrapperClasses() {
        const hasHeader = !!this.label || !!this.subLabel;
        // Bitmask:
        // 1 (01) → hasHeader
        // 2 (10) → hasTotal
        const mask = (hasHeader ? 1 : 0) | (this.hasTotal ? 2 : 0);
        const justifyClass = {
            0: 'hidden', // 00 → neither header nor total
            1: 'justify-start', // 01 → only header
            2: 'justify-end', // 10 → only total
            3: 'justify-between', // 11 → both header and total
        };
        return utils.customTwMerge(headerAndTotalRowWrapperBaseClasses, justifyClass[mask]);
    }
    syncButtonBarSlot() {
        const slotEl = this.el.shadowRoot?.querySelector(`slot[name="button-bar"]`);
        // Propagate "disabled" to assigned elements, falling back to aria-disabled
        utils.propagateToSlot(slotEl, 'disabled', this.disabled, 'wdpr-button-bar');
    }
    onTotalSlotChange = () => {
        const sr = this.el.shadowRoot;
        const total = sr.querySelector('slot[name="total"]');
        this.hasTotal = !!total?.assignedNodes({ flatten: true }).length;
    };
    onButtonBarSlotChange = () => {
        const buttonBar = this.el.shadowRoot?.querySelector('slot[name="button-bar"]');
        utils.propagateToSlot(buttonBar, 'disabled', this.disabled, 'wdpr-button-bar');
    };
    renderHeaderAndTotalRow() {
        return (index.h("div", { class: this.headerAndTotalRowWrapperClasses }, index.h("div", { class: "flex flex-col items-start gap-025" }, index.h("h2", { class: "heading-small text-text-heading" }, this.label), index.h("p", { class: "body-small text-text-disclaimer" }, this.subLabel)), index.h("slot", { name: "total", onSlotchange: this.onTotalSlotChange })));
    }
    render() {
        return (index.h("div", { key: '886741fc9abd2ccf5ec91c4eb6802d19c7cb934a', class: "w-full" }, this.showDivider && index.h("wdpr-divider", { key: 'a169efd1a480ee0e42f822de710061da97e12214', part: "divider" }), index.h("section", { key: 'c0d608e00aa2516a4cddd8f205318a7f75674035', role: "region", "aria-label": this.a11yLabel, "aria-disabled": this.disabled ? 'true' : 'false', class: containerClasses }, this.renderHeaderAndTotalRow(), this.centeredLabel && (index.h("div", { key: '0e397a5fa95f21f0eabcf1ffe5ee30c8dcc89d44', class: "pr-200 pl-200 w-full flex justify-center" }, index.h("p", { key: 'ac95bd07e3b3fe932d6d69a9e6ed11e934bf5cdc', class: "heading-xsmall" }, this.centeredLabel))), index.h("section", { key: 'af5eee52347790ecc735713e28cf479c32502e90', class: buttonBarFrameClasses, part: "button-bar-frame" }, index.h("slot", { key: '176fbf8adbdd5329fcc2a7a576c6444aabedea6c', name: "button-bar", onSlotchange: this.onButtonBarSlotChange })))));
    }
    static get watchers() { return {
        "disabled": ["handleDisabledChange"]
    }; }
};
const containerClasses = 'flex flex-col items-center gap-200 bg-surface-default w-full p-300';
const headerAndTotalRowWrapperBaseClasses = 'flex items-center self-stretch';
const buttonBarFrameClasses = 'w-full items-center self-stretch gap-200';

exports.wdpr_button_bar = WdprButtonBar;
exports.wdpr_button_dock = WdprButtonDock;
//# sourceMappingURL=wdpr-button-bar.wdpr-button-dock.entry.cjs.js.map

//# sourceMappingURL=wdpr-button-bar_2.cjs.entry.js.map