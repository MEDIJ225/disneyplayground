'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprEmptyState = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprPrimaryClick = index.createEvent(this, "wdprPrimaryClick", 7);
        this.wdprSecondaryClick = index.createEvent(this, "wdprSecondaryClick", 7);
    }
    get el() { return index.getElement(this); }
    _responsiveSize = 'medium';
    size;
    mediaType = 'icon';
    icon;
    mediaSrc;
    mediaAlt = '';
    mediaShape = 'flat';
    heading;
    bodyContent;
    showPrimaryButton = true;
    showSecondaryButton = false;
    position = 'stacked';
    primaryActionText = 'Label';
    secondaryActionText = 'Label';
    wdprPrimaryClick;
    wdprSecondaryClick;
    componentWillLoad() {
        this._setResponsiveSize();
    }
    componentDidLoad() {
        window.addEventListener('resize', this._setResponsiveSize);
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this._setResponsiveSize);
    }
    _handlePrimaryClick = () => this.wdprPrimaryClick.emit();
    _handleSecondaryClick = () => this.wdprSecondaryClick.emit();
    _setResponsiveSize = () => {
        const width = window.innerWidth;
        if (width < 600) {
            this._responsiveSize = 'small';
        }
        else if (width < 1024) {
            this._responsiveSize = 'medium';
        }
        else {
            this._responsiveSize = 'large';
        }
    };
    get _effectiveSize() {
        return this.size ?? this._responsiveSize;
    }
    render() {
        const effectiveAlt = this.mediaAlt || this.heading;
        const size = this._effectiveSize;
        // Force position to 'stacked' when responsiveSize is 'small'
        const effectivePosition = this._responsiveSize === 'small' ? 'stacked' : this.position;
        return (index.h("section", { key: 'c29496c305d58dabddf7e71008015a1ef59da48d', "aria-labelledby": "empty-state-heading", class: emptyStateWrapperClasses }, index.h("div", { key: '7fbd0d6c1b24b5f036ec87f9524b8189f357b741', class: emptyStateMediaWrapperClasses }, index.h("slot", { key: '438f6fa8647c1f679a1b836d7a7d36bd28f3ac00', name: "media" }, this.mediaType === 'icon' && this.icon && (index.h("wdpr-icon-library", { key: '194d09242654a834354ecb4145ffe8c18fa25674', icon: this.icon, size: "xlarge", ariaTitle: this.heading, decorative: false })), this.mediaType === 'media' && this.mediaSrc && (index.h("wdpr-media", { key: '809f889470f2758ab5fa554d8adabff2098824e1', src: this.mediaSrc, alt: effectiveAlt, shape: this.mediaShape, aspect: "square", class: mediaSizeClasses[size] })))), index.h("div", { key: '23eb1f6457bdc071ea9e823c091868478917edd8', class: emptyStateContentWrapperClasses }, index.h("div", { key: 'cf44a2fdb91f1e55a3c9cc8474c66e0b865d9536', class: emptyStateTextWrapperClasses }, index.h("slot", { key: 'a2bddd4a5e3d9485a24a099be6900d675682b3eb', name: "heading" }, this.heading && index.h("h2", { key: 'd152333ac228f20ac8498870a39d590aeb2b5fe6', id: "empty-state-heading", class: emptyStateHeadingClasses[size] }, this.heading)), index.h("slot", { key: '903644bd2cc450d5378bf95b5d95f6a6fd4e98b8', name: "body" }, this.bodyContent && index.h("p", { key: 'a29a4d75d3a11918e3657c82783673efc07138ca', class: emptyStateBodyClasses }, this.bodyContent))), (this.showPrimaryButton || this.showSecondaryButton) && (index.h("div", { key: '5ead7a5df9f8c3ce3613b75fffcdac2f37d4fe02', class: emptyStateActionsWrapperClasses(effectivePosition, size) }, effectivePosition === 'stacked'
            ? [
                index.h("slot", { name: "primary-button" }, this.showPrimaryButton && this.primaryActionText && (index.h("wdpr-button", { type: "button", variant: "primary", class: "w-auto", onWdprClick: this._handlePrimaryClick }, this.primaryActionText))),
                index.h("slot", { name: "secondary-button" }, this.showSecondaryButton && this.secondaryActionText && (index.h("wdpr-button", { type: "button", variant: "tertiary", class: "w-auto", onWdprClick: this._handleSecondaryClick }, this.secondaryActionText))),
            ]
            : [
                index.h("slot", { name: "secondary-button" }, this.showSecondaryButton && this.secondaryActionText && (index.h("wdpr-button", { type: "button", variant: "tertiary", class: "w-auto", onWdprClick: this._handleSecondaryClick }, this.secondaryActionText))),
                index.h("slot", { name: "primary-button" }, this.showPrimaryButton && this.primaryActionText && (index.h("wdpr-button", { type: "button", variant: "primary", class: "w-auto", onWdprClick: this._handlePrimaryClick }, this.primaryActionText))),
            ])))));
    }
};
const emptyStateWrapperClasses = 'flex flex-col items-center justify-center text-center mx-auto bg-surface-transparent';
const emptyStateMediaWrapperClasses = 'flex justify-center items-center mb-300';
const emptyStateContentWrapperClasses = 'flex flex-col items-center self-stretch gap-200';
const emptyStateTextWrapperClasses = 'flex flex-col items-center self-stretch gap-025';
const emptyStateHeadingClasses = {
    small: 'heading-small',
    medium: 'title-medium-alt',
    large: 'title-large-alt',
};
const emptyStateBodyClasses = 'body-large text-text-body max-w-prose';
const mediaSizeClasses = {
    small: 'block w-[min(164px,70vw)] aspect-square',
    medium: 'block w-[min(320px,85vw)] aspect-square',
    large: 'block w-[min(424px,90vw)] aspect-square',
};
const emptyStateActionsWrapperClasses = (position, size) => {
    const layout = position === 'inline' ? 'flex-row flex-wrap justify-center' : 'flex-col items-center';
    const gapSize = position === 'inline' ? (size === 'small' ? 'gap-200' : 'gap-300') : 'gap-150';
    return `flex ${layout} ${gapSize}`;
};

exports.wdpr_empty_state = WdprEmptyState;
//# sourceMappingURL=wdpr-empty-state.entry.cjs.js.map

//# sourceMappingURL=wdpr-empty-state.cjs.entry.js.map