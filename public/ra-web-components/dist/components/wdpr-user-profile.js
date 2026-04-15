import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { l as loadIconContent, d as defineCustomElement$6 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$7 } from './p-DS0cKrSV.js';
import { d as defineCustomElement$5 } from './p-_QubyXiP.js';
import { d as defineCustomElement$4 } from './p-Df6D6b08.js';
import { d as defineCustomElement$3 } from './p-BOubPl_u.js';
import { d as defineCustomElement$2 } from './p-DsPXJJ-e.js';

const wdprUserProfileCss = ":host{display:inline-block}::slotted(*){width:100%}";

const WdprUserProfile$1 = /*@__PURE__*/ proxyCustomElement(class WdprUserProfile extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.signOutClicked = createEvent(this, "wdprSignoutButtonClicked", 7);
        this.userSettingsClicked = createEvent(this, "wdprUserSettingsClicked", 7);
    }
    get el() { return this; }
    userName;
    hubId;
    initials;
    imageSrc;
    disabled = false;
    statusMessage;
    settingsHref = '#';
    showNotification = false;
    notificationLabel = 'You have new notifications';
    _badgeSvg = '';
    _hasActionSlotContent = false;
    signOutClicked;
    userSettingsClicked;
    componentDidLoad() {
        const slot = this.el.shadowRoot?.querySelector('slot[name="action"]');
        if (slot) {
            const updateSlot = () => {
                this._hasActionSlotContent = slot.assignedNodes({ flatten: true }).length > 0;
            };
            slot.addEventListener('slotchange', updateSlot);
            updateSlot();
        }
    }
    async componentWillLoad() {
        const svg = await loadIconContent('user-profile-badge');
        if (svg) {
            this._badgeSvg = svg
                .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')
                .replace('<svg', '<svg class="absolute inset-0 w-full h-full" aria-hidden="true"');
        }
    }
    _renderAvatar() {
        if (this.imageSrc) {
            return (h("div", { class: "relative flex items-center justify-center mb-200 w-[120px] h-[120px]" }, h("wdpr-media", { src: this.imageSrc, alt: this.userName, aspect: "square", shape: "round", objectFit: "cover", class: "w-full h-full" })));
        }
        return (h("div", { class: "relative mb-200 w-32 h-[120px] text-text-neutral-extra-dark" }, h("div", { innerHTML: this._badgeSvg }), h("div", { class: "absolute inset-0 flex items-center justify-center pt-150" }, h("span", { class: "uppercase font-black text-[36px] leading-[54px]" }, this.initials?.substring(0, 2)))));
    }
    _renderIdentity() {
        return (h("div", { class: "mb-200 flex flex-col items-center text-center" }, h("h2", { class: "text-[20px] font-black text-text-heading m-000 p-000 leading-tight" }, this.userName), h("span", { class: "text-[14px] text-text-body uppercase mt-025" }, this.hubId)));
    }
    _handleSignOutClick = () => {
        if (!this.disabled) {
            this.signOutClicked.emit();
        }
    };
    _handleUserSettingsClick = () => {
        if (!this.disabled) {
            this.userSettingsClicked.emit();
        }
    };
    render() {
        return (h("div", { key: '514acfbaaf9fc51703d602cc06bc0d3506821cce', class: "bg-surface-default elevation-small-soft rounded-200 p-300 w-[288px] md:w-[320px]" }, h("div", { key: 'e0f81aef394f40ef5b0cfd753f950760bfbf3076', class: "flex flex-col items-center" }, this._renderAvatar(), this._renderIdentity(), h("div", { key: '32d8ad492f3add093b1a311c4032de72bd232815', class: `flex items-center justify-center gap-050${this.disabled ? ' opacity-50' : ''}${this._hasActionSlotContent ? ' mb-100' : ''}`, "aria-disabled": this.disabled ? 'true' : undefined, inert: this.disabled || undefined }, h("slot", { key: 'e225a5be45df57bb04af00a6333086d4e8181f8b', name: "action" }), this.showNotification && this._hasActionSlotContent && (h("wdpr-notification-indicator", { key: '1b0f09efb95f7691169be91c64dc1f8142fd5323', size: "small", type: "alert", decorative: false, "a11y-label": this.notificationLabel }))), h("div", { key: 'a6a4f10e326c2a8229e2de6b2c5098bc85fce8d7', class: "mb-100" }, h("wdpr-button", { key: '0c13851f572953f9ac08490a3cf9e2efb4c9d98b', variant: "text", disabled: this.disabled, onClick: this._handleUserSettingsClick, size: "medium" }, "User Settings")), this.statusMessage && (h("div", { key: 'e73e0c3554682bedaaa92d733639b5fa18dbf925', class: "mb-200 w-full flex justify-center" }, h("wdpr-inline-message", { key: '7ee0e1cd7f4d6c7438855aa80c98a7ae6c6da5da', variant: "informational", size: "small" }, this.statusMessage))), h("div", { key: 'df77222619e80b52fb474c4564013fce60c8bb0b', class: "w-full" }, h("wdpr-button", { key: 'ff530b632002a9c4a041cac1526a0d8860ab17c0', onClick: this._handleSignOutClick, variant: "tertiary", disabled: this.disabled, display: "block", size: "medium" }, "Sign Out")))));
    }
    static get style() { return wdprUserProfileCss; }
}, [257, "wdpr-user-profile", {
        "userName": [1, "user-name"],
        "hubId": [1, "hub-id"],
        "initials": [1],
        "imageSrc": [1, "image-src"],
        "disabled": [4],
        "statusMessage": [1, "status-message"],
        "settingsHref": [1, "settings-href"],
        "showNotification": [4, "show-notification"],
        "notificationLabel": [1, "notification-label"],
        "_badgeSvg": [32],
        "_hasActionSlotContent": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-user-profile", "wdpr-button", "wdpr-icon-library", "wdpr-inline-message", "wdpr-media", "wdpr-notification-indicator", "wdpr-status-icon"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-user-profile":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprUserProfile$1);
            }
            break;
        case "wdpr-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-media":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-notification-indicator":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprUserProfile = WdprUserProfile$1;
const defineCustomElement = defineCustomElement$1;

export { WdprUserProfile, defineCustomElement };
//# sourceMappingURL=wdpr-user-profile.js.map

//# sourceMappingURL=wdpr-user-profile.js.map