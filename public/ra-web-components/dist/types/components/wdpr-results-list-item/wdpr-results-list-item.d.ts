import { EventEmitter } from '../../stencil-public-runtime';
import { ResultsListItemVariant } from './wdpr-results-list-item.model';
export declare class WdprResultsListItem {
    /**
     * Reference to the component's host element.
     */
    el: HTMLElement;
    /**
     * The variant of the list item.
     */
    variant: ResultsListItemVariant;
    /**
     * The primary text label for the list item.
     */
    label: string;
    /**
     * Optional secondary text description (second row).
     */
    description?: string;
    /**
     * Icon name for the label-with-icon variant.
     */
    icon?: string;
    /**
     * Whether the item is selected.
     */
    selected: boolean;
    /**
     * Whether the item is disabled.
     */
    disabled: boolean;
    /**
     * The value associated with this item.
     */
    value: string;
    /**
     * Whether the checkbox is checked (for checkbox variant).
     */
    checked: boolean;
    handleCheckedChange(newValue: boolean): void;
    /**
     * Unique ID for the list item.
     */
    itemId?: string | number;
    /**
     * Whether this item currently has focus (set by parent).
     */
    isFocused: boolean;
    /**
     * Reference to the checkbox element for direct property manipulation.
     */
    private _checkboxEl;
    /**
     * Event emitted when the item is selected/clicked.
     */
    wdprSelect: EventEmitter<{
        id: string | number;
        value: string;
        selected: boolean;
        triggeredByKeyboard: boolean;
    }>;
    /**
     * Event emitted when checkbox state changes.
     */
    wdprChange: EventEmitter<{
        id: string | number;
        value: string;
        checked: boolean;
        triggeredByKeyboard: boolean;
    }>;
    /**
     * Event emitted when keyboard navigation occurs (bubbles to parent).
     */
    wdprKeyDown: EventEmitter<KeyboardEvent>;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    private _preventFocus;
    private _focusSelf;
    /** Tracks if selection was triggered by keyboard (for focus ring handling) */
    private _triggeredByKeyboard;
    private _toggleSelectionFromRow;
    private _handleClick;
    private _handleCheckboxChange;
    private _handleKeyDown;
    private _handleMouseEnter;
    private _handleMouseLeave;
    private _handleMouseDown;
    private _handleMouseUp;
    private get _containerClasses();
    private _renderLabelVariant;
    private _renderLabelWithIconVariant;
    private _renderCheckboxVariant;
    private _renderSlotVariant;
    render(): any;
}
