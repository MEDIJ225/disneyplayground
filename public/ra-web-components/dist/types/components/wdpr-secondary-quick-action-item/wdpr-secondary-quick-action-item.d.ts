import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprSecondaryQuickActionItem {
    el: HTMLWdprSecondaryQuickActionItemElement;
    label: string;
    showMedia: boolean;
    showBackground: boolean;
    mediaSrc?: string | null;
    customLabelClass?: string | null;
    disabled?: boolean;
    selected?: boolean;
    itemSelected: EventEmitter<boolean>;
    handleKeyDown(ev: KeyboardEvent): void;
    private get _labelClass();
    private get _colorClass();
    private get _containerClass();
    private get _mediaClass();
    private _itemClick;
    render(): any;
}
