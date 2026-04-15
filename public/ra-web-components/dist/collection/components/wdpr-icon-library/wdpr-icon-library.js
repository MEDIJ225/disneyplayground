import { h } from "@stencil/core";
import { generateRandId } from "../../utils/utils";
import { loadIconContent } from "../../utils/icon-registry";
export class WdprIconLibrary {
    /**
     * The host element
     */
    el;
    /**
     * Icon Name
     */
    icon = null;
    /**
     * Icon size
     */
    size;
    /**
     * Icon title
     */
    ariaTitle = null;
    /**
     * Icon description
     */
    ariaDescription = null;
    /**
     * Accessible name for the icon (used for aria-label). Overrides ariaTitle.
     */
    a11yLabel = '';
    /**
     * If true, the icon is marked as decorative (aria-hidden="true") and ignores all other ARIA props.
     */
    decorative = false;
    svgContent = '';
    error = false;
    /**
     * TODO remove this mapping when final classes in place
     * Map size prop to Tailwind classes
     */
    sizeClasses = {
        xxsmall: 'size-icon-xxsmall',
        xsmall: 'size-icon-xsmall',
        small: 'size-icon-small',
        medium: 'size-icon-medium',
        'medium-alt': 'size-icon-medium-alt',
        large: 'size-icon-large',
        xlarge: 'size-icon-xlarge',
    };
    get iconClass() {
        return `inline-flex items-center justify-center ${this.sizeClasses[this.size]}`;
    }
    render() {
        if (this.error) {
            return this.renderErrorIcon();
        }
        return h("div", { innerHTML: this.svgContent });
    }
    async componentWillLoad() {
        await this.loadIconPathData();
    }
    async loadIconPathData() {
        if (!this.icon) {
            this.svgContent = '';
            this.error = false;
            return;
        }
        try {
            const svgText = await loadIconContent(this.icon);
            if (!svgText) {
                throw new Error(`Icon "${this.icon}" not found`);
            }
            this.svgContent = this.processSvg(svgText);
            this.error = false;
        }
        catch (error) {
            console.error('Error loading SVG:', error);
            this.error = true;
        }
    }
    processSvg(svg) {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;
        // Remove width and height attributes
        svgElement.removeAttribute('width');
        svgElement.removeAttribute('height');
        // TODO remove this mapping when final classes in place
        svgElement.setAttribute('class', `${this.size ? this.sizeClasses[this.size] : 'h-fit'}`);
        //svgElement.setAttribute('class', `block fill-current ${this.size}`);
        // Replace all fill attributes with "currentColor"
        this.replaceFillWithCurrentColor(svgElement);
        // Add accessibility attributes
        this.addAccessibilityAttributes(svgElement);
        // Serialize the SVG back to a string
        const serializer = new XMLSerializer();
        return serializer.serializeToString(svgElement);
    }
    replaceFillWithCurrentColor(element) {
        if (element.hasAttribute('fill')) {
            element.setAttribute('fill', 'currentColor');
        }
        Array.from(element.children).forEach(child => {
            this.replaceFillWithCurrentColor(child);
        });
    }
    addAccessibilityAttributes(svgElement) {
        const uniqueId = generateRandId();
        // When decorative, aria-hidden="true"
        if (this.decorative || this.el.getAttribute('aria-hidden') === 'true') {
            svgElement.removeAttribute('role');
            svgElement.removeAttribute('aria-label');
            svgElement.removeAttribute('aria-labelledby');
            svgElement.removeAttribute('aria-describedby');
            svgElement.setAttribute('aria-hidden', 'true');
            return;
        }
        const hasAccessibleName = Boolean(this.ariaTitle || this.a11yLabel || this.ariaDescription);
        if (!hasAccessibleName) {
            svgElement.removeAttribute('role');
            svgElement.removeAttribute('aria-label');
            svgElement.removeAttribute('aria-labelledby');
            svgElement.removeAttribute('aria-describedby');
            svgElement.setAttribute('aria-hidden', 'true');
            return;
        }
        svgElement.setAttribute('role', 'img');
        const labeledBy = [];
        if (this.ariaTitle) {
            // Use <title> with aria-labelledby
            const titleId = `svg-title-${uniqueId}`;
            const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            titleElement.id = titleId;
            titleElement.textContent = this.ariaTitle;
            svgElement.prepend(titleElement);
            labeledBy.push(titleId);
        }
        else if (this.a11yLabel) {
            svgElement.setAttribute('aria-label', this.a11yLabel);
        }
        else if (this.ariaDescription) {
            svgElement.setAttribute('aria-label', this.ariaDescription);
        }
        // Additional context for screen readers
        if (this.ariaDescription) {
            const descId = `svg-description-${uniqueId}`;
            const descElement = document.createElementNS('http://www.w3.org/2000/svg', 'desc');
            descElement.id = descId;
            descElement.textContent = this.ariaDescription;
            svgElement.setAttribute('aria-describedby', descId);
            svgElement.appendChild(descElement);
        }
        if (labeledBy.length > 0) {
            svgElement.setAttribute('aria-labelledby', labeledBy.join(' '));
        }
    }
    renderErrorIcon() {
        return (h("svg", { id: "error", class: this.size ? this.sizeClasses[this.size] : 'h-fit', viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", role: "img", "aria-labelledby": "error-title error-description" }, h("g", { "clip-path": "url(#clip0_10924_22417)" }, h("rect", { x: "0.5", y: "0.5", width: "23", height: "23", fill: "#FFECF8", stroke: "#CD519D", "stroke-miterlimit": "2.61313", "stroke-linejoin": "bevel", "stroke-dasharray": "1 2" })), h("defs", null, h("clipPath", { id: "clip0_10924_22417" }, h("rect", { width: "24", height: "24", fill: "white" })))));
    }
    static get is() { return "wdpr-icon-library"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "icon": {
                "type": "string",
                "attribute": "icon",
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
                    "text": "Icon Name"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "IconLibrarySize",
                    "resolved": "\"large\" | \"medium\" | \"medium-alt\" | \"small\" | \"xlarge\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "IconLibrarySize": {
                            "location": "import",
                            "path": "./wdpr-icon-library.model",
                            "id": "src/components/wdpr-icon-library/wdpr-icon-library.model.ts::IconLibrarySize"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Icon size"
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "ariaTitle": {
                "type": "string",
                "attribute": "aria-title",
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
                    "text": "Icon title"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
            },
            "ariaDescription": {
                "type": "string",
                "attribute": "aria-description",
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
                    "text": "Icon description"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
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
                    "text": "Accessible name for the icon (used for aria-label). Overrides ariaTitle."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "decorative": {
                "type": "boolean",
                "attribute": "decorative",
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
                    "text": "If true, the icon is marked as decorative (aria-hidden=\"true\") and ignores all other ARIA props."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "svgContent": {},
            "error": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "icon",
                "methodName": "loadIconPathData"
            }];
    }
}
//# sourceMappingURL=wdpr-icon-library.js.map
