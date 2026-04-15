import { h } from "@stencil/core";
import { customTwMerge, findAssignedElementsByTag } from "../../utils/utils";
import { cardBaseClasses, cardBaseBorderClasses, cardDisabledClasses, cardElevationClasses } from "../../utils/card-content-renderer";
import { getCardStateClasses, handleCardKeyDown, handleCardClick } from "../../utils/card.util";
export class WdprCardLarge {
    el;
    disabled = false;
    fullWidth = false;
    name;
    a11yLabel;
    selected = false;
    isMouseDown = false;
    wdprClick;
    wdprDisabledChange;
    _wdprCardLargeContent;
    internals;
    componentDidLoad() {
        this._findCardContent();
        this._updateFormValue();
    }
    async refreshInternals() {
        this._updateFormValue();
    }
    handleDisabledChange() {
        this._findCardContent();
        this.wdprDisabledChange.emit(this.disabled);
        this._updateFormValue();
    }
    onSelectedPropChange() {
        this._updateFormValue();
    }
    handleFormReset() {
        this.selected = false;
        this._updateFormValue();
    }
    _handleSelectedChange = () => {
        this.selected = !this.selected;
        this.wdprClick.emit();
    };
    _updateFormValue = () => {
        const shouldSubmit = !this.disabled;
        const formValue = shouldSubmit ? (this.selected ? 'selected' : 'not selected') : null;
        queueMicrotask(() => {
            if (this.internals && this.name != null) {
                this.internals?.setFormValue?.(formValue);
            }
        });
        this._updateValidity();
    };
    _updateValidity = () => {
        if (this.disabled) {
            this.internals?.setValidity?.({});
            return;
        }
        const isValid = this.selected != null && typeof this.selected === 'boolean';
        if (isValid) {
            this.internals?.setValidity?.({});
        }
        else {
            this.internals?.setValidity?.({ valueMissing: true }, 'this field is required');
        }
    };
    _findCardContent = () => {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        if (slot) {
            const assignedElement = findAssignedElementsByTag(slot, 'wdpr-card-large-content');
            this._wdprCardLargeContent = assignedElement;
            if (this._wdprCardLargeContent) {
                this._wdprCardLargeContent.forEach(content => {
                    const button = content.querySelector?.('wdpr-button');
                    if (button) {
                        button.disabled = this.disabled;
                    }
                    content.disabled = this.disabled;
                });
            }
        }
    };
    get mediaSection() {
        const opacityClass = this.disabled ? 'opacity-600' : '';
        return (h("div", { class: `${opacityClass} block w-full rounded-t-150 overflow-hidden` }, h("slot", { name: "media" }), h("div", { class: "flex absolute top-4 left-4" }, h("slot", { name: "badge" })), h("div", { class: 'absolute top-4 right-4' }, h("slot", { name: "favorite-button" }))));
    }
    get contentSection() {
        return (h("div", { class: 'flex flex-col flex-1 w-full p-200' }, h("slot", { name: "content" })));
    }
    _handleKeyDown = (e) => {
        handleCardKeyDown(e, this.el, this.disabled, this._handleSelectedChange);
    };
    _handleClick = (e) => {
        handleCardClick(e, this.disabled, this._handleSelectedChange);
    };
    get cardClasses() {
        const cardWidthClasses = this.fullWidth ? '!w-full sm:!w-full !min-w-0 !max-w-none' : '';
        if (this.disabled) {
            return customTwMerge(cardDisabledClasses, cardWidthClasses);
        }
        const cardStateClasses = getCardStateClasses(this.selected, this.isMouseDown);
        return customTwMerge(cardBaseClasses, cardBaseBorderClasses, cardStateClasses, cardElevationClasses, cardWidthClasses);
    }
    render() {
        return (h("div", { key: '6b6d77ee5343c61ad9c05ba22e29d22bf3fafe8f', class: this.cardClasses, tabIndex: this.disabled ? -1 : 0, role: "button", "aria-label": this.a11yLabel, onClick: this._handleClick, onKeyDown: this._handleKeyDown, onMouseDown: () => this.isMouseDown = true, onMouseUp: () => this.isMouseDown = false }, this.mediaSection, this.contentSection));
    }
    static get is() { return "wdpr-card-large"; }
    static get encapsulation() { return "shadow"; }
    static get formAssociated() { return true; }
    static get styles() { return ":host { display: block; width: 100%; }"; }
    static get properties() {
        return {
            "disabled": {
                "type": "boolean",
                "attribute": "disabled",
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
            "fullWidth": {
                "type": "boolean",
                "attribute": "full-width",
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
            "name": {
                "type": "string",
                "attribute": "name",
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
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": true
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
            }
        };
    }
    static get states() {
        return {
            "selected": {},
            "isMouseDown": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprClick",
                "name": "wdprClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "wdprDisabledChange",
                "name": "wdprDisabledChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "refreshInternals": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "disabled",
                "methodName": "handleDisabledChange"
            }, {
                "propName": "selected",
                "methodName": "onSelectedPropChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "formreset",
                "method": "handleFormReset",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
    static get attachInternalsMemberName() { return "internals"; }
}
//# sourceMappingURL=wdpr-card-large.js.map
