import { h, Host } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprOverlay {
    el;
    open = false;
    overlayRole = 'region';
    overlayStyle = 'default';
    a11yLabel;
    cover = false;
    zIndex = 10;
    /** surface = your card-like surface; scrim = full-bleed backdrop */
    variant = 'surface';
    /** Background class for the overlay */
    bgClass;
    /** Click on empty overlay area */
    overlayClick;
    onSurfaceClick = (e) => {
        if (e.target === e.currentTarget)
            this.overlayClick.emit();
    };
    get surfaceClass() {
        const base = this.cover
            ? 'absolute inset-0 w-full h-full box-border flex flex-col'
            : 'inline-flex flex-col';
        const visible = this.open ? 'opacity-1250 pointer-events-auto' : 'hidden opacity-000 pointer-events-none';
        if (this.variant === 'scrim') {
            const bg = this.bgClass ?? 'bg-page-overlay';
            return customTwMerge(base, 'justify-center items-center rounded-000', bg, visible);
        }
        const overlayStyleMap = {
            light: 'bg-page-overlay-light',
            disabled: 'bg-page-overlay-disabled',
            default: 'bg-page-overlay',
        };
        const bg = this.overlayStyle && overlayStyleMap[this.overlayStyle]
            ? `${overlayStyleMap[this.overlayStyle]} ${this.bgClass ?? ''}`
            : this.bgClass ?? 'bg-page-overlay';
        return customTwMerge(base, bg, visible, this.cover ? 'rounded-000' : '', 'justify-end p-100 items-start gap-100');
    }
    render() {
        return (h(Host, { key: '1b48ccb8a9c306dcfec6a93e9103b0c6028caae1', "aria-hidden": this.open ? 'false' : 'true', style: this.cover ? { zIndex: String(this.zIndex) } : {} }, h("div", { key: 'e2d7c2f842d7457a48581926cb56eefb5c25c056', class: this.surfaceClass, role: this.overlayRole, "aria-label": this.a11yLabel, onClick: this.onSurfaceClick }, h("slot", { key: 'de4b331bfac163870c3245c375841125af06724f' }))));
    }
    static get is() { return "wdpr-overlay"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "open": {
                "type": "boolean",
                "attribute": "open",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "overlayRole": {
                "type": "string",
                "attribute": "overlay-role",
                "mutable": false,
                "complexType": {
                    "original": "OverlayRole",
                    "resolved": "\"dialog\" | \"region\"",
                    "references": {
                        "OverlayRole": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-overlay/wdpr-overlay.tsx",
                            "id": "src/components/wdpr-overlay/wdpr-overlay.tsx::OverlayRole"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'region'"
            },
            "overlayStyle": {
                "type": "string",
                "attribute": "overlay-style",
                "mutable": false,
                "complexType": {
                    "original": "'light' | 'disabled' | 'default'",
                    "resolved": "\"default\" | \"disabled\" | \"light\"",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
            },
            "a11yLabel": {
                "type": "string",
                "attribute": "a11y-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "cover": {
                "type": "boolean",
                "attribute": "cover",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "false"
            },
            "zIndex": {
                "type": "number",
                "attribute": "z-index",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "10"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "OverlayVariant",
                    "resolved": "\"scrim\" | \"surface\"",
                    "references": {
                        "OverlayVariant": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-overlay/wdpr-overlay.tsx",
                            "id": "src/components/wdpr-overlay/wdpr-overlay.tsx::OverlayVariant"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "surface = your card-like surface; scrim = full-bleed backdrop"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'surface'"
            },
            "bgClass": {
                "type": "string",
                "attribute": "bg-class",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Background class for the overlay"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "overlayClick",
                "name": "overlayClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Click on empty overlay area"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-overlay.js.map
