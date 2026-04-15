export type StepperSize = 'small' | 'medium' | 'large';
export type StepperVariant = 'stacked' | 'inline';
export type FormInternalsHost = HTMLElement & {
    attachInternals(): ElementInternals;
};
export declare const SIZE_CONFIG: {
    readonly small: {
        readonly container: "max-w-dimension-1200";
        readonly header: "heading-xxsmall-alt";
        readonly subHeader: "body-small";
        readonly button: "medium";
        readonly input: "w-dimension-500 h-dimension-400 text-[24px] leading-[32px] font-heading-alt tracking--05";
        readonly counter: "w-dimension-500 h-dimension-400 text-[24px] leading-[32px] font-heading-alt tracking--05";
    };
    readonly medium: {
        readonly container: "max-w-dimension-1500";
        readonly header: "heading-xsmall-alt";
        readonly subHeader: "body-medium";
        readonly button: "large";
        readonly input: "w-dimension-500 h-dimension-550 text-[32px] leading-[40px] font-title-alt tracking--05";
        readonly counter: "w-dimension-600 h-dimension-500 text-[32px] leading-[40px] font-title-alt tracking--05";
    };
    readonly large: {
        readonly container: "max-w-dimension-2000";
        readonly header: "heading-small-alt";
        readonly subHeader: "body-large";
        readonly button: "xlarge";
        readonly input: "w-dimension-700 h-dimension-600 text-[36px] leading-[48px] font-title-alt tracking--05";
        readonly counter: "w-dimension-700 h-dimension-600 text-[36px] leading-[48px] font-title-alt tracking--05";
    };
};
