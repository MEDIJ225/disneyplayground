import { EventEmitter } from '../../../stencil-public-runtime';
export type InfoIconPseudoState = 'default' | 'hover' | 'pressed' | 'selected';
export declare class WdprInfoIconWithTooltip {
    /**
     * Icon name from the icon library
     */
    icon: string;
    /**
     * Whether the tooltip is currently open (selected state)
     */
    selected: boolean;
    /**
     * Whether to show the tooltip title
     */
    showTitle: boolean;
    /**
     * Whether to show the tooltip body/description
     */
    showDescription: boolean;
    /**
     * ARIA label for the trigger button
     */
    a11yLabel?: string;
    /**
     * ID of the associated tooltip element for aria-describedby
     */
    tooltipId?: string;
    /**
     * Optional visible label next to the icon
     */
    label?: string;
    /**
     * Emitted when the icon is clicked
     */
    infoIconClick: EventEmitter<void>;
    /**
     * Emitted when the icon is hovered / focused
     */
    infoIconHover: EventEmitter<void>;
    /**
     * Emitted when the icon is un-hovered / blurred
     */
    infoIconLeave: EventEmitter<void>;
    private handleClick;
    private handleMouseEnter;
    private handleMouseLeave;
    private handleFocus;
    private handleBlur;
    private getButtonClasses;
    render(): any;
}
