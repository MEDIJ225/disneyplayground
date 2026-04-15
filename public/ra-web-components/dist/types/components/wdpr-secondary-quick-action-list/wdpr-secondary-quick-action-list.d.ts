import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprSecondaryQuickActionList {
    el: HTMLWdprSecondaryQuickActionListElement;
    private _internalId;
    listId: string;
    a11yLabel: string;
    listTitle: string;
    wdprSecondaryQuickActionListClick: EventEmitter<string>;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleNavItemMediumClick(event: CustomEvent<string>): void;
    render(): any;
}
