import { EventEmitter } from '../../stencil-public-runtime';
export type TabType = 'default' | 'segmented';
export declare class WdprTabBar {
    private _initialLoad;
    el: HTMLWdprTabBarElement;
    private _slotTabs;
    /**
     * The type of the tab bar (default or chippy).
     */
    tabType: TabType;
    /**
     * The index of the currently active tab.
     */
    activeTab: number;
    /**
     * If `true`, the entire tab bar is disabled.
     */
    disabled: boolean;
    /**
     * If `false`, the tabs will grow to fill the available space.
     */
    hug: boolean;
    /**
     * Describes the purpose of the tab group for screen readers.
     */
    a11yLabel: string;
    /**
     * Shows or hide the border bottom of all the inactive tabs
     */
    showInactiveBorderBottom: boolean;
    /**
     * Emitted when the active tab changes.
     */
    tabChange: EventEmitter<{
        tabIndex: number;
    }>;
    onHugChange(): void;
    onActiveTabChange(newIndex: number, oldIndex: number): void;
    handleSlotChange(): void;
    handleTabClickFromSlot(event: CustomEvent<{
        tabElement: HTMLElement;
    }>): void;
    componentWillLoad(): void;
    componentDidRender(): void;
    private _updateTabsFromSlot;
    /**
     * Updates the slotted tabs based on the new active index.
     * Called when the activeTab property changes.
     * @param newIndex The new active index.
     * @param oldIndex The old active index.
     */
    private _updateSlotTabs;
    private _handleClick;
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
    private _handleKeyDown;
    /**
     * Focuses the tab at the given index.
     * If the given index is out of bounds, it will not change the focused element.
     * @param index The index of the tab to focus.
     * @param shouldFocus If `true`, the method will focus the tab after setting the `customTabIndex` to 0.
     */
    private _focusTab;
    render(): any;
}
