import { EventEmitter } from '../../stencil-public-runtime';
import { TextFieldRequirementIndicator, TextFieldType } from './wdpr-text-field.model';
export declare class WdprTextField {
    /**
     * Reference to the native `<input>` element.
     */
    private _nativeInput?;
    private _internals;
    private _defaultValue;
    /**
     * Reference to host element
     * @type {HTMLWdprButtonElement}
     */
    el: HTMLElement;
    internals: ElementInternals;
    /**
     * The internal ID for the component. It is used internally and is not exposed.
     */
    _internalId: string;
    _leadingIcon?: HTMLSlotElement | null;
    _trailingIcon?: HTMLSlotElement | null;
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     */
    inputId: string;
    autocomplete: string;
    name: string;
    maxLength?: number;
    type: TextFieldType;
    value: string;
    helperText: string;
    disabled: boolean;
    error: boolean;
    readonly: boolean;
    customTabindex: number;
    label: string;
    requirementIndicator: TextFieldRequirementIndicator;
    a11yRole?: 'button' | 'checkbox' | 'combobox' | 'listbox' | 'menu' | 'menubar' | 'option' | 'radio' | 'searchbox' | 'textbox' | string;
    a11yHasPopup?: 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
    a11yControls?: string;
    a11yExpanded?: 'true' | 'false';
    a11yAutoComplete?: 'none' | 'inline' | 'list' | 'both';
    a11yActiveDescendant?: string;
    a11yDisabled?: 'true' | 'false';
    a11yRequired?: 'true' | 'false';
    a11yDescribedBy?: string;
    wdprValueChanged: EventEmitter<string>;
    wdprInputFocus: EventEmitter<void>;
    wdprInputBlur: EventEmitter<void>;
    wdprInputClick: EventEmitter<void>;
    wdprLeadingIconClick: EventEmitter<boolean>;
    wdprTrailingIconClick: EventEmitter<{
        value: string;
    }>;
    updateDisabledState(): void;
    _handleValueChange(nextValue: string): void;
    /**
     * Sets focus on the native `<input>` element.
     * Usage: textField.setFocus();
     */
    setFocus(): Promise<void>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private _updateButtonsDisabledState;
    private _handleSlotChange;
    private _handleFormReset;
    private _syncInternals;
    private _getDisplayValue;
    private _syncNativeValue;
    private _emitNativeEvents;
    private _onLeadingClick;
    private _onTrailingClick;
    private _handleInput;
    private _handleFocus;
    private _handleBlur;
    private _handleClick;
    private get _requirementLabel();
    render(): any;
}
