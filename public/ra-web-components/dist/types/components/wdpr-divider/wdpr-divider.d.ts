import { DividerAlignment, DividerOrientation, DividerVariant } from './wdpr-divider.model';
export declare class WdprDivider {
    el: HTMLElement;
    slot: HTMLElement | null;
    orientation: DividerOrientation;
    align: DividerAlignment;
    variant: DividerVariant;
    componentWillLoad(): void;
    private _updateSlot;
    private get strokeVar();
    get separatorClass(): string;
    get separatorStyle(): {
        height: string;
        width?: undefined;
    } | {
        width: string;
        height?: undefined;
    };
    render(): any;
}
