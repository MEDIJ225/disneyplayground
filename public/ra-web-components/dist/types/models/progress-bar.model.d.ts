export type WdprProgressIndicatorPosition = 'start' | 'middle' | 'end';
export type WdprProgressSegmentStatus = 'pending' | 'active' | 'complete';
export interface WdprProgressBarSegmentedStep {
    status?: WdprProgressSegmentStatus;
}
