import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { f as findAssignedElementsByTag, c as customTwMerge } from './p-CXZGMLMW.js';
import { b as cardBaseBorderClasses, g as cardXlargePortraitBaseClasses, h as cardXlargeBaseClasses } from './p-BvI-yBcV.js';
import { g as getCardStateClasses, h as handleCardKeyDown, a as handleCardClick } from './p-0zltjOT6.js';
import { d as defineCustomElement$2 } from './p-CY_t0laS.js';

const WdprCardXlarge$1 = /*@__PURE__*/ proxyCustomElement(class WdprCardXlarge extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    get el() { return this; }
    contentOrientation = 'bottom';
    gradientColor = 'none';
    a11yLabel;
    disabled = false;
    mediaLayout = '2:1';
    selected = false;
    isMouseDown = false;
    isMobile;
    _wdprCardXlargeContent;
    _wdprMedia;
    handleMediaLayoutChange() {
        this._updateMediaAspect();
    }
    _updateMediaAspect() {
        if (!this._wdprMedia)
            return;
        this._wdprMedia.forEach(media => {
            if (this.mediaLayout === '3:2') {
                media.aspect = 'landscape';
                media.landscapeRatio = '3:2';
            }
            else if (this.mediaLayout === '2:3') {
                media.aspect = 'portrait';
                media.portraitRatio = '2:3';
            }
            else {
                media.aspect = 'landscape';
                media.landscapeRatio = this.mediaLayout;
            }
        });
    }
    disconnectedCallback() {
        window.removeEventListener('resize', this._handleResize);
    }
    componentDidLoad() {
        this._findMedia();
        this._findCardContent();
        this._handleResize();
        this._checkMobile();
        window.addEventListener('resize', () => {
            this._handleResize();
            this._checkMobile();
        });
    }
    _handleResize = () => {
        this.isMobile = window.innerWidth < 768;
    };
    _checkMobile = () => {
        this._handleResize();
        this._wdprCardXlargeContent.forEach(content => {
            content.isMobile = this.isMobile;
        });
    };
    _findMedia = () => {
        const slot = this.el.shadowRoot?.querySelector('slot[name="media"]');
        if (slot) {
            const assignedElement = findAssignedElementsByTag(slot, 'wdpr-media');
            this._wdprMedia = assignedElement;
            this._updateMediaAspect();
        }
    };
    _findCardContent = () => {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        if (slot) {
            const assignedElement = findAssignedElementsByTag(slot, 'wdpr-card-xlarge-content');
            this._wdprCardXlargeContent = assignedElement;
            if (this._wdprCardXlargeContent) {
                this._wdprCardXlargeContent.forEach(content => {
                    content.hasGradient = this.gradientColor !== 'none';
                    content.disabled = this.disabled;
                });
            }
        }
    };
    _gradientClassMap = {
        'accent-1': { t: 'bg-gradient-component-cards-bottom-up-accent-1', b: 'bg-gradient-component-cards-top-down-accent-1' },
        'accent-2': { t: 'bg-gradient-component-cards-bottom-up-accent-2', b: 'bg-gradient-component-cards-top-down-accent-2' },
        'accent-3': { t: 'bg-gradient-component-cards-bottom-up-accent-3', b: 'bg-gradient-component-cards-top-down-accent-3' },
        'accent-4': { t: 'bg-gradient-component-cards-bottom-up-accent-4', b: 'bg-gradient-component-cards-top-down-accent-4' },
        'accent-5': { t: 'bg-gradient-component-cards-bottom-up-accent-5', b: 'bg-gradient-component-cards-top-down-accent-5' },
        'accent-6': { t: 'bg-gradient-component-cards-bottom-up-accent-6', b: 'bg-gradient-component-cards-top-down-accent-6' },
        'accent-7': { t: 'bg-gradient-component-cards-bottom-up-accent-7', b: 'bg-gradient-component-cards-top-down-accent-7' },
        'accent-8': { t: 'bg-gradient-component-cards-bottom-up-accent-8', b: 'bg-gradient-component-cards-top-down-accent-8' },
        'accent-9': { t: 'bg-gradient-component-cards-bottom-up-accent-9', b: 'bg-gradient-component-cards-top-down-accent-9' },
        'accent-10': { t: 'bg-gradient-component-cards-bottom-up-accent-10', b: 'bg-gradient-component-cards-top-down-accent-10' },
        'none': { t: '', b: '' },
    };
    get contentPositionClasses() {
        return this.contentOrientation === 'top'
            ? 'top-dimension-400 left-dimension-400 right-dimension-400'
            : 'bottom-dimension-400 left-dimension-400 right-dimension-400';
    }
    get swapPositionClasses() {
        return this.contentOrientation === 'top'
            ? 'bottom-dimension-400 left-dimension-400 right-dimension-400'
            : 'top-dimension-400 left-dimension-400 right-dimension-400';
    }
    get gradientPositionClasses() {
        return this.contentOrientation === 'top' ? 'top-dimension-000 left-dimension-000' : 'bottom-dimension-000 left-dimension-000';
    }
    get gradientStyles() {
        if (this.gradientColor === 'none')
            return '';
        const orientation = this.contentOrientation === 'top' ? 'b' : 't';
        const gradientClass = this._gradientClassMap[this.gradientColor][orientation];
        return customTwMerge(gradientClass);
    }
    get cardClasses() {
        const cardStateClasses = getCardStateClasses(this.selected, this.isMouseDown);
        const stateAndBorderClasses = !this.disabled ? customTwMerge(cardStateClasses, cardBaseBorderClasses) : '';
        const baseClasses = this.mediaLayout === '2:3' ? cardXlargePortraitBaseClasses : cardXlargeBaseClasses;
        const mobileFullWidth = this.isMobile && this.mediaLayout !== '2:3' ? 'w-full max-w-full' : '';
        return customTwMerge(baseClasses, stateAndBorderClasses, mobileFullWidth);
    }
    _toggleSelectionControl = () => {
        if (this.disabled)
            return;
        {
            this.selected = !this.selected;
        }
    };
    _handleKeyDown = (e) => {
        handleCardKeyDown(e, this.el, this.disabled, this._toggleSelectionControl);
    };
    _handleClick = (e) => {
        handleCardClick(e, this.disabled, this._toggleSelectionControl);
    };
    render() {
        return (h("div", { key: '8c8d98235a0a6fa693ea568e61f7561642ad08d9', class: this.cardClasses, tabIndex: 0, "aria-label": this.a11yLabel, onClick: this._handleClick, onKeyDown: this._handleKeyDown, onMouseDown: () => (this.isMouseDown = true), onMouseUp: () => (this.isMouseDown = false) }, h("div", { key: '36b7b6b4339f62fe4784495616e632b5731c80f7', class: "z-10 w-full h-full absolute" }, h("wdpr-overlay", { key: 'ad2e9ebcf50281a04e9b96714e93fc2766b06f08', cover: true, open: this.disabled, variant: "scrim", role: "presentation", ariaLabel: "Disabled Overlay" })), h("div", { key: '0b356d0192feae4c1cbdd7353327e8f2fd340781', class: `${this.gradientPositionClasses} ${this.gradientStyles} absolute w-full h-57 pointer-events-none z-9` }), h("div", { key: '1388f9d9caba8c612731519b2e93710f969af2ef', class: `${this.swapPositionClasses} flex justify-center items-center rounded-150 absolute pointer-events-none w-dimension-1200 h-dimension-1200 z-9 overflow-hidden` }, h("slot", { key: '3dd0eeba3efc3c6ee40cff23e810fa2f3d47ceca', name: "swap" })), h("div", { key: '763995496bb6dfb4af7196372c68b6f798691366', class: "block rounded-300 overflow-hidden size-full relative" }, h("slot", { key: '3e9cff768c0eef43f2e1207408ec195a80accbab', name: "media" })), h("div", { key: '66a9cf251321f5ecff35231906ca739a11c26240', class: `flex flex-col gap-100 absolute z-10 ${this.contentPositionClasses}` }, h("slot", { key: '3948a50dbef025ec4a33192648ebd2a731f8f260', name: "badge" }), h("slot", { key: 'c4d94b93dc2117a2d7401c84d54ed54c226a6c4c', name: "content" }))));
    }
    static get watchers() { return {
        "mediaLayout": ["handleMediaLayoutChange"]
    }; }
    static get style() { return ":host {\n      display: block;\n      width: 100%;\n    }"; }
}, [257, "wdpr-card-xlarge", {
        "contentOrientation": [1, "content-orientation"],
        "gradientColor": [1, "gradient-color"],
        "a11yLabel": [1, "a11y-label"],
        "disabled": [4],
        "mediaLayout": [1, "media-layout"],
        "selected": [32],
        "isMouseDown": [32],
        "isMobile": [32]
    }, undefined, {
        "mediaLayout": ["handleMediaLayoutChange"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-card-xlarge", "wdpr-overlay"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-card-xlarge":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCardXlarge$1);
            }
            break;
        case "wdpr-overlay":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCardXlarge = WdprCardXlarge$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCardXlarge, defineCustomElement };
//# sourceMappingURL=wdpr-card-xlarge.js.map

//# sourceMappingURL=wdpr-card-xlarge.js.map