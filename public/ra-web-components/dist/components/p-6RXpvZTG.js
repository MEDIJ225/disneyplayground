import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$1 } from './p-CiDhVxgt.js';

const WdprMediaPlayerFullscreenToggle = /*@__PURE__*/ proxyCustomElement(class WdprMediaPlayerFullscreenToggle extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.wdprFullscreenToggle = createEvent(this, "wdprFullscreenToggle", 7);
    }
    isDisabled = false;
    wdprFullscreenToggle;
    render() {
        return (h("button", { key: '1c1780ccaebc4c523a99d05ec7a10208d85ef5f4', class: containerButtonClasses, "aria-label": "Toggle fullscreen", disabled: this.isDisabled, onClick: () => this.wdprFullscreenToggle.emit() }, h("wdpr-icon-library", { key: '0a61099fa1540c7fc4e441bf83b892c682aa3978', size: "medium", icon: "expand-gallery", decorative: true })));
    }
}, [257, "wdpr-media-player-control-fullscreen-toggle", {
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
    const components = ["wdpr-media-player-control-fullscreen-toggle", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-media-player-control-fullscreen-toggle":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprMediaPlayerFullscreenToggle);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$1();
            }
            break;
    } });
}

export { WdprMediaPlayerFullscreenToggle as W, defineCustomElement as d };
//# sourceMappingURL=p-6RXpvZTG.js.map

//# sourceMappingURL=p-6RXpvZTG.js.map