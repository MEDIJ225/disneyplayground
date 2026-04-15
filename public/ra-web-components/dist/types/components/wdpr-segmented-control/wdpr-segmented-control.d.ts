import { EventEmitter } from '../../stencil-public-runtime';
import { SegmentedControlOption } from './wdpr-segmented-control.model';
export declare class WdprSegmentedControl {
    el: HTMLWdprSegmentedControlElement;
    internals: ElementInternals;
    /**
     * Array of segment options (for programmatic creation)
     */
    options?: SegmentedControlOption[];
    /**
     * Currently selected value
     */
    value?: string;
    /**
     * Default selected value
     */
    defaultValue?: string;
    /**
     * Whether to use icon variant for all segments
     */
    withIcons: boolean;
    /**
     * Name attribute for form submission and radio group
     */
    name?: string;
    /**
     * Aria label for the segmented control (radio group label)
     */
    a11yLabel: string;
    /**
     * Whether the entire control is disabled
     */
    disabled: boolean;
    /**
     * Whether the control is required for form validation
     */
    required: boolean;
    /**
     * Size of the control: 'hug' fits the content, 'fill' takes full width
     */
    size: 'hug' | 'fill';
    /**
     * Helper text for the radio group
     */
    helperText?: string;
    /**
     * Internal state for selected index
     */
    selectedIndex: number;
    /**
     * Event emitted when selection changes
     */
    segmentChange: EventEmitter<{
        value: string;
        index: number;
    }>;
    private _segments;
    private _groupId;
    private _helperTextId;
    private _defaultValue?;
    constructor();
    valueChanged(newValue: string): void;
    optionsChanged(): void;
    disabledChanged(newValue: boolean): void;
    nameChanged(): void;
    requiredChanged(): void;
    componentWillLoad(): void;
    componentDidRender(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    handleSegmentClick(event: CustomEvent<{
        value: string;
        index: number;
    }>): void;
    private _initializeSegments;
    private _selectSegment;
    private _handleFormReset;
    private _updateFormValue;
    private _updateValidity;
    private _updateSelectedSegment;
    private _handleKeyDown;
    /**
     * Focus the selected segment
     */
    setFocus(): Promise<void>;
    private _getContainerClasses;
    private _getSegmentsContainerClasses;
    private _renderSegments;
    render(): any;
}
