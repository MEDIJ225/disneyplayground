import { EventEmitter } from '../../stencil-public-runtime';
import type { FABMenuItemConfig } from './wdpr-fab-menu-item.model';
export declare class WdprFabMenuItem {
    _isHover: boolean;
    _isMousedown: boolean;
    item: FABMenuItemConfig;
    isLast: boolean;
    wdprChange: EventEmitter<FABMenuItemConfig>;
    private _handleClick;
    get textColorClass(): "text-text-default" | "text-text-actionable-alt-disabled" | "text-text-actionable-alt-default";
    private get _labelClasses();
    get menuItemClasses(): string;
    render(): any;
}
