export type SwipeDirection = 'left' | 'right';
export declare class WdprIndicatorDots {
    /** Total number of dots */
    count: number;
    /** Zero-based index of the active dot */
    activeIndex: number;
    /** Maximum number of dots to show at once */
    maxDots: number;
    /** Swipe direction — determines which edge dot is truncated */
    swipeDirection: SwipeDirection;
    /** Accessible label for the indicator */
    a11yLabel: string;
    private get visibleStart();
    private get visibleIndices();
    private isTruncationDot;
    private dotClass;
    render(): any;
}
