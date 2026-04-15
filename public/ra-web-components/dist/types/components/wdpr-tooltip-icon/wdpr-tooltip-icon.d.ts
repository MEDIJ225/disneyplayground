import { EventEmitter } from '../../stencil-public-runtime';
/**
 * @deprecated Use `wdpr-tooltip` instead. `wdpr-tooltip-icon` will be removed in a future major release.
 */
export declare class WdprTooltipIcon {
    componentWillLoad(): void;
    /**
     * Icon name from the icon library
     */
    icon: string;
    /**
     * Whether the tooltip is currently active/showing
     */
    active: boolean;
    ariaLabel: string;
    tooltipId: string;
    /**
     * Emitted when icon is clicked
     */
    tooltipIconClick: EventEmitter<void>;
    /**
     * Emitted when icon is hovered
     */
    tooltipIconHover: EventEmitter<void>;
    /**
     * Emitted when icon is hovered
     */
    tooltipIconLeave: EventEmitter<void>;
    private handleClick;
    private handleMouseEnter;
    private handleMouseLeave;
    private handleFocus;
    private handleBlur;
    private getButtonClasses;
    render(): any;
}
