'use strict';

var index = require('./index-4gPM_TYz.js');
var keycodes_model = require('./keycodes.model-Bh3huzdF.js');

const wdprTabBarCss = ".sc-wdpr-tab-bar-h{display:block}.tab-bar-container.sc-wdpr-tab-bar{display:flex;align-items:stretch;width:100%;max-width:100%;overflow-x:auto;overflow-y:hidden;padding:var(--theme-spacing-100);box-sizing:border-box}[tab-type='segmented'].sc-wdpr-tab-bar-h .tab-bar-container.sc-wdpr-tab-bar{gap:var(--theme-spacing-100)}";

const WdprTabBar = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.tabChange = index.createEvent(this, "tabChange", 7);
    }
    _initialLoad = true;
    get el() { return index.getElement(this); }
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
            case keycodes_model.KEYBOARD_KEYS.ARROW_RIGHT:
                event.preventDefault();
                newFocusIndex = (newFocusIndex + 1) % this._slotTabs.length;
                break;
            case keycodes_model.KEYBOARD_KEYS.ARROW_LEFT:
                event.preventDefault();
                newFocusIndex = (newFocusIndex - 1 + this._slotTabs.length) % this._slotTabs.length;
                break;
            case keycodes_model.KEYBOARD_KEYS.HOME:
                event.preventDefault();
                newFocusIndex = 0;
                break;
            case keycodes_model.KEYBOARD_KEYS.END:
                event.preventDefault();
                newFocusIndex = this._slotTabs.length - 1;
                break;
            case keycodes_model.KEYBOARD_KEYS.ENTER:
            case keycodes_model.KEYBOARD_KEYS.SPACE:
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
            if (event.key === keycodes_model.KEYBOARD_KEYS.ARROW_RIGHT || event.key === keycodes_model.KEYBOARD_KEYS.HOME) {
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
        return (index.h("div", { role: "tablist", class: "tab-bar-container", "aria-label": this.a11yLabel, onKeyDown: this._handleKeyDown.bind(this) }, index.h("slot", null)));
    }
    static get watchers() { return {
        "hug": ["onHugChange"],
        "activeTab": ["onActiveTabChange"]
    }; }
};
WdprTabBar.style = wdprTabBarCss;

exports.wdpr_tab_bar = WdprTabBar;
//# sourceMappingURL=wdpr-tab-bar.entry.cjs.js.map

//# sourceMappingURL=wdpr-tab-bar.cjs.entry.js.map