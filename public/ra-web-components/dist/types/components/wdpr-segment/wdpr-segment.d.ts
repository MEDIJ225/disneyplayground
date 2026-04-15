import { EventEmitter } from '../../stencil-public-runtime';
export type SegmentVariant = 'label-only' | 'icon-label';
export declare class WdprSegment {
    el: HTMLWdprSegmentElement;
    /**
     * The label text for the segment
     */
    label: string;
    /**
     * Icon name to display (when variant is icon-label)
     */
    iconName?: string;
    /**
     * Whether this segment is currently selected
     */
    selected: boolean;
    /**
     * Whether the segment is disabled
     */
    disabled: boolean;
    /**
     * Variant of the segment
     */
    variant: SegmentVariant;
    /**
     * Value associated with this segment
     */
    value?: string;
    /**
     * Index of this segment in the group
     */
    index?: number;
    /**
     * Name for the radio group (all segments in same group share this)
     */
    name?: string;
    /**
     * Unique ID for this segment
     */
    segmentId?: string;
    /**
     * Event emitted when segment is clicked
     */
    segmentClick: EventEmitter<{
        value: string;
        index: number;
    }>;
    /**
     * Focus the segment programmatically
     */
    setFocus(): Promise<void>;
    private _handleClick;
    private _getSegmentClasses;
    private _getLabelClasses;
    render(): any;
}
