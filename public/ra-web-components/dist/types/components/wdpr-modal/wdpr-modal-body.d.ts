export type ModalVariant = 'default' | 'default-alt';
export declare class WdprModalBody {
    el: HTMLElement;
    /** Visual variant of the body. 'default-alt' uses alternate background color. */
    variant: ModalVariant;
    calculatedHeight: string | null;
    private resizeObserver;
    private mutationObserver;
    private calculateTimeout;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    private debouncedCalculateHeight;
    private calculateHeight;
    render(): any;
}
