import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprPaginationItem {
    page: number | string;
    selected: boolean;
    disabled: boolean;
    a11yLabel: string;
    wdprClick: EventEmitter<void>;
    private _handleClick;
    render(): any;
}
