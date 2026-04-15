import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprNavMenuButton {
    el: HTMLWdprNavMenuButtonElement;
    _internalId: string;
    label: string;
    active: boolean;
    allowKeyboardChevron: boolean;
    controlsId?: string;
    inverse: boolean;
    _isOpen: boolean;
    wdprNavMenuButtonClick: EventEmitter<{
        id: string;
    }>;
    wdprNavMenuButtonHover: EventEmitter<{
        id: string;
        value: boolean;
    }>;
    wdprNavMenuButtonFocusIn: EventEmitter<{
        id: string;
    }>;
    wdprNavMenuButtonPressed: EventEmitter<{
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
