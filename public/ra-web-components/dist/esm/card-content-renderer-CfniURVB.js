import { h } from './index-CykM8GCN.js';
import './utils-B2sDCMk6.js';
import { r as resolveTextStyles, C as CLASSES } from './card-styles-BvI-yBcV.js';
import { b as bundleCjsExports } from './bundle-cjs-CF3xLdU_.js';

const TYPOGRAPHY_CLASSES = {
    headline: {
        xlarge: 'title-large',
        large: 'title-small',
        medium: 'heading-medium',
        small: 'heading-xsmall',
        xsmall: 'heading-xxsmall',
    },
    subHeadline: {
        large: 'body-large',
        small: 'body-medium',
    },
    tag: {
        large: 'heading-xsmall',
        small: 'heading-xxsmall',
    },
};

const RenderCardHeadlineLabel = ({ headlineLabel, customClass }) => {
    if (!headlineLabel)
        return null;
    return h("div", { class: `${CLASSES.headlineLabel} ${customClass}` }, headlineLabel);
};
const RenderCardHeadlineSubtext = ({ headlineSubtext, customClass }) => {
    if (!headlineSubtext)
        return null;
    return h("div", { class: `${CLASSES.headlineSubtext} ${customClass}` }, headlineSubtext);
};
const RenderCardTagLabel = ({ tagLabel, customClass }) => {
    if (!tagLabel)
        return null;
    return h("div", { class: `${CLASSES.tagLabel} ${customClass}` }, tagLabel);
};
const RenderCardHeadline = ({ headline, customClass, headingLevel = 'h3' }) => {
    if (!headline)
        return null;
    const Tag = headingLevel;
    return h(Tag, { class: `${CLASSES.headline} ${customClass}` }, headline);
};
const RenderCardBody = ({ body, customClass }) => {
    if (!body)
        return null;
    return h("p", { class: `${CLASSES.body} ${customClass}` }, body);
};
const RenderCardBullets = ({ bullets, customClass, maxBullets = 3 }) => {
    if (!bullets || bullets.length === 0)
        return null;
    return (h("ul", { class: `${CLASSES.bullet} ${customClass}` }, bullets.slice(0, maxBullets).map((bullet, idx) => (h("li", { class: `last:mb-0${idx !== 0 ? ' list-disc' : ''}` }, bullet)))));
};
const RenderMicro = (props, styles) => {
    const { primaryHeadline, body, headingLevel = 'h1' } = props;
    const bodyClasses = primaryHeadline ? 'line-clamp-2 pt-050' : 'line-clamp-2 pt-0';
    return (h("div", { class: CLASSES.micro },
        primaryHeadline && h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xxsmall-alt line-clamp-2` }),
        body && h(RenderCardBody, { body: body, customClass: `${bodyClasses} ${styles.body} body-small` })));
};
const RenderSmall = (props, styles) => {
    const { primaryHeadline, body, bullets, contentType, headingLevel = 'h1' } = props;
    return (h("div", { class: CLASSES.small },
        primaryHeadline && h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xsmall-alt line-clamp-2` }),
        body && contentType === 'body' && h(RenderCardBody, { body: body, customClass: `${styles.body} body-medium line-clamp-2` }),
        bullets?.length > 0 && contentType === 'stacked' && h(RenderCardBullets, { bullets: bullets, customClass: `${styles.body} body-small` })));
};
const RenderXlarge = (props, styles) => {
    const { primaryHeadline, headlineLabel, headlineSubtext, headingLevel = 'h1', tagLabel, isMobile, topPadding, headlineSize = 'xlarge', subHeadlineSize = 'large', tagSize = 'large', } = props;
    const headlineFontSize = isMobile ? 'title-small' : TYPOGRAPHY_CLASSES.headline[headlineSize];
    const subtextFontSize = isMobile ? 'body-small' : TYPOGRAPHY_CLASSES.subHeadline[subHeadlineSize];
    const tagFontSize = isMobile ? 'heading-small' : TYPOGRAPHY_CLASSES.tag[tagSize];
    const topPaddingClass = topPadding ? 'pt-500' : '';
    const labelStyles = bundleCjsExports.twMerge(styles.disclaimer, topPaddingClass, 'font-component-accent tracking-12 leading-label-large component-small uppercase');
    return (h("div", { class: CLASSES.small },
        headlineLabel && h(RenderCardHeadlineLabel, { headlineLabel: headlineLabel, customClass: labelStyles }),
        primaryHeadline && h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} ${headlineFontSize} line-clamp-2` }),
        headlineSubtext && h(RenderCardHeadlineSubtext, { headlineSubtext: headlineSubtext, customClass: `${styles.subtext} ${subtextFontSize}` }),
        tagLabel && h(RenderCardTagLabel, { tagLabel: tagLabel, customClass: `${styles.tag} ${tagFontSize}` })));
};
const RenderDefault = (props, styles) => {
    const { primaryHeadline, featureHeadline, headlineLabel, headlineSubtext, body, bullets, headingLevel = 'h1' } = props;
    return (h("div", { class: CLASSES.generic },
        headlineLabel && h(RenderCardHeadlineLabel, { headlineLabel: headlineLabel, customClass: styles.disclaimer }),
        primaryHeadline && h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xsmall-alt line-clamp-3` }),
        featureHeadline && h(RenderCardHeadline, { headline: featureHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xsmall line-clamp-1` }),
        headlineSubtext && h(RenderCardHeadlineSubtext, { headlineSubtext: headlineSubtext, customClass: styles.subtext }),
        bullets?.length > 0 && h(RenderCardBullets, { bullets: bullets, customClass: `${styles.body} body-medium-alt` }),
        body && h(RenderCardBody, { body: body, customClass: `${styles.body} body-medium line-clamp-3` }),
        h("div", { class: CLASSES.genericSlot },
            h("slot", null))));
};
const variantRenderers = {
    micro: RenderMicro,
    small: RenderSmall,
    xlarge: RenderXlarge,
};
const RenderCardContent = (props) => {
    const { variant, disabled, hasGradient, inverseColor } = props;
    const styles = resolveTextStyles(disabled, hasGradient || inverseColor);
    const render = variantRenderers[variant] ?? RenderDefault;
    return render(props, styles);
};

export { RenderCardContent as R };
//# sourceMappingURL=card-content-renderer-CfniURVB.js.map

//# sourceMappingURL=card-content-renderer-CfniURVB.js.map