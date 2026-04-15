import { EventEmitter } from '../../stencil-public-runtime';
export type PageHeaderBackground = 'transparent' | 'primary' | 'secondary' | 'media' | 'translucent';
type SlotKey = 'leading' | 'trailing' | 'middle' | 'below';
export declare class WdprPageHeader {
    slots: Record<SlotKey, boolean>;
    private leadingIconSlot;
    private trailingIconSlot;
    private middleSlot;
    private belowSlot;
    /**
     * Reference to host element
     */
    el: HTMLElement;
    /**
     * The title text to be displayed in the header.
     */
    titleText: string;
    /**
     * Controls the aria-live attribute for the title text.
     */
    ariaLiveMode?: 'off' | 'polite' | 'assertive';
    sticky: boolean;
    background: PageHeaderBackground;
    showElevation: boolean;
    /**
     * If true, sets the content color to inverse (light text) for dark backgrounds.
     */
    inverse: boolean;
    /**
     * On left icon click event
     */
    leadingClick: EventEmitter<boolean>;
    /**
     * On right icon click event
     */
    trailingClick: EventEmitter<boolean>;
    private _slotHasContent;
    private _setSlot;
    private _onClickLeadingIcon;
    private _onClickTrailingIcon;
    private _getContainerClass;
    private _getContainerStyle;
    componentWillLoad(): void;
    render(): any;
}
export {};
