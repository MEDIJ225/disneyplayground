import { EventEmitter } from '../../../stencil-public-runtime';
export type FabTriggerSize = 'medium' | 'large';
export declare class WdprFabTrigger {
    el: HTMLWdprFabTriggerElement;
    open: boolean;
    size: FabTriggerSize;
    label: string;
    icon: string;
    disabled: boolean;
    closeA11yLabel: string;
    /**
     * Emitted when the FAB trigger is toggled
     */
    wdprToggle: EventEmitter<void>;
    private _handleToggle;
    private get _iconSize();
    private get _closedButtonClass();
    private get _iconButtonClass();
    render(): any;
}
