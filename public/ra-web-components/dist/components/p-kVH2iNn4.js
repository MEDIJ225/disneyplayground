import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprMediaPlayerControlMuteToggle = /*@__PURE__*/ proxyCustomElement(class WdprMediaPlayerControlMuteToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprMuteToggle = createEvent(this, "wdprMuteToggle", 7);
    }
    muted = false;
    variant = 'overlay';
    isDisabled = false;
    wdprMuteToggle;
    _onClick = () => {
        this.wdprMuteToggle.emit();
    };
    render() {
        const isOverlay = this.variant === 'overlay';
        const iconSize = isOverlay ? 'small' : 'medium';
        return (h("button", { key: '6035fccf284feab808ac9cc2a2ec47dafc3be90b', class: {
                [controlBarClasses]: !isOverlay,
                [overlayChipClasses]: isOverlay,
                'w-[24px] h-[24px]': isOverlay,
            }, "aria-label": this.muted ? 'Unmute' : 'Mute', disabled: this.isDisabled, onClick: this._onClick }, this.muted ? (h("wdpr-icon-library", { size: iconSize, icon: "media-mute", decorative: true })) : (h("wdpr-icon-library", { size: iconSize, icon: "media-unmute", decorative: true }))));
    }
}, [257, "wdpr-media-player-control-mute-toggle", {
        "muted": [4],
        "variant": [1],
        "isDisabled": [4, "is-disabled"]
    }]);
const controlBarClasses = `
  cursor-pointer p-025 flex items-center rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default bg-transparent
  disabled:cursor-not-allowed disabled:opacity-500
`;
const overlayChipClasses = `
  cursor-pointer p-025 flex items-center justify-center rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default disabled:cursor-not-allowed
  elevation-xsmall-soft
  bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed disabled:bg-surface-actionable-alt-disabled
`;
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-media-player-control-mute-toggle", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media-player-control-mute-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMediaPlayerControlMuteToggle);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMediaPlayerControlMuteToggle as W, defineCustomElement as d };
//# sourceMappingURL=p-kVH2iNn4.js.map

//# sourceMappingURL=p-kVH2iNn4.js.map