import { WdprProgressIndicatorPosition, WdprProgressSegmentStatus } from '../../models/progress-bar.model';
export declare class WdprProgressSegment {
    status: WdprProgressSegmentStatus;
    position: WdprProgressIndicatorPosition;
    private get _isFilled();
    private get _bgClass();
    private get _roundingClass();
    private get _terminatorClass();
    render(): any;
}
