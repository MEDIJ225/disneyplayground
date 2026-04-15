import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';

const wdprSegmentedVerticalTabCss = ".sc-wdpr-segmented-vertical-tab-h{display:inline-flex;flex-direction:column;align-items:center;justify-content:center;gap:var(--theme-spacing-050);border:1px solid var(--theme-color-stroke-actionable-alt-default);border-radius:var(--theme-radius-150);padding:var(--theme-spacing-100) var(--theme-spacing-150) var(--theme-spacing-050) var(--theme-spacing-150);background-color:var(--theme-color-surface-default);transition:background-color 0.2s ease-in-out,\n    color 0.2s ease-in-out,\n    border-color 0.2s ease-in-out;color:var(--theme-color-text-actionable-alt-default);cursor:pointer}.sc-wdpr-segmented-vertical-tab-h:not([disabled]):hover{color:var(--theme-color-text-actionable-alt-hover);border-color:var(--theme-color-stroke-actionable-alt-hover)}.sc-wdpr-segmented-vertical-tab-h:not([disabled]):active{color:var(--theme-color-text-actionable-alt-pressed);border-color:var(--theme-color-stroke-actionable-alt-pressed)}.sc-wdpr-segmented-vertical-tab-h:not([disabled]):focus-visible{outline:3px solid var(--theme-color-stroke-actionable-focused);outline-offset:2px;border-radius:10px}[active].sc-wdpr-segmented-vertical-tab-h{border-color:transparent;background-color:var(--theme-color-surface-actionable-alt-selected);color:var(--theme-color-text-inverse)}[active].sc-wdpr-segmented-vertical-tab-h:not([disabled]):hover{color:var(--theme-color-text-inverse);background-color:var(--theme-color-surface-actionable-alt-hover)}[active].sc-wdpr-segmented-vertical-tab-h:not([disabled]):active{color:var(--theme-color-text-inverse);background-color:var(--theme-color-surface-actionable-alt-pressed)}[disabled].sc-wdpr-segmented-vertical-tab-h{background-color:var(--theme-color-surface-default);color:var(--theme-color-text-disabled);border:1px solid var(--theme-color-stroke-actionable-alt-disabled);cursor:not-allowed}[active][disabled].sc-wdpr-segmented-vertical-tab-h{color:var(--theme-color-text-inverse);background-color:var(--theme-color-surface-actionable-alt-disabled)}.segmented-vertical-tab-icon-wrapper.sc-wdpr-segmented-vertical-tab{display:flex;align-items:center;justify-content:center;width:100%;height:var(--theme-spacing-250)}.segmented-vertical-tab-secondary-label.sc-wdpr-segmented-vertical-tab{text-align:center;font-family:var(--theme-font-family-default);font-size:var(--theme-typography-font-size-component-small);font-style:normal;font-weight:var(--theme-typography-font-weight-component-default);line-height:var(--theme-typography-line-height-component-small);letter-spacing:var(--theme-typography-letter-spacing-02)}.segmented-vertical-tab-main-label.sc-wdpr-segmented-vertical-tab{text-align:center;font-family:var(--theme-font-family-default);font-size:var(--theme-typography-font-size-component-medium);font-style:normal;font-weight:var(--theme-typography-font-weight-component-default);line-height:var(--theme-typography-line-height-component-medium-alt);letter-spacing:var(--theme-typography-letter-spacing--05)}";

const WdprSegmentedVerticalTab = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.tabClicked = createEvent(this, "tabClicked", 7);
    }
    get el() { return getElement(this); }
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
     * The id of the element that this tab controls
     * @type {string}
     */
    controlsId;
    /**
     * The tabindex of the tab
     * @type {number}
     */
    customTabIndex;
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
        return (h(Host, { key: '4c532137e820185f0768be6f3b12fe0dae4aeb90', id: this.tabId, role: "tab", "aria-selected": this.active ? 'true' : 'false', "aria-controls": this.controlsId, "aria-disabled": this.disabled ? 'true' : undefined, tabindex: this.disabled ? -1 : (this.customTabIndex ?? 0), onClick: this._handleClick, disabled: this.disabled }, h("div", { key: 'a78079584016aebfe9a72186e5834087b202b16b', class: "segmented-vertical-tab-icon-wrapper" }, this.icon && h("wdpr-icon-library", { key: '600a93e3e8ac14b03e673f1c264f4aac2581316b', icon: this.icon, size: "medium", decorative: true }), this.secondaryLabel && !this.icon && h("span", { key: '9d4578bccff3531d5af2aedbbf19b542c1e237a7', class: "segmented-vertical-tab-secondary-label" }, this.secondaryLabel)), h("span", { key: '39c54577bfc704551dd02c40e6b8881b929c1daf', class: "segmented-vertical-tab-main-label" }, this.label)));
    }
};
WdprSegmentedVerticalTab.style = wdprSegmentedVerticalTabCss;

export { WdprSegmentedVerticalTab as wdpr_segmented_vertical_tab };
//# sourceMappingURL=wdpr-segmented-vertical-tab.entry.js.map

//# sourceMappingURL=wdpr-segmented-vertical-tab.entry.js.map