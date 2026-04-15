import { h, Host } from "@stencil/core";
import { propagateToSlot } from "../../utils/utils";
const SLOT_SELECTORS = {
    'primary-button': 'slot[name="primary-button"]',
    'secondary-button': 'slot[name="secondary-button"]',
    'tertiary-button': 'slot[name="tertiary-button"]',
};
export class WdprButtonBar {
    /**
     * Reference to host element.
     */
    el;
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
        propagateToSlot(slotEl, 'disabled', this.disabled, 'wdpr-button');
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
        return (h(Host, { key: '332f0003f1b1d4314f9cf5c2a01230bb8d71ed96', role: "group", "aria-disabled": this.disabled ? 'true' : 'false' }, h("div", { key: 'df3b88f23c4bb32cafd4d36eef71ae79332a8e44', class: this._containerClass }, this.layout === 'split' && (h("div", { key: '4f7ca4b40628fcc98395b25dd23c1e1543c06927', class: this._tertiaryWrapClass }, h("slot", { key: '5671b5889704607a7c61eebfa521c583d6ee6a1b', name: "tertiary-button", onSlotchange: this._handleTertiarySlotChange }))), h("div", { key: '5ba328c9b3be5d5c6b23aa1a45d32e46f1851d04', class: this._rightClass }, h("div", { key: '646022fc2ec394a89ba0a1cf5cd19e801a51fe6e', class: this._secondaryWrapClass }, h("slot", { key: '6507a83bec29e56f443ac9927f8fc82a8b6ff63d', name: "secondary-button", onSlotchange: this._handleSecondarySlotChange })), h("div", { key: '4f04f2a81340e37421edec393e3bc2aa173ede3b', class: this._primaryWrapClass }, h("slot", { key: 'afddd7898b143dd58324d19a298de3028073ce86', name: "primary-button", onSlotchange: this._handlePrimarySlotChange }))))));
    }
    static get is() { return "wdpr-button-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "false"
                        }],
                    "text": "Disables all slotted buttons in the bar."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "layout": {
                "type": "string",
                "attribute": "layout",
                "mutable": false,
                "complexType": {
                    "original": "ButtonBarLayout",
                    "resolved": "\"fill\" | \"hug\" | \"split\" | \"stacked\"",
                    "references": {
                        "ButtonBarLayout": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-button-bar/wdpr-button-bar.tsx",
                            "id": "src/components/wdpr-button-bar/wdpr-button-bar.tsx::ButtonBarLayout"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "'split'"
                        }],
                    "text": "Layout mode:\n- 'split'  : two or three columns (buttons distributed evenly)\n- 'stacked': always one column (buttons stacked vertically)\n- 'hug'    : compact layout for one or two buttons\n- 'fill'   : buttons stretch to fill the available space"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'split'"
            },
            "autoStack": {
                "type": "boolean",
                "attribute": "auto-stack",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "default",
                            "text": "true"
                        }],
                    "text": "When true, buttons stack vertically on mobile viewports for fill, split,\nand hug layouts. When false, buttons remain side-by-side at all widths.\nHas no effect on the stacked layout."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "_hasPrimary": {},
            "_hasSecondary": {},
            "_hasTertiary": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "_handleDisabledChange"
            }, {
                "propName": "layout",
                "methodName": "_handleLayoutChange"
            }];
    }
}
//# sourceMappingURL=wdpr-button-bar.js.map
