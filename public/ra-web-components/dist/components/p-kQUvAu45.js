import { p as proxyCustomElement, H, h } from './p-BRIGwGQo.js';

const WdprProgressSegment = /*@__PURE__*/ proxyCustomElement(class WdprProgressSegment extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
    }
    status = 'pending';
    position = 'middle';
    get _isFilled() {
        return this.status === 'active' || this.status === 'complete';
    }
    get _bgClass() {
        return this._isFilled ? 'bg-surface-neutral-extra-dark' : 'bg-surface-neutral-light';
    }
    get _roundingClass() {
        if (this.position === 'start')
            return 'rounded-l-pill';
        if (this.position === 'end')
            return 'rounded-r-pill';
        return '';
    }
    get _terminatorClass() {
        switch (this.position) {
            case 'start':
                // Start segments have a diagonal cut on the right side only
                return '[clip-path:polygon(0%_0%,100%_0%,calc(100%-var(--wdpr-terminator))_100%,0%_100%)]';
            case 'end':
                // End segments have a diagonal cut on the left side only
                return '[clip-path:polygon(var(--wdpr-terminator)_0%,100%_0%,100%_100%,0%_100%)]';
            case 'middle':
            default:
                // Middle segments have diagonal cuts on both sides
                return '[clip-path:polygon(var(--wdpr-terminator)_0%,100%_0%,calc(100%-var(--wdpr-terminator))_100%,0%_100%)]';
        }
    }
    render() {
        return (h("div", { key: '5da5683e558bb889a647eb3fed6bcacf7d8ff8dc', class: `relative h-075 w-full ${this._bgClass} ${this._roundingClass} ${this._terminatorClass}`, part: "segment", "aria-hidden": "true", style: { '--wdpr-terminator': 'var(--theme-dimension-075)' } }, this.status !== 'complete' && this.position === 'end' && (h("div", { key: '802e7408b14b7491fb78f335470619f51dca1edf', class: "absolute top-[1px] right-[1px] w-dimension-050 h-dimension-050 shrink-0 bg-surface-neutral-extra-dark rounded-pill", part: "stop-indicator" }))));
    }
}, [257, "wdpr-progress-segment", {
        "status": [513],
        "position": [513]
    }]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-progress-segment"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-progress-segment":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprProgressSegment);
            }
            break;
    } });
}

export { WdprProgressSegment as W, defineCustomElement as d };
//# sourceMappingURL=p-kQUvAu45.js.map

//# sourceMappingURL=p-kQUvAu45.js.map