'use strict';

var index = require('./index-4gPM_TYz.js');
require('./utils-CARbI7sq.js');
var cardStyles = require('./card-styles-CO5BLqZi.js');
var bundleCjs = require('./bundle-cjs-Cajw0YnV.js');

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
    return index.h("div", { class: `${cardStyles.CLASSES.headlineLabel} ${customClass}` }, headlineLabel);
};
const RenderCardHeadlineSubtext = ({ headlineSubtext, customClass }) => {
    if (!headlineSubtext)
        return null;
    return index.h("div", { class: `${cardStyles.CLASSES.headlineSubtext} ${customClass}` }, headlineSubtext);
};
const RenderCardTagLabel = ({ tagLabel, customClass }) => {
    if (!tagLabel)
        return null;
    return index.h("div", { class: `${cardStyles.CLASSES.tagLabel} ${customClass}` }, tagLabel);
};
const RenderCardHeadline = ({ headline, customClass, headingLevel = 'h3' }) => {
    if (!headline)
        return null;
    const Tag = headingLevel;
    return index.h(Tag, { class: `${cardStyles.CLASSES.headline} ${customClass}` }, headline);
};
const RenderCardBody = ({ body, customClass }) => {
    if (!body)
        return null;
    return index.h("p", { class: `${cardStyles.CLASSES.body} ${customClass}` }, body);
};
const RenderCardBullets = ({ bullets, customClass, maxBullets = 3 }) => {
    if (!bullets || bullets.length === 0)
        return null;
    return (index.h("ul", { class: `${cardStyles.CLASSES.bullet} ${customClass}` }, bullets.slice(0, maxBullets).map((bullet, idx) => (index.h("li", { class: `last:mb-0${idx !== 0 ? ' list-disc' : ''}` }, bullet)))));
};
const RenderMicro = (props, styles) => {
    const { primaryHeadline, body, headingLevel = 'h1' } = props;
    const bodyClasses = primaryHeadline ? 'line-clamp-2 pt-050' : 'line-clamp-2 pt-0';
    return (index.h("div", { class: cardStyles.CLASSES.micro },
        primaryHeadline && index.h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xxsmall-alt line-clamp-2` }),
        body && index.h(RenderCardBody, { body: body, customClass: `${bodyClasses} ${styles.body} body-small` })));
};
const RenderSmall = (props, styles) => {
    const { primaryHeadline, body, bullets, contentType, headingLevel = 'h1' } = props;
    return (index.h("div", { class: cardStyles.CLASSES.small },
        primaryHeadline && index.h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xsmall-alt line-clamp-2` }),
        body && contentType === 'body' && index.h(RenderCardBody, { body: body, customClass: `${styles.body} body-medium line-clamp-2` }),
        bullets?.length > 0 && contentType === 'stacked' && index.h(RenderCardBullets, { bullets: bullets, customClass: `${styles.body} body-small` })));
};
const RenderXlarge = (props, styles) => {
    const { primaryHeadline, headlineLabel, headlineSubtext, headingLevel = 'h1', tagLabel, isMobile, topPadding, headlineSize = 'xlarge', subHeadlineSize = 'large', tagSize = 'large', } = props;
    const headlineFontSize = isMobile ? 'title-small' : TYPOGRAPHY_CLASSES.headline[headlineSize];
    const subtextFontSize = isMobile ? 'body-small' : TYPOGRAPHY_CLASSES.subHeadline[subHeadlineSize];
    const tagFontSize = isMobile ? 'heading-small' : TYPOGRAPHY_CLASSES.tag[tagSize];
    const topPaddingClass = topPadding ? 'pt-500' : '';
    const labelStyles = bundleCjs.bundleCjsExports.twMerge(styles.disclaimer, topPaddingClass, 'font-component-accent tracking-12 leading-label-large component-small uppercase');
    return (index.h("div", { class: cardStyles.CLASSES.small },
        headlineLabel && index.h(RenderCardHeadlineLabel, { headlineLabel: headlineLabel, customClass: labelStyles }),
        primaryHeadline && index.h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} ${headlineFontSize} line-clamp-2` }),
        headlineSubtext && index.h(RenderCardHeadlineSubtext, { headlineSubtext: headlineSubtext, customClass: `${styles.subtext} ${subtextFontSize}` }),
        tagLabel && index.h(RenderCardTagLabel, { tagLabel: tagLabel, customClass: `${styles.tag} ${tagFontSize}` })));
};
const RenderDefault = (props, styles) => {
    const { primaryHeadline, featureHeadline, headlineLabel, headlineSubtext, body, bullets, headingLevel = 'h1' } = props;
    return (index.h("div", { class: cardStyles.CLASSES.generic },
        headlineLabel && index.h(RenderCardHeadlineLabel, { headlineLabel: headlineLabel, customClass: styles.disclaimer }),
        primaryHeadline && index.h(RenderCardHeadline, { headline: primaryHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xsmall-alt line-clamp-3` }),
        featureHeadline && index.h(RenderCardHeadline, { headline: featureHeadline, headingLevel: headingLevel, customClass: `${styles.heading} heading-xsmall line-clamp-1` }),
        headlineSubtext && index.h(RenderCardHeadlineSubtext, { headlineSubtext: headlineSubtext, customClass: styles.subtext }),
        bullets?.length > 0 && index.h(RenderCardBullets, { bullets: bullets, customClass: `${styles.body} body-medium-alt` }),
        body && index.h(RenderCardBody, { body: body, customClass: `${styles.body} body-medium line-clamp-3` }),
        index.h("div", { class: cardStyles.CLASSES.genericSlot },
            index.h("slot", null))));
};
const variantRenderers = {
    micro: RenderMicro,
    small: RenderSmall,
    xlarge: RenderXlarge,
};
const RenderCardContent = (props) => {
    const { variant, disabled, hasGradient, inverseColor } = props;
    const styles = cardStyles.resolveTextStyles(disabled, hasGradient || inverseColor);
    const render = variantRenderers[variant] ?? RenderDefault;
    return render(props, styles);
};

exports.RenderCardContent = RenderCardContent;
//# sourceMappingURL=card-content-renderer-DSH1fGA-.js.map

//# sourceMappingURL=card-content-renderer-DSH1fGA-.js.map