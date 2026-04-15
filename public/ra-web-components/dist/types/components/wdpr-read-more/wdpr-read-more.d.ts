export declare class WdprReadMore {
    el: HTMLElement;
    private contentRef;
    /** Show divider line above content */
    showTopDivider: boolean;
    /** Show divider line below content */
    showBottomDivider: boolean;
    /** Whether the content is expanded or collapsed */
    expanded: boolean;
    /** Whether the read more button is disabled */
    disabled: boolean;
    /** Text for the expand button */
    expandLabel: string;
    /** Text for the collapse button */
    collapseLabel: string;
    private _toggleExpanded;
    render(): any;
}
