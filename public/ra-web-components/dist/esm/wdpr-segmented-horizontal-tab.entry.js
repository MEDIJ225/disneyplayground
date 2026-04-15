import { r as registerInstance, c as createEvent, a as getElement, h, H as Host } from './index-CykM8GCN.js';

const wdprSegmentedHorizontalTabCss = ".sc-wdpr-segmented-horizontal-tab-h{display:inline-flex;flex-direction:row;align-items:center;justify-content:center;gap:var(--theme-spacing-100);border:1px solid var(--theme-color-stroke-actionable-alt-default);border-radius:var(--theme-radius-150);padding:var(--theme-spacing-150);background-color:var(--theme-color-surface-default);transition:background-color 0.2s ease-in-out,\n    color 0.2s ease-in-out,\n    border-color 0.2s ease-in-out;color:var(--theme-color-text-actionable-alt-default);cursor:pointer}.sc-wdpr-segmented-horizontal-tab-h:not([disabled]):hover{color:var(--theme-color-text-actionable-alt-hover);border-color:var(--theme-color-stroke-actionable-alt-hover)}.sc-wdpr-segmented-horizontal-tab-h:not([disabled]):active{border-color:var(--theme-color-stroke-actionable-alt-pressed);color:var(--theme-color-text-actionable-alt-pressed)}.sc-wdpr-segmented-horizontal-tab-h:not([disabled]):focus-visible{outline:var(--theme-stroke-037) solid var(--theme-color-surface-actionable-focus);outline-offset:2px}[active].sc-wdpr-segmented-horizontal-tab-h{border-color:transparent;background-color:var(--theme-color-surface-actionable-alt-selected);color:var(--theme-color-text-inverse)}[active].sc-wdpr-segmented-horizontal-tab-h:not([disabled]):hover{color:var(--theme-color-text-inverse);background-color:var(--theme-color-surface-actionable-alt-hover)}[active].sc-wdpr-segmented-horizontal-tab-h:not([disabled]):active{color:var(--theme-color-text-inverse);background-color:var(--theme-color-surface-actionable-alt-pressed)}[active].sc-wdpr-segmented-horizontal-tab-h button.segmented-horizontal-tab-button.sc-wdpr-segmented-horizontal-tab:not(:disabled):focus-visible{outline:2px solid var(--theme-color-surface-actionable-focus);outline-offset:2px}[disabled].sc-wdpr-segmented-horizontal-tab-h{color:var(--theme-color-text-disabled);border-color:var(--theme-color-stroke-actionable-alt-disabled);cursor:not-allowed}[active][disabled].sc-wdpr-segmented-horizontal-tab-h{color:var(--theme-color-text-inverse);background-color:var(--theme-color-surface-actionable-alt-disabled)}.segmented-horizontal-tab-icon-wrapper.sc-wdpr-segmented-horizontal-tab{display:flex;align-items:center;justify-content:center;width:100%;height:var(--theme-spacing-250)}.segmented-horizontal-tab-main-label.sc-wdpr-segmented-horizontal-tab{text-align:center;font-family:var(--theme-font-family-default);font-size:var(--theme-typography-font-size-component-medium);font-style:normal;font-weight:var(--theme-typography-font-weight-component-default);line-height:var(--theme-typography-line-height-component-medium-alt);letter-spacing:var(--theme-typography-letter-spacing--05)}";

const WdprSegmentedHorizontalTab = class {
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
    a11yLabel;
    /**
     * Emitted when the tab button is clicked.
     * This is used by the parent wdpr-tab-bar to manage the active state.
     */
    tabClicked;
    _handleClick = () => {
        if (this.disabled) {
            return;
        }
        this.tabClicked.emit({ tabElement: this.el });
    };
    render() {
        return (h(Host, { key: '4691d7ebcf603d739ba63e87461826d80cbe581e', id: this.tabId, role: "tab", tabindex: this.disabled ? -1 : (this.customTabIndex ?? 0), "aria-selected": this.active ? 'true' : 'false', "aria-controls": this.controlsId, "aria-disabled": this.disabled ? 'true' : undefined, "aria-label": this.a11yLabel, onClick: this._handleClick }, this.icon && h("wdpr-icon-library", { key: '164e27312920f51452b736ebad23f917f4a46073', icon: this.icon, size: "medium", decorative: true }), this.label && h("span", { key: 'b3aac18dbaaec0e31e7c5d0d170d88f47215f41f', class: "segmented-horizontal-tab-main-label" }, this.label)));
    }
};
WdprSegmentedHorizontalTab.style = wdprSegmentedHorizontalTabCss;

export { WdprSegmentedHorizontalTab as wdpr_segmented_horizontal_tab };
//# sourceMappingURL=wdpr-segmented-horizontal-tab.entry.js.map

//# sourceMappingURL=wdpr-segmented-horizontal-tab.entry.js.map