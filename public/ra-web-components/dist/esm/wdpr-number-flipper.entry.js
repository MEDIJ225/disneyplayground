import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';
import { c as customTwMerge } from './utils-B2sDCMk6.js';
import './bundle-cjs-CF3xLdU_.js';

const wdprNumberFlipperCss = ".overlay-top,.overlay-bottom{backface-visibility:hidden}.overlay.flip .overlay-top{animation:flip-top 500ms linear}.overlay.flip .overlay-bottom{animation:flip-bottom 500ms linear}@keyframes flip-top{0%{transform:rotateX(0deg);filter:brightness(1)}50%,100%{transform:rotateX(-90deg);filter:brightness(0.7)}}@keyframes flip-bottom{0%,50%{transform:rotateX(90deg)}100%{transform:rotateX(0deg)}}";

const WdprNumberFlipper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    _observer;
    get el() { return getElement(this); }
    size = 'small';
    _displayTop;
    _displayBottom;
    _overlayTop;
    _overlayBottom;
    _isFlipping = false;
    getSlotElement() {
        // Get the assigned nodes of the default slot and return the first element node or a wrapper span if text
        const slot = this.el.shadowRoot.querySelector('slot');
        if (slot) {
            const nodes = slot.assignedNodes({ flatten: true });
            for (const node of nodes) {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    return node;
                }
                else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                    // Wrap text node in a span for rendering
                    const span = document.createElement('span');
                    span.textContent = node.textContent;
                    return span;
                }
            }
        }
        // Fallback: empty span
        const fallback = document.createElement('span');
        fallback.textContent = '#';
        return fallback;
    }
    // The user came back and the flip was stuck..
    // Force the end state immediately.
    handleVisibilityChange() {
        if (document.visibilityState === 'visible' && this._isFlipping) {
            this._handleAnimationEnd();
        }
    }
    componentDidLoad() {
        const slotElement = this.getSlotElement();
        this._displayTop = slotElement;
        this._displayBottom = slotElement.cloneNode(true);
        this._overlayTop = slotElement.cloneNode(true);
        this._overlayBottom = slotElement.cloneNode(true);
        this._observer = new MutationObserver(() => {
            this._handleSlotChange();
        });
        this._observer.observe(this.el, {
            childList: true,
            characterData: true,
            subtree: true,
        });
    }
    disconnectedCallback() {
        this._observer?.disconnect();
    }
    _handleSlotChange = () => {
        const newElement = this.getSlotElement();
        // Compare outerHTML for change detection
        if (this._displayTop && newElement.outerHTML === this._displayTop.outerHTML)
            return;
        // We update these values before starting the animation to have a smooth transition between the new and old values.
        this._displayTop = newElement;
        this._overlayBottom = newElement.cloneNode(true);
        this._isFlipping = true;
    };
    get _wrapperClasses() {
        return customTwMerge(baseWrapperClasses, sizeClasses[this.size]);
    }
    _handleAnimationEnd = () => {
        const slotElement = this.getSlotElement();
        this._displayBottom = slotElement.cloneNode(true);
        this._overlayTop = slotElement.cloneNode(true);
        this._isFlipping = false;
    };
    render() {
        return (h("div", { key: 'cd324842a7a9ed47565d186181b9c23669306f73', class: this._wrapperClasses }, h("div", { key: '1d31ec7f6beb47c3c128502ca2c42f7f3d21a9e1', class: "relative w-full h-full" }, h("span", { key: '1083aa8c27f7cd6c23860ea2be769ac5f1368078', class: "hidden" }, h("slot", { key: '8dff5a0e9e60bb0339ef5362e75bd92c59458931' })), h("span", { key: 'df8d27491a0bdf37e8e884ed28302c35efd9de24', class: "top w-full h-1/2 overflow-hidden flex items-end justify-center" }, h("span", { key: '8c6bfeac05dbaac5c765a349c3a059eae7065d76', class: "z-2", style: { transform: 'translateY(50%)' }, innerHTML: this._displayTop ? this._displayTop.outerHTML : '' })), h("span", { key: '5e914f9a28deb92a7187697fd20869eb88534dd4', class: "bottom w-full h-1/2 overflow-hidden flex items-start justify-center bg-(--color-plum-050)" }, h("span", { key: '777c18b1cc0876e107d54becf8d059cfb293b6dd', class: "z-2", style: { transform: 'translateY(-50%)' }, innerHTML: this._displayBottom ? this._displayBottom.outerHTML : '' })), h("div", { key: 'eb38e8d3a12818bbe03f81c819566b80f2aee6f3', class: `overlay${this._isFlipping ? ' flip' : ''} absolute top-0 h-full w-full z-10`, onAnimationEnd: this._handleAnimationEnd }, h("div", { key: 'a5144b97f68f8c669f609d9d597e3b28e2fc6acc', class: "middle-bar absolute left-0 w-full h-[1px] top-1/2 bg-stroke-default z-11" }), h("span", { key: '732c67ff7d9026938e81e41b797a1c3351f0ba9e', class: "overlay-top w-full h-1/2 overflow-hidden flex items-end justify-center bg-surface-default origin-bottom" }, h("span", { key: '6954dadef026c20fb92adf0af5d495e21aefc409', class: "z-12", style: { transform: 'translateY(50%)' }, innerHTML: this._overlayTop ? this._overlayTop.outerHTML : '' })), h("span", { key: '6228bfe75d48beefd7619ec838163416d5ad6c67', class: "overlay-bottom w-full h-1/2 overflow-hidden flex items-start justify-center bg-(--color-plum-050) origin-top" }, h("span", { key: '002cc5d95d0ea8f16216c9a1a6d7f277fa396fbe', class: "z-12", style: { transform: 'translateY(-50%)' }, innerHTML: this._overlayBottom ? this._overlayBottom.outerHTML : '' }))))));
    }
};
const baseWrapperClasses = `border-solid border-012 border-stroke-default
bg-surface-default text-text-heading elevation-xsmall
font-[var(--font-weight-black)] relative overflow-hidden
flex flex-col justify-center items-center`;
const sizeClasses = {
    small: 'w-[28px] h-[44px] text-[24px] leading-[26px] tracking--05 rounded-075',
    medium: 'w-[45px] h-[70px] text-[52px] leading-[52px] tracking--05 rounded-125',
    large: 'w-[60px] h-[90px] text-[64px] leading-[64px] tracking--05 rounded-150',
};
WdprNumberFlipper.style = wdprNumberFlipperCss;

export { WdprNumberFlipper as wdpr_number_flipper };
//# sourceMappingURL=wdpr-number-flipper.entry.js.map

//# sourceMappingURL=wdpr-number-flipper.entry.js.map