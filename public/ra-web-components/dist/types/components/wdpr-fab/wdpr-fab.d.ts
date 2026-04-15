import { EventEmitter } from '../../stencil-public-runtime';
import type { FABMenuItemConfig } from '../wdpr-fab-menu-item/wdpr-fab-menu-item.model';
import type { FabTriggerSize } from './wdpr-fab-trigger/wdpr-fab-trigger';
export declare class WdprFab {
    el: HTMLElement;
    open: boolean;
    _focusedIndex: number;
    items: FABMenuItemConfig[];
    buttonLabel: string;
    buttonIcon: string;
    backdropBlur: boolean;
    size: FabTriggerSize;
    disabled: boolean;
    itemClickEvent: EventEmitter<FABMenuItemConfig>;
    handleKeyDown(ev: KeyboardEvent): void;
    private _applyFocus;
    private _toggleMenu;
    private _handleItemClick;
    private get _menuBottomClass();
    render(): any;
}
