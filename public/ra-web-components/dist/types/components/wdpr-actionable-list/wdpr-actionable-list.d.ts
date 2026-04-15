import { ActionableListItemConfig } from '../wdpr-actionable-list-item/wdpr-actionable-list-item.model';
export declare class WdprActionableList {
    el: HTMLElement;
    items: ActionableListItemConfig[];
    showDivider: boolean;
    private _renderListItem;
    private _renderItems;
    render(): any;
}
