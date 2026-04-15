import { EventEmitter } from '../../stencil-public-runtime';
import { TileBackgroundIcon, TileOrientation, TileVisualContent } from './wdpr-tile.model';
import { StringBoolean } from '../wdpr-text-area/wdpr-text-field.model';
export declare class WdprTile {
    el: HTMLWdprTileElement;
    _hasAvatarGroup: boolean;
    _internalId: string;
    label: string;
    disabled: boolean;
    visualContent: TileVisualContent;
    roleType?: 'button' | 'link';
    iconJustified: boolean;
    secondaryLabel?: string | null;
    iconName?: string;
    mediaSrc?: string;
    orientation: TileOrientation;
    fullWidth?: StringBoolean | boolean;
    backgroundIcon: TileBackgroundIcon;
    tileId?: string;
    showNotificationIcon?: boolean;
    navigationPath?: string;
    a11yLabel: string;
    a11yIconLabel?: string;
    wdprClick: EventEmitter<{
        tileElement: unknown;
        navigationPath?: string;
    }>;
    componentWillLoad(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    get _baseClasses(): string;
    get _disabledClasses(): string;
    get _defaultClasses(): string;
    get _customClass(): string;
    get _iconClass(): string;
    private _onPress;
    private _onKeyDown;
    render(): any;
}
