import { r as registerInstance, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const WdprPortraitHeroCard = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    headline;
    body;
    src;
    gradient = 'accent-6';
    a11yAlt;
    get _contentClasses() {
        return customTwMerge(contentBaseClasses, gradientClassMap[this.gradient]);
    }
    render() {
        return (h("article", { key: 'ff2134710cdf674d9fe75dd3815eb0cd7f313e94', class: baseClasses }, h("figure", { key: '9c8e961d65e8d953de45c682b1c72ab686d07809', class: mediaWrapperClasses }, h("wdpr-media", { key: 'c749b39e0d05601232054f80593cd1944994144d', src: this.src, alt: this.a11yAlt, aspect: "portrait", objectFit: "cover", portraitRatio: "2:3" }), h("div", { key: 'de232f3ee33d3c68a2892a916e9ad85f635ca4c8', class: this._contentClasses }, h("span", { key: '05b186abc9642298da9a31e4fcdc66221cca0d2a', class: headlineClasses }, this.headline), h("p", { key: '19f09edbaaab0acf6208c1018fb2a97d50efe3de', class: bodyClasses }, this.body)))));
    }
};
const baseClasses = 'flex flex-col gap-150 w-full transition-all';
const mediaWrapperClasses = 'elevation-medium-soft lg:elevation-large-soft rounded-300 overflow-hidden relative';
const contentBaseClasses = `rounded-b-300 absolute bottom-0 left-0 right-0 flex flex-col gap-050 backdrop-blur-1
  pt-[88px] px-200 pb-200
  md:pt-[96px] md:px-200 md:pb-200
  lg:pt-[96px] lg:px-300 lg:pb-300
  xl:pt-[112px] xl:px-400 xl:pb-400`;
const headlineClasses = `text-text-inverse transition-all text-heading-medium font-heading-default leading-heading-medium tracking--05 line-clamp-2
  lg:text-heading-large lg:leading-heading-large
  xl:text-title-small xl:leading-title-small`;
const bodyClasses = `text-text-inverse transition-all text-body-medium font-body-default leading-body-medium tracking-default line-clamp-2
  lg:text-body-large lg:leading-body-large`;
const gradientClassMap = {
    'accent-1': 'bg-gradient-component-cards-bottom-up-accent-1',
    'accent-2': 'bg-gradient-component-cards-bottom-up-accent-2',
    'accent-3': 'bg-gradient-component-cards-bottom-up-accent-3',
    'accent-4': 'bg-gradient-component-cards-bottom-up-accent-4',
    'accent-5': 'bg-gradient-component-cards-bottom-up-accent-5',
    'accent-6': 'bg-gradient-component-cards-bottom-up-accent-6',
    'accent-7': 'bg-gradient-component-cards-bottom-up-accent-7',
    'accent-8': 'bg-gradient-component-cards-bottom-up-accent-8',
    'accent-9': 'bg-gradient-component-cards-bottom-up-accent-9',
    'accent-10': 'bg-gradient-component-cards-bottom-up-accent-10',
};

export { WdprPortraitHeroCard as wdpr_portrait_hero_card };
//# sourceMappingURL=wdpr-portrait-hero-card.entry.js.map

//# sourceMappingURL=wdpr-portrait-hero-card.entry.js.map