export type ButtonBarLayout = 'fill' | 'split' | 'stacked' | 'hug';
export declare class WdprButtonBar {
    /**
     * Reference to host element.
     */
    el: HTMLWdprButtonBarElement;
    _hasPrimary: boolean;
    _hasSecondary: boolean;
    _hasTertiary: boolean;
    /**
     * Disables all slotted buttons in the bar.
     * @default false
     */
    disabled: boolean;
    /**
     * Layout mode:
     * - 'split'  : two or three columns (buttons distributed evenly)
     * - 'stacked': always one column (buttons stacked vertically)
     * - 'hug'    : compact layout for one or two buttons
     * - 'fill'   : buttons stretch to fill the available space
     * @default 'split'
     */
    layout: ButtonBarLayout;
    /**
     * When true, buttons stack vertically on mobile viewports for fill, split,
     * and hug layouts. When false, buttons remain side-by-side at all widths.
     * Has no effect on the stacked layout.
     * @default true
     */
    autoStack: boolean;
    _handleDisabledChange(): void;
    _handleLayoutChange(): void;
    componentDidLoad(): void;
    private _getSlotEl;
    private _hasAssignedElements;
    private _syncSlot;
    private _syncAllSlots;
    private _handlePrimarySlotChange;
    private _handleSecondarySlotChange;
    private _handleTertiarySlotChange;
    private get _containerClass();
    private get _rightClass();
    private get _primaryWrapClass();
    private get _secondaryWrapClass();
    private get _tertiaryWrapClass();
    render(): any;
}
