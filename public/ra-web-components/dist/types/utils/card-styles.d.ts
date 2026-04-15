export declare const CLASSES: {
    readonly micro: "flex flex-col flex-1 min-w-0 items-start justify-center";
    readonly small: "flex flex-col content-stretch items-start justify-center";
    readonly generic: "flex flex-col items-start justify-center";
    readonly genericSlot: "pt-100 mb-050 body-small";
    readonly bullet: "list-none m-0 pt-100 body-medium flex flex-row flex-wrap gap-x-300 gap-y-050 line-clamp-1";
    readonly body: "relative shrink-0 w-full";
    readonly headline: "m-0 p-0 relative shrink-0 w-full";
    readonly headlineSubtext: "overflow-hidden relative shrink-0 w-full line-clamp-2";
    readonly tagLabel: "overflow-hidden relative shrink-0 w-full line-clamp-2";
    readonly headlineLabel: "overflow-hidden relative shrink-0 w-full line-clamp-1";
};
export declare const cardBaseClasses = "flex flex-col items-center rounded-200 md:w-[358px] max-w-[358px] min-w-[200px] min-h-[72px] overflow-hidden select-none box-border content-stretch relative";
export declare const cardXlargeBaseClasses = "block rounded-300 overflow-hidden min-h-[240px] min-w-[280px] max-w-[410px] md:min-h-[500px] md:min-w-[426px] md:max-w-[426px] md:min-h-[100%] md:min-w-[100%] md:max-w-[100%] md:h-[100%] select-none box-border content-stretch relative";
export declare const cardXlargePortraitBaseClasses = "block rounded-300 overflow-hidden min-h-[240px] min-w-[160px] w-[342px] h-[513px] md:w-[410px] md:h-[615px] select-none box-border content-stretch relative";
export declare const cardDisabledClasses = "flex flex-col items-center rounded-200 md:w-[358px] max-w-[358px] min-w-[200px] min-h-[72px] overflow-hidden select-none box-border content-stretch relative border border-solid border-025 border-transparent pointer-events-none";
export declare const cardElevationClasses = "bg-surface-default elevation-small-soft";
export declare const cardNoElevationClasses = "bg-surface-default elevation-none";
export declare const cardOnSurfaceClasses = "bg-surface-default border-none";
export declare const cardOffSurfaceClasses = "bg-transparent border-none";
export declare const cardBaseBorderClasses = "border border-solid border-025";
export declare const cardGhostBorderClasses: string;
export interface TextStyles {
    heading: string;
    subtext: string;
    disclaimer: string;
    body: string;
    tag: string;
}
export declare function resolveTextStyles(disabled: boolean, inverse: boolean): TextStyles;
