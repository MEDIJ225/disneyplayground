import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprNavLoginButton {
    el: HTMLWdprNavLoginButtonElement;
    _internalId: string;
    _labelMeasureText: string;
    active: boolean;
    allowKeyboardChevron: boolean;
    inverse: boolean;
    _isOpen: boolean;
    a11yLabel: string;
    loggedIn: boolean;
    iconName: string;
    avatarSrc: string;
    avatarAlt: string;
    wdprNavLoginClick: EventEmitter<{
        id: string;
    }>;
    wdprNavLoginHover: EventEmitter<{
        id: string;
        value: boolean;
    }>;
    wdprNavLoginFocusIn: EventEmitter<{
        id: string;
    }>;
    wdprNavLoginPressed: EventEmitter<{
        id: string;
        value: boolean;
    }>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    private _blurActiveElement;
    private _getEventId;
    handleKeyDown(ev: KeyboardEvent): void;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    handleFocusIn(): void;
    handleFocusOut(): void;
    private _handleClick;
    private _syncLabelMeasureText;
    private get _buttonClasses();
    private get _labelSlotClasses();
    private get _avatarGroupClasses();
    private _handleChevronKeyDown;
    render(): any;
}
