import { EventEmitter } from '../../stencil-public-runtime';
import { DualTextFieldRequirementIndicator } from './wdpr-dual-text-field.model';
export declare class WdprDualTextField {
    /**
     * Reference to the native leading `<input>` element.
     */
    private _leadingInputEl?;
    /**
     * Reference to the native trailing `<input>` element.
     */
    private _trailingInputlEl?;
    private _leadingIconButton?;
    private _trailingIconButton?;
    /**
     * Reference to host element
     * @type {HTMLWdprDualTextFieldElement}
     */
    el: HTMLWdprDualTextFieldElement;
    internals: ElementInternals;
    _internalLeadingInputId: string;
    _internalTrailingInputId: string;
    _leadingFocused: boolean;
    _trailingFocused: boolean;
    /**
     * A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     * @type {string}
     */
    leadingInputId: string;
    leadingValue?: string;
    leadingLabel: string;
    leadingRequirementIndicator: DualTextFieldRequirementIndicator;
    /**
     * A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     * @type {string}
     */
    trailingInputId: string;
    trailingValue?: string;
    trailingLabel: string;
    trailingRequirementIndicator: DualTextFieldRequirementIndicator;
    helperText: string;
    error: boolean;
    disabled: boolean;
    required: boolean;
    leadingName?: string;
    trailingName?: string;
    readonly: boolean;
    a11yRole?: 'button' | 'checkbox' | 'combobox' | 'listbox' | 'menu' | 'menubar' | 'option' | 'radio' | 'searchbox' | 'textbox' | string;
    a11yHasPopup?: 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    a11yControls?: string;
    a11yExpanded?: 'true' | 'false';
    a11yAutoComplete?: 'none' | 'inline' | 'list' | 'both';
    a11yActiveDescendant?: string;
    a11yDisabled?: 'true' | 'false';
    a11yRequired?: 'true' | 'false';
    a11yDescribedBy?: string;
    /**
     * Event emitted when the input changes.
     */
    wdprValueChanged: EventEmitter<{
        leadingValue?: string;
        trailingValue?: string;
    }>;
    /**
     * Event emitted when the input gains focus.
     */
    wdprInputFocus: EventEmitter<unknown>;
    /**
     * Event emitted when the input loses focus.
     */
    wdprInputBlur: EventEmitter<void>;
    /**
     * Event emitted when any input is clicked.
     * The `field` property indicates which input triggered the click: `'leading'` or `'trailing'`.
     */
    wdprInputClick: EventEmitter<{
        field: 'leading' | 'trailing';
    }>;
    /**
     * Event emitted when the trailing icon is clicked
     */
    wdprLeadingIconClick: EventEmitter<void>;
    /**
     * Event emitted when the trailing icon is clicked
     */
    wdprTrailingIconClick: EventEmitter<void>;
    /**
     * Sets focus on the native `<input>` element.
     * Usage: dualTextField.setLeadingFocus();
     */
    setLeadingFocus(): Promise<void>;
    /**
     * Sets focus on the native `<input>` element.
     * Usage: dualTextField.setTrailingFocus();
     */
    setTrailingFocus(): Promise<void>;
    updateDisabledState(): void;
    formPropsChanged(): void;
    componentWillLoad(): void;
    private _updateButtonsDisabledState;
    private _handleLeadingInput;
    private _handleTrailingInput;
    private _updateFormValue;
    private _updateValidity;
    private _emitChange;
    private _handleLeadingInputClick;
    private _handleTrailingInputClick;
    private _handleLeadingFocus;
    private _onLeadingClick;
    private _handleLeadingBlur;
    private _handleTrailingClick;
    private _handleTrailingFocus;
    private _handleTrailingBlur;
    private _handleSlotChange;
    private _requirementLabel;
    render(): any;
}
