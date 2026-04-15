import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprAccordion {
    el: HTMLElement;
    private _internalId;
    iconPosition: 'leading' | 'trailing';
    expanded: boolean;
    header: string;
    subheader: string;
    size: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large';
    showTopDivider: boolean;
    showBottomDivider: boolean;
    accordionId?: string;
    a11yLabel: string;
    expandedChanged: EventEmitter<{
        expanded: boolean;
    }>;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    /**
     * When the accordion is expanded by user interaction, focus the first focusable element inside the accordion content.
     * Uses a timeout to ensure the content is rendered before trying to focus.
     */
    private _focusContentOnExpand;
    private _handleClickEvent;
    private _handleKeyDown;
    private _focusFirstSlotElement;
    private get _titleClass();
    private get _subheaderClass();
    private get _iconSize();
    private get _accordionHeaderClass();
    private get _accordionContentClass();
    render(): any;
}
