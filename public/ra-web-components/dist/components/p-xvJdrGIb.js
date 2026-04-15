import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprMediaPlayerControlCaptionsToggle = /*@__PURE__*/ proxyCustomElement(class WdprMediaPlayerControlCaptionsToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprCaptionsToggle = createEvent(this, "wdprCaptionsToggle", 7);
    }
    enabled = false;
    isDisabled = false;
    wdprCaptionsToggle;
    _onClick = () => {
        this.wdprCaptionsToggle.emit();
    };
    render() {
        return (h("button", { key: 'e5958374ed22d2fa10d2a5a7fb82ecb13672db92', class: containerButtonClasses, "aria-label": "Toggle closed captions", "aria-pressed": this.enabled, disabled: this.isDisabled, onClick: this._onClick }, this.enabled ? (h("wdpr-icon-library", { size: "medium", icon: "media-closed-caption-on", decorative: true })) : (h("wdpr-icon-library", { size: "medium", icon: "video-closed-captioning", decorative: true }))));
    }
}, [257, "wdpr-media-player-control-captions-toggle", {
        "enabled": [4],
        "isDisabled": [4, "is-disabled"]
    }]);
const containerButtonClasses = `
    cursor-pointer p-025 flex items-center rounded-pill border border-transparent
    focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-alt-focused focus-visible:outline-solid focus-visible:outline-offset-2
    text-icon-actionable-inverse-default bg-transparent
    disabled:cursor-not-allowed disabled:opacity-500
`;
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-media-player-control-captions-toggle", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media-player-control-captions-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMediaPlayerControlCaptionsToggle);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMediaPlayerControlCaptionsToggle as W, defineCustomElement as d };
//# sourceMappingURL=p-xvJdrGIb.js.map

//# sourceMappingURL=p-xvJdrGIb.js.map