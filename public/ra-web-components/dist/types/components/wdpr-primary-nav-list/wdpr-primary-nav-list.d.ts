import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprPrimaryNavList {
    el: HTMLWdprPrimaryNavListElement;
    private _internalId;
    listId: string;
    a11yLabel: string;
    listTitle: string;
    wdprPrimaryNavListClick: EventEmitter<string>;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleNavItemLargeClick(event: CustomEvent<string>): void;
    render(): any;
}
