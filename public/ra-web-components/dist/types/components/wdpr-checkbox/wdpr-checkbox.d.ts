import { EventEmitter } from '../../stencil-public-runtime';
import { IndeterminateClickCycle, LabelPosition } from './wdpr-checkbox.model';
export declare class WdprCheckbox {
    private defaultChecked;
    private defaultIndeterminate;
    private defaultValue;
    /**
     * Reference to the native `<input>` element.
     */
    private inputEl?;
    internals: ElementInternals;
    /**
     * Reference to the component's host element.
     * @type {HTMLWdprCheckboxElement}
     */
    el: HTMLWdprCheckboxElement;
    private internalId;
    /**
     * (Optional) A unique ID for the component. It is essential for accessibility,
     * as it connects the `<label>` to the `<input>` control.
     * If not provided, a random ID will be generated.
     */
    inputId: string;
    /**
     * Name used when participating in form submission.
     */
    name: string;
    /**
     * The cycle behavior when the user clicks on an indeterminate checkbox.
     * If set to `checked`, the checkbox will be set to checked when clicked.
     * If set to `unchecked`, the checkbox will be set to unchecked when clicked.
     */
    cycleOnIndeterminateClick: IndeterminateClickCycle;
    /**
     * The tab index for keyboard navigation. Defaults to `0` for focusable elements.
     */
    customTabindex: number;
    /**
     * The label text for the checkbox.
     */
    label: string;
    /**
     * Provides an accessible name for the checkbox, by default the label is the aria label
     */
    customAriaLabel: string;
    /**
     * References the `id` of an external element to use as the accessible name for the checkbox.
     * Use this when the label is rendered outside the component (e.g. a styled heading).
     * Takes precedence over `a11y-label` and the default label association.
     */
    customAriaLabelledBy: string;
    /**
     * Defines the label's position relative to the checkbox.
     * `trailing`: Checkbox on the left, label on the right (default).
     * `leading`: Label on the left, checkbox on the right.
     * `none`: the label is visually hidden but remains accessible to screen readers.
     */
    labelPosition: LabelPosition;
    /**
     * If `true`, displays the checkbox in an error state.
     */
    error: boolean;
    /**
     * An optional error message to be displayed and announced by screen readers.
     */
    errorMessage: string;
    /**
     * If `true`, the checkbox is read-only. The user can focus on it but not change its state.
     */
    readonly: boolean;
    /**
     * The checked state of the checkbox.
     */
    checked: boolean;
    handleCheckedChange(newValue: boolean): void;
    /**
     * The indeterminate state of the checkbox. This takes precedence over `checked`.
     */
    indeterminate: boolean;
    handleIndeterminateChange(newValue: boolean): void;
    /**
     * The value submitted with forms when the checkbox is checked.
     */
    value: string;
    handleValueChange(): void;
    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    required: boolean;
    handleRequiredChange(): void;
    /**
     * If `true`, the user cannot interact with the checkbox.
     */
    disabled: boolean;
    handleDisabledChange(): void;
    /**
     * If `true`, forces the checkbox to display its hover state.
     * Useful when parent components need to control hover appearance.
     */
    forceHover: boolean;
    /**
     * If `true`, forces the checkbox to display its active/pressed state.
     * Useful when parent components need to control pressed appearance.
     */
    forceActive: boolean;
    /**
     * Event emitted when the checkbox value changes.
     * Emits an object with the new state details `{ checked: boolean, indeterminate: boolean }`.
     */
    wdprChange: EventEmitter<{
        checked: boolean;
        indeterminate: boolean;
    }>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    /**
     * Sets focus on the native `<input>` element.
     * Usage: checkbox.setFocus();
     */
    setFocus(): Promise<void>;
    /**
     * Synchronizes the `indeterminate` property of the native `<input>` element,
     * as it cannot be set via an HTML attribute.
     */
    private updateNativeIndeterminateState;
    private handleFormReset;
    private updateFormValue;
    private updateValidity;
    private emitNativeEvents;
    /**
     * Handles the change event for the native `<input>` element.
     */
    private handleInputChange;
    /**
     * Calculates the value for the `aria-checked` attribute.
     */
    private getAriaChecked;
    get wrapperClass(): string;
    get fakeCheckboxClass(): string;
    get labelClass(): string;
    render(): any;
}
