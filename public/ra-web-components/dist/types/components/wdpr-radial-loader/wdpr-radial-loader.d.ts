import { RadialLabelPlacement, RadialLoaderSize } from './wdpr-radial-loader.model';
export declare class WdprRadialLoader {
    private animation;
    private container;
    /**
     * Reference to host element
     * @type {HTMLWdprRadialLoaderElement}
     */
    el: HTMLWdprRadialLoaderElement;
    /**
     * The label and aria-label
     */
    label: string;
    showLabel: boolean;
    labelPlacement: RadialLabelPlacement;
    size: RadialLoaderSize;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    get layoutClass(): string;
    get labelClasses(): string;
    render(): any;
}
