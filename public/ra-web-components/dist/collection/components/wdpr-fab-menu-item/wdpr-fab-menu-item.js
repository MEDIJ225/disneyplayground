import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprFabMenuItem {
    _isHover = false;
    _isMousedown = false;
    item;
    isLast = false;
    wdprChange;
    _handleClick() {
        if (this.item.disabled) {
            return;
        }
        this.wdprChange.emit(this.item);
    }
    get textColorClass() {
        if (this.item.disabled) {
            return 'text-text-actionable-alt-disabled';
        }
        return this._isHover || this._isMousedown ? 'text-text-default' : 'text-text-actionable-alt-default';
    }
    get _labelClasses() {
        return customTwMerge(fabMenuItemLabelClasses, this.textColorClass);
    }
    get menuItemClasses() {
        const textColorClass = this.textColorClass;
        const marginClass = this.isLast ? '' : 'mb-100';
        return customTwMerge(fabMenuItemBaseClasses, marginClass, textColorClass);
    }
    render() {
        return (h("button", { key: '951011608071fea59d22238c8965b3a720b11d64', type: "button", role: "menuitem", disabled: this.item.disabled ? true : false, class: this.menuItemClasses, onClick: this._handleClick.bind(this), "aria-label": this.item.ariaLabel || undefined, "aria-disabled": this.item.disabled ? 'true' : undefined, onMouseDown: () => this._isMousedown = true, onMouseUp: () => this._isMousedown = false, onMouseEnter: () => this._isHover = true, onMouseLeave: () => this._isHover = false }, h("div", { key: '981815e3b36864564c65d9dbf7b485cc503b4c2e', class: `${this.textColorClass} mr-150 flex items-center` }, h("wdpr-icon-library", { key: 'c832463527680453da8ec86e2c23c160e8a9cb38', icon: this.item.icon, size: 'medium', decorative: true })), h("span", { key: 'f2cb3c2724f8ab4c8f7a372e04de3a5b5b39e4df', class: this._labelClasses }, this.item.label)));
    }
    static get is() { return "wdpr-fab-menu-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() {
        return {
            "item": {
                "type": "unknown",
                "attribute": "item",
                "mutable": false,
                "complexType": {
                    "original": "FABMenuItemConfig",
                    "resolved": "FABMenuItemConfig",
                    "references": {
                        "FABMenuItemConfig": {
                            "location": "import",
                            "path": "./wdpr-fab-menu-item.model",
                            "id": "src/components/wdpr-fab-menu-item/wdpr-fab-menu-item.model.ts::FABMenuItemConfig"
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
                "setter": false
            },
            "isLast": {
                "type": "boolean",
                "attribute": "is-last",
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
            }
        };
    }
    static get states() {
        return {
            "_isHover": {},
            "_isMousedown": {}
        };
    }
    static get events() {
        return [{
                "method": "wdprChange",
                "name": "wdprChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "complexType": {
                    "original": "FABMenuItemConfig",
                    "resolved": "FABMenuItemConfig",
                    "references": {
                        "FABMenuItemConfig": {
                            "location": "import",
                            "path": "./wdpr-fab-menu-item.model",
                            "id": "src/components/wdpr-fab-menu-item/wdpr-fab-menu-item.model.ts::FABMenuItemConfig"
                        }
                    }
                }
            }];
    }
}
const fabMenuItemLabelClasses = 'text-body-large font-body-alt leading-body-large tracking-default';
const fabMenuItemBaseClasses = `flex items-center rounded-pill select-none
                                disabled:bg-surface-disabled disabled:text-text-actionable-alt-disabled disabled:cursor-not-allowed
                                bg-surface-default px-300 py-200 cursor-pointer w-[calc(100vw-48px)] sm:w-auto sm:min-w-[342px] h-dimension-700 
                                hover:bg-surface-actionable-alt-hover active:bg-surface-actionable-alt-pressed
                                focus:outline-none focus-visible:outline-solid focus-visible:outline-offset-2
                                focus-visible:outline-037 focus-visible:outline-stroke-actionable-focused`;
//# sourceMappingURL=wdpr-fab-menu-item.js.map
