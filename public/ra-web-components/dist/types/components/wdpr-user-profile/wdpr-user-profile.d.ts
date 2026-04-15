import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprUserProfile {
    el: HTMLElement;
    userName: string;
    hubId: string;
    initials: string;
    imageSrc?: string;
    disabled: boolean;
    statusMessage?: string;
    settingsHref: string;
    showNotification: boolean;
    notificationLabel: string;
    _badgeSvg: string;
    _hasActionSlotContent: boolean;
    signOutClicked: EventEmitter<void>;
    userSettingsClicked: EventEmitter<void>;
    componentDidLoad(): void;
    componentWillLoad(): Promise<void>;
    private _renderAvatar;
    private _renderIdentity;
    private _handleSignOutClick;
    private _handleUserSettingsClick;
    render(): any;
}
