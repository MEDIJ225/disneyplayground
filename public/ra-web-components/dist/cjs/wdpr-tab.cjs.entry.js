'use strict';

var index = require('./index-4gPM_TYz.js');

const wdprTabCss = ".sc-wdpr-tab-h{display:block;background-color:transparent;border:none;padding:var(--theme-spacing-150);margin:0;color:var(--theme-color-text-actionable-alt-default);cursor:pointer;border-bottom:var(--theme-stroke-050)  solid transparent;transition:border-color 0.2s ease-in-out}[grow].sc-wdpr-tab-h{flex:1}.sc-wdpr-tab-h:not([disabled]):hover{color:var(--theme-color-text-actionable-alt-hover)}.sc-wdpr-tab-h:not([disabled]):active{color:var(--theme-color-text-actionable-alt-selected)}[active].sc-wdpr-tab-h:not([disabled]):focus-visible{color:var(--theme-color-text-actionable-alt-selected)}.sc-wdpr-tab-h:not([disabled]):focus-visible{outline:none;position:relative;z-index:1}.sc-wdpr-tab-h:not([disabled]):focus-visible::before{content:'';position:absolute;top:-3px;left:-3px;right:-3px;bottom:-6px;border:3px solid var(--theme-color-surface-actionable-focus);border-radius:8px;pointer-events:none;z-index:-1}[show-inactive-border-bottom].sc-wdpr-tab-h{border-bottom-color:var(--theme-color-stroke-neutral-light)}[active].sc-wdpr-tab-h{border-bottom-color:var(--theme-color-stroke-actionable-alt-pressed);color:var(--theme-color-text-actionable-alt-default)}[active].sc-wdpr-tab-h:not([disabled]):hover{border-bottom-color:var(--theme-color-stroke-actionable-alt-hover)}[active].sc-wdpr-tab-h:not([disabled]):active{border-bottom-color:var(--theme-color-stroke-actionable-alt-selected)}[disabled].sc-wdpr-tab-h{color:var(--theme-color-text-disabled);cursor:not-allowed;pointer-events:none;border-bottom-color:transparent}.tab-content.sc-wdpr-tab{display:grid;justify-items:center;row-gap:var(--theme-spacing-100)}.tab-icon-wrapper.sc-wdpr-tab{display:flex;align-items:center;justify-content:center;width:100%;height:var(--theme-spacing-250)}.secondary-label.sc-wdpr-tab{text-align:center;font-family:var(--theme-font-family-default);font-size:var(--theme-typography-font-size-component-small);font-weight:var(--theme-typography-font-weight-component-alt);line-height:var(--theme-typography-line-height-label-small);font-style:normal;letter-spacing:var(--theme-typography-letter-spacing-default)}.main-label.sc-wdpr-tab{text-align:center;font-family:var(--theme-font-family-default);font-size:var(--theme-typography-font-size-component-large);font-weight:var(--theme-typography-font-weight-component-alt);line-height:var(--theme-typography-line-height-component-medium);font-style:normal;letter-spacing:var(--theme-typography-letter-spacing-default)}";

const WdprTab = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.tabClicked = index.createEvent(this, "tabClicked", 7);
    }
    get el() { return index.getElement(this); }
    /**
     * Tab id
     * @type {string}
     */
    tabId;
    /**
     * Tab label
     * @type {string}
     */
    label;
    /**
     * Tab secondary label
     * @type {string}
     */
    secondaryLabel;
    /**
     * Tab icon
     * @type {string}
     */
    icon;
    /**
     * if `true`, the tab is currently active.
     * @type {boolean}
     */
    active = false;
    /**
     * if `true`, the tab is disabled
     * @type {boolean}
     */
    disabled = false;
    /**
     * if `true`, the tab will grow to fill the available space.
     * @type {boolean}
     */
    grow = false;
    /**
     * The id of the element that this tab controls
     * @type {string}
     */
    controlsId;
    /**
     * The tabindex of the tab
     * @type {number}
     */
    customTabIndex;
    showInactiveBorderBottom = true;
    /**
     * Emitted when the tab button is clicked.
     * This is used by the parent wdpr-tab-bar to manage the active state.
     */
    tabClicked;
    _handleClick = () => {
        if (this.disabled)
            return;
        this.tabClicked.emit({ tabElement: this.el });
    };
    render() {
        return (index.h(index.Host, { key: 'fb0ade2a8365ec7a8dedcef9feea4a99d83f7eb6', id: this.tabId, role: "tab", class: "tab-button", "aria-selected": this.active.toString(), "aria-controls": this.controlsId, "aria-disabled": this.disabled ? 'true' : undefined, tabindex: this.disabled ? -1 : (this.customTabIndex ?? 0), onClick: this._handleClick, disabled: this.disabled }, index.h("div", { key: 'd1c0b715ef1b1fc998ba36cac7c74a83d57479e2', class: "tab-content" }, index.h("div", { key: '2846a4e4a4a3cb10a4053d8e280679c347639818', class: "tab-icon-wrapper" }, this.icon && index.h("wdpr-icon-library", { key: '278a3d3a1ace8c7269673952f3f1264995d39967', icon: this.icon, size: "small", decorative: true }), this.secondaryLabel && !this.icon && index.h("span", { key: '430566d3b055403addd71d75e989bca799ec43c6', class: "secondary-label" }, this.secondaryLabel)), index.h("span", { key: '7e8ef01011eac6c928a55c08e5ba952d249f5bea', class: "main-label" }, this.label))));
    }
};
WdprTab.style = wdprTabCss;

exports.wdpr_tab = WdprTab;
//# sourceMappingURL=wdpr-tab.entry.cjs.js.map

//# sourceMappingURL=wdpr-tab.cjs.entry.js.map