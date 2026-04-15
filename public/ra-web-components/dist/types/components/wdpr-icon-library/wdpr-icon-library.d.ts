import { IconLibrarySize } from './wdpr-icon-library.model';
export declare class WdprIconLibrary {
    /**
     * The host element
     */
    el: HTMLElement;
    /**
     * Icon Name
     */
    icon: string;
    /**
     * Icon size
     */
    size?: IconLibrarySize;
    /**
     * Icon title
     */
    ariaTitle: string;
    /**
     * Icon description
     */
    ariaDescription: string;
    /**
     * Accessible name for the icon (used for aria-label). Overrides ariaTitle.
     */
    a11yLabel: string;
    /**
     * If true, the icon is marked as decorative (aria-hidden="true") and ignores all other ARIA props.
     */
    decorative: boolean;
    private svgContent;
    private error;
    /**
     * TODO remove this mapping when final classes in place
     * Map size prop to Tailwind classes
     */
    private sizeClasses;
    get iconClass(): string;
    render(): any;
    componentWillLoad(): Promise<void>;
    private loadIconPathData;
    processSvg(svg: string): string;
    replaceFillWithCurrentColor(element: any): void;
    addAccessibilityAttributes(svgElement: SVGElement): void;
    renderErrorIcon(): any;
}
