import { EventEmitter } from '../../../stencil-public-runtime';
export declare class WdprCountryCodeItem {
    private _internalId;
    el: HTMLElement;
    itemId: string;
    value: string;
    label: string;
    callingCode: string;
    isoCode: string;
    disabled: boolean;
    selected: boolean;
    isFocused: boolean;
    isHidden: boolean;
    wdprSelect: EventEmitter<{
        id: string;
        value: string;
        label: string;
        selected: boolean;
        callingCode: string;
        isoCode: string;
    }>;
    componentWillLoad(): void;
    private _handleSelection;
    private get _itemClasses();
    render(): any;
}
