import { EventEmitter } from '../../stencil-public-runtime';
export type ToggleLabelPosition = 'trailing' | 'leading' | 'none';
export declare class WdprToggle {
    el: HTMLElement;
    private internals;
    private defaultChecked;
    private defaultValue;
    constructor();
    /**
     * Whether the toggle is checked
     */
    checked: boolean;
    /**
     * Whether the toggle is disabled
     */
    disabled: boolean;
    /**
     * Label text for the toggle
     */
    label?: string;
    /**
     * Position of the label relative to the toggle
     */
    labelPosition: ToggleLabelPosition;
    /**
     * Name attribute for form submission
     */
    name?: string;
    /**
     * Value attribute for form submission
     */
    value: string;
    /**
     * Whether the toggle is required
     */
    required: boolean;
    /**
     * ARIA label for accessibility
     */
    toggleAriaLabel?: string;
    /**
     * ARIA description for accessibility
     */
    toggleAriaDescription?: string;
    /**
     * Track if slots have content
     */
    hasCheckedIcon: boolean;
    hasUncheckedIcon: boolean;
    /**
     * Emitted when the toggle state changes
     */
    wdprChange: EventEmitter<{
        checked: boolean;
        value?: string;
    }>;
    private inputId;
    componentWillLoad(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private checkSlotContent;
    checkedChanged(newValue: boolean): void;
    valueChanged(): void;
    requiredChanged(): void;
    disabledChanged(): void;
    private handleFormReset;
    private updateFormValue;
    private updateValidity;
    private emitNativeEvents;
    /**
     * Programmatically toggle the checked state
     */
    toggle(): Promise<void>;
    /**
     * Programmatically focus the toggle
     */
    setFocus(): Promise<void>;
    private handleChange;
    private handleKeyDown;
    private getTrackClasses;
    private getThumbClasses;
    private getIconClasses;
    private getLabelClasses;
    private getContainerClasses;
    render(): any;
}
