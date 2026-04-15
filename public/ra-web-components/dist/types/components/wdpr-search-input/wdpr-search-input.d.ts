import { EventEmitter } from '../../stencil-public-runtime';
export type PseudoStates = 'default' | 'hover' | 'focus';
export declare class WdprSearchInput {
    el: HTMLWdprSearchInputElement;
    private _internals;
    private _nativeInput?;
    private _defaultValue;
    private _internalId;
    /**
     * (Optional) The hardcoded value for the input field. If provided, it will override the internal state.
     * This is useful for controlled components where the value is managed externally.
     */
    inputHardcodedValue: string;
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     */
    inputId: string;
    showLeadingIcon: boolean;
    value: string;
    name: string;
    disabled: boolean;
    customTabindex: number;
    label: string;
    valueChanged: EventEmitter<string>;
    inputFocus: EventEmitter<void>;
    inputBlur: EventEmitter<void>;
    inputClick: EventEmitter<void>;
    leadingClick: EventEmitter<boolean>;
    trailingClick: EventEmitter<boolean>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentDidLoad(): void;
    handleValueChanged(newValue: string): void;
    handleInputHardcodedValueChange(newValue: string): void;
    handleFormPropsChanged(): void;
    private _handleFormReset;
    private _updateFormValue;
    private _syncNativeValue;
    private _emitNativeEvents;
    private _onLeadingClick;
    private _onTrailingClick;
    private _handleInput;
    private _handleFocus;
    private _handleBlur;
    private _handleClick;
    private get _textFieldClass();
    private get _labelClass();
    componentWillLoad(): void;
    render(): any;
}
