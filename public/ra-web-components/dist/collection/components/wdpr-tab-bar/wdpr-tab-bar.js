import { h } from "@stencil/core";
import { KEYBOARD_KEYS } from "../../models/keycodes.model";
export class WdprTabBar {
    _initialLoad = true;
    el;
    _slotTabs = [];
    /**
     * The type of the tab bar (default or chippy).
     */
    tabType = 'default';
    /**
     * The index of the currently active tab.
     */
    activeTab = 0;
    /**
     * If `true`, the entire tab bar is disabled.
     */
    disabled = false;
    /**
     * If `false`, the tabs will grow to fill the available space.
     */
    hug = true;
    /**
     * Describes the purpose of the tab group for screen readers.
     */
    a11yLabel;
    /**
     * Shows or hide the border bottom of all the inactive tabs
     */
    showInactiveBorderBottom = true;
    /**
     * Emitted when the active tab changes.
     */
    tabChange;
    onHugChange() {
        if (this._slotTabs.length > 0) {
            this._slotTabs.forEach(tab => (tab.grow = !this.hug));
        }
    }
    onActiveTabChange(newIndex, oldIndex) {
        if (this._slotTabs.length > 0) {
            this._updateSlotTabs(newIndex, oldIndex);
        }
        this.tabChange.emit({ tabIndex: newIndex });
    }
    handleSlotChange() {
        this._updateTabsFromSlot();
    }
    handleTabClickFromSlot(event) {
        event.stopImmediatePropagation();
        const tabElement = event.detail.tabElement;
        const index = this._slotTabs.indexOf(tabElement);
        if (index !== -1) {
            this._handleClick(index);
        }
    }
    componentWillLoad() {
        this._updateTabsFromSlot();
    }
    componentDidRender() {
        if (this._initialLoad && this._slotTabs.length > 0) {
            this._focusTab(this.activeTab, false);
            this._initialLoad = false;
        }
    }
    _updateTabsFromSlot() {
        const slotElements = Array.from(this.el.children).filter(el => el.tagName.endsWith('-TAB'));
        this._slotTabs = slotElements;
        if (this._slotTabs.length > 0) {
            this._updateSlotTabs(this.activeTab, -1);
        }
    }
    /**
     * Updates the slotted tabs based on the new active index.
     * Called when the activeTab property changes.
     * @param newIndex The new active index.
     * @param oldIndex The old active index.
     */
    _updateSlotTabs(newIndex, oldIndex) {
        this._slotTabs.forEach((tab, index) => {
            tab.active = index === newIndex;
            tab.disabled = tab.disabled || this.disabled;
            tab.customTabIndex = index === newIndex ? 0 : -1;
            if ('grow' in tab) {
                tab.grow = !this.hug;
            }
            if ('showInactiveBorderBottom' in tab) {
                tab.showInactiveBorderBottom = this.showInactiveBorderBottom;
            }
            const ID_PREFIX = `tab-content-`;
            const LABEL_PREFIX = `tab-label-`;
            tab.tabId = `${LABEL_PREFIX}${index}`;
            tab.controlsId = `${ID_PREFIX}${index}`;
        });
        if (oldIndex !== -1) {
            this._focusTab(newIndex);
        }
    }
    _handleClick(index) {
        const tab = this._slotTabs[index];
        if (this.disabled || tab.disabled) {
            return;
        }
        if (this.activeTab !== index) {
            this.activeTab = index;
        }
    }
    /**
     * Handles the keyboard navigation events for the tab bar.
     *
     * This method is responsible for handling the following keys:
     *   - ArrowRight: Move focus to the next tab.
     *   - ArrowLeft: Move focus to the previous tab.
     *   - Home: Move focus to the first tab.
     *   - End: Move focus to the last tab.
     *   - Enter/Space: Select the currently focused tab.
     *
     * If the newly focused tab is disabled, it will skip over it until it finds a tab that is not disabled.
     *
     * @param event - The keyboard event to handle.
     */
    _handleKeyDown(event) {
        if (this.disabled || this._slotTabs.length === 0) {
            return;
        }
        const currentFocusedIndex = this._slotTabs.findIndex(tab => tab.customTabIndex === 0);
        let newFocusIndex = currentFocusedIndex !== -1 ? currentFocusedIndex : this.activeTab;
        switch (event.key) {
            case KEYBOARD_KEYS.ARROW_RIGHT:
                event.preventDefault();
                newFocusIndex = (newFocusIndex + 1) % this._slotTabs.length;
                break;
            case KEYBOARD_KEYS.ARROW_LEFT:
                event.preventDefault();
                newFocusIndex = (newFocusIndex - 1 + this._slotTabs.length) % this._slotTabs.length;
                break;
            case KEYBOARD_KEYS.HOME:
                event.preventDefault();
                newFocusIndex = 0;
                break;
            case KEYBOARD_KEYS.END:
                event.preventDefault();
                newFocusIndex = this._slotTabs.length - 1;
                break;
            case KEYBOARD_KEYS.ENTER:
            case KEYBOARD_KEYS.SPACE:
                event.preventDefault();
                if (currentFocusedIndex !== -1) {
                    this._handleClick(currentFocusedIndex);
                }
                return;
            default:
                return;
        }
        const originalIndex = newFocusIndex;
        while (this._slotTabs[newFocusIndex].disabled) {
            if (event.key === KEYBOARD_KEYS.ARROW_RIGHT || event.key === KEYBOARD_KEYS.HOME) {
                newFocusIndex = (newFocusIndex + 1) % this._slotTabs.length;
            }
            else {
                newFocusIndex = (newFocusIndex - 1 + this._slotTabs.length) % this._slotTabs.length;
            }
            if (newFocusIndex === originalIndex)
                return;
        }
        this._focusTab(newFocusIndex);
    }
    /**
     * Focuses the tab at the given index.
     * If the given index is out of bounds, it will not change the focused element.
     * @param index The index of the tab to focus.
     * @param shouldFocus If `true`, the method will focus the tab after setting the `customTabIndex` to 0.
     */
    _focusTab(index, shouldFocus = true) {
        const elements = this._slotTabs;
        const currentFocusedElement = elements.find(el => el.customTabIndex === 0);
        if (currentFocusedElement) {
            currentFocusedElement.customTabIndex = -1;
        }
        const newFocusedElement = elements[index];
        if (newFocusedElement) {
            newFocusedElement.customTabIndex = 0;
            if (shouldFocus) {
                newFocusedElement.focus();
            }
        }
    }
    render() {
        if (this._slotTabs.length === 0) {
            return null;
        }
        return (h("div", { role: "tablist", class: "tab-bar-container", "aria-label": this.a11yLabel, onKeyDown: this._handleKeyDown.bind(this) }, h("slot", null)));
    }
    static get is() { return "wdpr-tab-bar"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["wdpr-tab-bar.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["wdpr-tab-bar.css"]
        };
    }
    static get properties() {
        return {
            "tabType": {
                "type": "string",
                "attribute": "tab-type",
                "mutable": true,
                "complexType": {
                    "original": "TabType",
                    "resolved": "\"default\" | \"segmented\"",
                    "references": {
                        "TabType": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-tab-bar/wdpr-tab-bar.tsx",
                            "id": "src/components/wdpr-tab-bar/wdpr-tab-bar.tsx::TabType"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The type of the tab bar (default or chippy)."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'default'"
            },
            "activeTab": {
                "type": "number",
                "attribute": "active-tab",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The index of the currently active tab."
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "0"
            },
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
                    "tags": [],
                    "text": "If `true`, the entire tab bar is disabled."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "hug": {
                "type": "boolean",
                "attribute": "hug",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `false`, the tabs will grow to fill the available space."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Describes the purpose of the tab group for screen readers."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "showInactiveBorderBottom": {
                "type": "boolean",
                "attribute": "show-inactive-border-bottom",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Shows or hide the border bottom of all the inactive tabs"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            }
        };
    }
    static get states() {
        return {
            "_slotTabs": {}
        };
    }
    static get events() {
        return [{
                "method": "tabChange",
                "name": "tabChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the active tab changes."
                },
                "complexType": {
                    "original": "{ tabIndex: number }",
                    "resolved": "{ tabIndex: number; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "hug",
                "methodName": "onHugChange"
            }, {
                "propName": "activeTab",
                "methodName": "onActiveTabChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "slotchange",
                "method": "handleSlotChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "tabClicked",
                "method": "handleTabClickFromSlot",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-tab-bar.js.map
