export type MediaAspect = 'landscape' | 'portrait' | 'square';
export type MediaShape = 'flat' | 'round';
export type ObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type LandscapeRatio = '45:8' | '32:9' | '3:1' | '5:2' | '40:17' | '7:3' | '2:1' | '16:9' | '3:2' | '4:3' | '5:4';
export type PortraitRatio = '4:5' | '3:4' | '5:7' | '2:3' | '9:16' | '3:7' | '1:3';
export declare class WdprMedia {
    el: HTMLWdprMediaElement;
    /** Base/fallback image source */
    src: string;
    /** Responsive source for small screens (eg., smart phones) */
    smallSrc: string;
    /** Responsive sources for medium screens (e.g., tablets) */
    mediumSrc: string;
    /** Responsive sources for large screens (e.g., desktops) */
    largeSrc: string;
    /** Alt text */
    alt: string;
    /** Placeholder (URL/base64) or CSS `url('...')` */
    placeholder: string;
    /** Fade from placeholder to image on load */
    fade: boolean;
    /** High-level aspect preset */
    aspect: MediaAspect;
    /** For aspect="square": flat=square, round=circle */
    shape: MediaShape;
    /** CSS object-fit for the image */
    objectFit: ObjectFit;
    /** Landscape ratio preset (used only when aspect="landscape") */
    landscapeRatio: LandscapeRatio;
    /** Portrait ratio preset (used only when aspect="portrait") */
    portraitRatio: PortraitRatio;
    loaded: boolean;
    syncSources(): void;
    componentWillLoad(): void;
    private landscapeAspectClassMap;
    private portraitAspectClassMap;
    private get aspectClass();
    private get roundingClass();
    private get wrapperClass();
    private get placeholderClass();
    private get pictureClass();
    private get imgClass();
    private extractUrlFromCssUrl;
    private handleLoad;
    render(): any;
}
