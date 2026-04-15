import { EventEmitter } from '../../stencil-public-runtime';
export declare class WdprClusterPin {
    /**
     * The count number displayed in the pin
     */
    count: number;
    selected: boolean;
    a11yLabel: string;
    disabled: boolean;
    wdprClusterPinClick: EventEmitter<{
        selected: boolean;
    }>;
    private _handleClick;
    private get _buttonClasses();
    render(): any;
}
