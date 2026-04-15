import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprNavIconButton {
    el: HTMLWdprNavIconButtonElement;
    _internalId: string;
    iconName: string;
    active: boolean;
    inverse: boolean;
    a11yLabel: string;
    controlsId?: string;
    _isOpen: boolean;
    allowKeyboardChevron: boolean;
    wdprNavIconButtonClick: EventEmitter<{
        id: string;
    }>;
    wdprNavIconButtonHover: EventEmitter<{
        id: string;
        value: boolean;
    }>;
    wdprNavIconButtonFocusIn: EventEmitter<{
        id: string;
    }>;
    wdprNavIconButtonPressed: EventEmitter<{
        id: string;
        value: boolean;
    }>;
    componentWillLoad(): void;
    private _blurActiveElement;
    private _getEventId;
    handleKeyDown(ev: KeyboardEvent): void;
    handleMouseEnter(): void;
    handleMouseLeave(): void;
    handleFocusIn(): void;
    handleFocusOut(): void;
    private _onClick;
    private _handleChevronKeyDown;
    render(): any;
}
