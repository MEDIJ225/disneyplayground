import { h } from "@stencil/core";
import QRCode from "qrcode";
export class WdprQrcode {
    _qrCodeContainer;
    el;
    _isLoaded = false;
    /**
     * The text or URL to encode in the QR code.
     */
    text;
    /**
     * The size (width and height) of the QR code in pixels.
     */
    size = 128;
    /**
     * Accessible label for the QR code. Defaults to "QR code for: [text]"; can be
     * overridden for long URLs or sensitive data.
     */
    a11yLabel;
    /**
     * Error correction level for the QR code.
     * L = Low (7%), M = Medium (15%), Q = Quartile (25%), H = High (30%)
     */
    correctionLevel = 'H';
    handlePropsChange() {
        this._generateQRCode();
    }
    componentDidLoad() {
        this._isLoaded = true;
        this._generateQRCode();
    }
    _generateQRCode() {
        if (!this._isLoaded || !this._qrCodeContainer || !this.text) {
            return;
        }
        try {
            const qr = QRCode.create(this.text, {
                errorCorrectionLevel: this.correctionLevel,
            });
            const moduleCount = qr.modules.size;
            const data = qr.modules.data;
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', `0 0 ${moduleCount} ${moduleCount}`);
            svg.setAttribute('width', String(this.size));
            svg.setAttribute('height', String(this.size));
            svg.setAttribute('shape-rendering', 'crispEdges');
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('focusable', 'false');
            svg.setAttribute('part', 'qr-code');
            svg.style.display = 'block';
            const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bg.setAttribute('fill', 'var(--qr-bg, var(--color-white))');
            bg.setAttribute('width', String(moduleCount));
            bg.setAttribute('height', String(moduleCount));
            svg.appendChild(bg);
            for (let row = 0; row < moduleCount; row++) {
                for (let col = 0; col < moduleCount; col++) {
                    if (data[row * moduleCount + col]) {
                        const cell = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        cell.setAttribute('x', String(col));
                        cell.setAttribute('y', String(row));
                        cell.setAttribute('width', '1');
                        cell.setAttribute('height', '1');
                        cell.setAttribute('fill', 'var(--qr-fill, var(--color-black))');
                        svg.appendChild(cell);
                    }
                }
            }
            this._qrCodeContainer.innerHTML = '';
            this._qrCodeContainer.appendChild(svg);
        }
        catch (error) {
            console.error('Failed to generate QR code:', error);
        }
    }
    render() {
        return (h("div", { key: 'f88861a3dd6730b3075162958b84152d0aa0d5cd', class: "inline-flex items-center justify-center", ref: (el) => (this._qrCodeContainer = el), "aria-label": this.a11yLabel ?? `QR code for: ${this.text ?? ''}`, role: "img" }));
    }
    static get is() { return "wdpr-qrcode"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host { display: inline-block; }"; }
    static get properties() {
        return {
            "text": {
                "type": "string",
                "attribute": "text",
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
                    "text": "The text or URL to encode in the QR code."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "size": {
                "type": "number",
                "attribute": "size",
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
                    "text": "The size (width and height) of the QR code in pixels."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "128"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Accessible label for the QR code. Defaults to \"QR code for: [text]\"; can be\noverridden for long URLs or sensitive data."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "correctionLevel": {
                "type": "string",
                "attribute": "correction-level",
                "mutable": false,
                "complexType": {
                    "original": "QRCodeCorrectionLevel",
                    "resolved": "\"H\" | \"L\" | \"M\" | \"Q\"",
                    "references": {
                        "QRCodeCorrectionLevel": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-qrcode/wdpr-qrcode.tsx",
                            "id": "src/components/wdpr-qrcode/wdpr-qrcode.tsx::QRCodeCorrectionLevel"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Error correction level for the QR code.\nL = Low (7%), M = Medium (15%), Q = Quartile (25%), H = High (30%)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'H'"
            }
        };
    }
    static get states() {
        return {
            "_isLoaded": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "text",
                "methodName": "handlePropsChange"
            }, {
                "propName": "size",
                "methodName": "handlePropsChange"
            }, {
                "propName": "correctionLevel",
                "methodName": "handlePropsChange"
            }];
    }
}
//# sourceMappingURL=wdpr-qrcode.js.map
