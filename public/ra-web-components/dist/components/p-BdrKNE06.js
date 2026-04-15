import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprMediaPlayerControlPlayToggle = /*@__PURE__*/ proxyCustomElement(class WdprMediaPlayerControlPlayToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprPlayToggle = createEvent(this, "wdprPlayToggle", 7);
    }
    playing = false;
    variant = 'overlay';
    isDisabled = false;
    wdprPlayToggle;
    _onClick = () => {
        this.wdprPlayToggle.emit();
    };
    render() {
        const isOverlay = this.variant === 'overlay';
        const size = isOverlay ? 'xlarge' : 'medium';
        return (h("button", { key: '3fe1dbded40d9ea8a0c50036d8cec6d4cd45afc5', type: "button", class: {
                [controlBarClasses]: !isOverlay,
                [overlayChipClasses]: isOverlay,
            }, disabled: this.isDisabled, onClick: this._onClick, "aria-label": this.playing ? 'Pause' : 'Play' }, this.playing ? h("wdpr-icon-library", { size: size, icon: "media-pause-1", decorative: true }) : h("wdpr-icon-library", { size: size, icon: "media-play-1", decorative: true })));
    }
}, [257, "wdpr-media-player-control-play-toggle", {
        "playing": [4],
        "variant": [1],
        "isDisabled": [4, "is-disabled"]
    }]);
const controlBarClasses = `
  cursor-pointer p-025 flex items-center relative rounded-pill border border-transparent
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default bg-transparent
  disabled:cursor-not-allowed disabled:opacity-500
`;
const overlayChipClasses = `
  cursor-pointer flex items-center justify-center relative rounded-pill border border-transparent
  w-[40px] h-[40px]
  focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
  text-icon-actionable-inverse-default disabled:cursor-not-allowed
  elevation-xsmall-soft
  bg-surface-actionable-alt-default-a78 hover:bg-surface-actionable-alt-hover-a88 active:bg-surface-actionable-alt-pressed disabled:bg-surface-actionable-alt-disabled
`;
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-media-player-control-play-toggle", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media-player-control-play-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMediaPlayerControlPlayToggle);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMediaPlayerControlPlayToggle as W, defineCustomElement as d };
//# sourceMappingURL=p-BdrKNE06.js.map

//# sourceMappingURL=p-BdrKNE06.js.map