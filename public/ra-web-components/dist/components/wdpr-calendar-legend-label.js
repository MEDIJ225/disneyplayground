import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';
import { d as defineCustomElement$2 } from './p-CiDhVxgt.js';

const WdprCalendarLegendLabel$1 = /*@__PURE__*/ proxyCustomElement(class WdprCalendarLegendLabel extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    render() {
        return (h("div", { key: '3202e5323524d482302a0217677a2a8b4933ee53', class: "flex flex-row items-center gap-100 bg-surface-default text-text-label label-large mt-150", part: "calendar-legend-label" }, h("div", { key: '3d5212beb2b6124eafde6245d173addedd6ca5e8', class: "text-text-neutral-dark" }, h("slot", { key: '65e21cba9877baa366ffe78ec59e598fdca2204e', name: "leading-icon" }, h("wdpr-icon-library", { key: 'ab95a67ffad3b18d9c783f1a45adf3a98ff8de06', icon: "calendar-icon", size: "medium", decorative: true }))), h("slot", { key: 'c65a07678c67a045af702ecd48d5dbf57be4b979' })));
    }
}, [257, "wdpr-calendar-legend-label"]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-calendar-legend-label", "wdpr-icon-library"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-calendar-legend-label":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprCalendarLegendLabel$1);
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprCalendarLegendLabel = WdprCalendarLegendLabel$1;
const defineCustomElement = defineCustomElement$1;

export { WdprCalendarLegendLabel, defineCustomElement };
//# sourceMappingURL=wdpr-calendar-legend-label.js.map

//# sourceMappingURL=wdpr-calendar-legend-label.js.map