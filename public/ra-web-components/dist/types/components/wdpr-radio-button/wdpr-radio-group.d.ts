import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprRadioGroup {
    el: HTMLWdprRadioGroupElement;
    private internals;
    private defaultValue;
    private radioOriginalDisabledStates;
    constructor();
    value: string | null;
    disabled: boolean;
    ariaLabel: string;
    name?: string;
    required: boolean;
    wdprChange: EventEmitter<string>;
    radioButtons: HTMLWdprRadioButtonElement[];
    cardMicroElements: HTMLWdprCardMicroElement[];
    private collectRadios;
    private _collectCardMicros;
    handleValueChanged(): void;
    handleDisabledChanged(): void;
    handleRequiredChanged(): void;
    componentWillLoad(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentDidLoad(): void;
    /**
     * Ensures at least one radio button has tabindex="0".
     * Retries a few times with delays to handle shadow DOM timing issues.
     */
    private _ensureTabindexSet;
    private updateRadios;
    private handleFormReset;
    private updateFormValue;
    private updateValidity;
    private emitNativeEvents;
    private _handleSlotChange;
    handleRadioSelect(ev: CustomEvent<string>): void;
    private findNextEnabledIndex;
    private activateRadio;
    private focusNext;
    private focusNextCardMicro;
    private onPressSpace;
    private handleKeyDown;
    render(): any;
}
