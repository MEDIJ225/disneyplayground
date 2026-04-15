import { r as registerInstance, a as getElement, h } from './index-CykM8GCN.js';

const WdprReadMoreButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    disabled = false;
    expanded = false;
    render() {
        return (h("button", { key: '803e72e55a9066923212beb4dd0c21732e46cc87', type: "button", class: baseClasses, disabled: this.disabled, "aria-expanded": String(this.expanded) }, h("slot", { key: '0a835a073ae5c367dc7bd50752c18be070f4244c' })));
    }
};
const baseClasses = `
inline-flex items-start align-middle no-underline component-medium cursor-pointer rounded-075
text-text-actionable-default hover:text-text-actionable-hover active:text-text-actionable-focused
disabled:text-text-actionable-disabled disabled:cursor-not-allowed
focus:outline-none focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused
focus-visible:outline-solid focus-visible:outline-offset-2
`;

export { WdprReadMoreButton as wdpr_read_more_button };
//# sourceMappingURL=wdpr-read-more-button.entry.js.map

//# sourceMappingURL=wdpr-read-more-button.entry.js.map