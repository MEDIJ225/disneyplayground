import { EventEmitter } from '../../stencil-public-runtime';
import { ButtonVariants } from '../../models/variant.types';
export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large';
export type ButtonType = 'button' | 'submit' | 'reset';
export type PseudoStates = 'default' | 'hover' | 'focus' | 'active' | 'disabled';
export type ButtonDisplay = 'fit' | 'block';
export declare class WdprButton {
    private leadingIcon;
    private trailingIcon;
    private nativeButton?;
    el: HTMLWdprButtonElement;
    type: ButtonType;
    display: ButtonDisplay;
    size: ButtonSize;
    variant: ButtonVariants;
    disabled: boolean;
    a11yLabel: string;
    /**
     * Optional form name applied when submitting.
     */
    name?: string;
    /**
     * Value included during form submission when `type="submit"`.
     */
    value?: string;
    internals: ElementInternals;
    handleDisabledChange(newValue: boolean): void;
    handleTypeChange(): void;
    handleValueChange(): void;
    handleNameChange(): void;
    wdprClick: EventEmitter<boolean>;
    wdprDisabledChange: EventEmitter<boolean>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private _handleSubmit;
    private _updateFormValue;
    private _handleFormReset;
    private get _layoutClasses();
    private _getIconClass;
    private get _labelClass();
    private get _buttonClass();
    private get _getLeadingIconClass();
    private get _getTrailingIconClass();
    private _handleClick;
    render(): any;
}
