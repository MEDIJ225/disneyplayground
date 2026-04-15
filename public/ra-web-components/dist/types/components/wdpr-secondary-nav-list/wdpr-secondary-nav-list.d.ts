import { EventEmitter } from '../../stencil-public-runtime';
import { NavItemSelectableDetail } from '../wdpr-nav-item-selectable/wdpr-nav-item-selectable.model';
export declare class WdprSecondaryNavList {
    el: HTMLWdprSecondaryNavListElement;
    private _internalId;
    listId: string;
    a11yLabel: string;
    listTitle: string;
    wdprSecondaryNavListClick: EventEmitter<string>;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleNavItemSmallClick(event: CustomEvent<string>): void;
    handleNavItemSelectableChange(event: CustomEvent<NavItemSelectableDetail>): void;
    render(): any;
}
