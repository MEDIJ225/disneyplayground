import { EventEmitter } from '../../stencil-public-runtime';
import { NavItemLargeClickDetail } from './wdpr-nav-item-large.model';
export declare class WdprNavItemLarge {
    el: HTMLWdprNavItemLargeElement;
    _internalId: string;
    label: string;
    disabled?: boolean;
    inverse?: boolean;
    allowBoldText?: boolean;
    selected?: boolean;
    itemId?: string;
    href?: string;
    target?: string;
    rel?: string;
    wdprNavItemLargeClick: EventEmitter<NavItemLargeClickDetail>;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    private get _labelClass();
    private get _colorClass();
    private get _containerClass();
    private get _isNavLink();
    private get _anchorClass();
    private _itemClick;
    private _onLinkClick;
    render(): any;
}
