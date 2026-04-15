import { EventEmitter } from '../../stencil-public-runtime';
import { NavItemMediumMediaSize, NavItemMediumMediaType, NavItemMediumClickDetail } from './wdpr-nav-item-medium.model';
export declare class WdprNavItemMedium {
    el: HTMLWdprNavItemMediumElement;
    private _hasMedia;
    private _internalId;
    private _isTwoLineClamp;
    /**
     * Size of the media element (only applies when mediaType is 'image')
     */
    mediaSize: NavItemMediumMediaSize;
    /**
     * Optional prop for custom label styling
     * Consistency across media types, as icons may require different label styling than images
     */
    customLabelClass: string;
    allowBoldText: boolean;
    label: string;
    mediaType: NavItemMediumMediaType;
    disabled: boolean;
    inverse?: boolean;
    itemId?: string;
    a11yLabel?: string;
    href?: string;
    target?: string;
    rel?: string;
    wdprNavItemMediumClick: EventEmitter<NavItemMediumClickDetail>;
    private _labelElement?;
    private _resizeObserver?;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleWindowResize(): void;
    private get _containerClass();
    private get _accessibleLabel();
    private get _isNavLink();
    private get _anchorClass();
    private get _labelClass();
    private get _mediaClass();
    private _updateSlots;
    private _updateClampState;
    private _onClick;
    private _onLinkClick;
    private _renderMedia;
    render(): any;
}
