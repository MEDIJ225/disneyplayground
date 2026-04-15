export type TooltipPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center' | 'left' | 'right';
export type TooltipTriggerMode = 'click' | 'hover' | 'click-and-hover';
export type LabelVariant = 'selected' | 'unselected';
export type PseudoState = 'default' | 'hover' | 'active';
export declare class WdprTooltip {
    el: HTMLWdprTooltipElement;
    /**
     * Tooltip position relative to the trigger icon
     */
    position: TooltipPosition;
    /**
     * Optional title for the tooltip
     */
    tooltipTitle?: string;
    /**
     * Description text for the tooltip
     */
    description: string;
    /**
     * Icon to display in the trigger
     */
    icon: string;
    /**
     * Trigger mode: 'click' (click only), 'hover' (hover only), or 'click-and-hover' (both)
     */
    triggerMode: TooltipTriggerMode;
    /**
     * ARIA label for accessibility
     */
    tooltipAriaLabel?: string;
    /**
     * Optional visible label shown next to the trigger icon
     */
    label?: string;
    /**
     * Whether to show the tooltip title
     */
    showTitle: boolean;
    /**
     * Whether to show the tooltip body/description
     */
    showDescription: boolean;
    isVisible: boolean;
    isPinned: boolean;
    private hideTimeout;
    private readonly tooltipId;
    private readonly HIDE_DELAY;
    private get isTitleEnabled();
    private get isDescriptionEnabled();
    private get supportsClick();
    private get supportsHover();
    handleDocumentClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private clearHideTimeout;
    private handleScroll;
    /**
     * Programmatically show the tooltip
     */
    show(): Promise<void>;
    /**
     * Programmatically hide the tooltip
     */
    hide(): Promise<void>;
    private handleIconClick;
    private handleIconHover;
    private handleIconLeave;
    private handleTooltipEnter;
    private handleTooltipLeave;
    private getTooltipClasses;
    private getTooltipPositionClasses;
    private getTooltipInnerClasses;
    private getArrowClasses;
    private getArrowBorderClasses;
    render(): any;
}
