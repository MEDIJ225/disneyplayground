import { WdprProgressBarSegmentedStep } from '../../models/progress-bar.model';
export declare class WdprProgressBarSegmented {
    el: HTMLWdprProgressBarSegmentedElement;
    steps: WdprProgressBarSegmentedStep[];
    label: boolean;
    labelText?: string;
    private _getPosition;
    private _getDerivedStatus;
    private get _barLabel();
    render(): any;
}
