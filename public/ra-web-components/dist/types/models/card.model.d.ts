export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export declare const TYPOGRAPHY_CLASSES: {
    readonly headline: {
        readonly xlarge: "title-large";
        readonly large: "title-small";
        readonly medium: "heading-medium";
        readonly small: "heading-xsmall";
        readonly xsmall: "heading-xxsmall";
    };
    readonly subHeadline: {
        readonly large: "body-large";
        readonly small: "body-medium";
    };
    readonly tag: {
        readonly large: "heading-xsmall";
        readonly small: "heading-xxsmall";
    };
};
export interface ContentWrapperProps {
    variant?: 'small' | 'medium' | 'large' | 'micro' | 'xlarge';
    contentType?: 'stacked' | 'body';
    disabled?: boolean;
    primaryHeadline?: string;
    featureHeadline?: string;
    headlineLabel?: string;
    headlineSubtext?: string;
    body?: string;
    tagLabel?: string;
    bullets?: string[];
    hasGradient?: boolean;
    inverseColor?: boolean;
    isMobile?: boolean;
    headingLevel?: HeadingLevel;
    topPadding?: boolean;
    headlineSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
    subHeadlineSize?: 'small' | 'large';
    tagSize?: 'small' | 'large';
}
interface BaseRendererProps {
    customClass?: string;
    disabled?: boolean;
}
export interface RenderCardBodyProps extends BaseRendererProps {
    body?: string;
}
export interface HeadlineBodyRendererProps extends BaseRendererProps {
    headline?: string;
    clamp?: number;
    headingLevel?: HeadingLevel;
}
export interface HeadlineLabelRendererProps extends BaseRendererProps {
    headlineLabel?: string;
}
export interface HeadlineSubtextRendererProps extends BaseRendererProps {
    headlineSubtext?: string;
}
export interface TagLabelRendererProps extends BaseRendererProps {
    tagLabel?: string;
}
export interface RenderCardBulletsProps extends BaseRendererProps {
    bullets?: string[];
    maxBullets?: number;
}
export {};
