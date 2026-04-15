import { h } from "@stencil/core";
import { customTwMerge } from "../../utils/utils";
export class WdprList {
    _listEl;
    /**
     * Reference to the component's host element.
     * @type {HTMLWdprListElement}
     */
    el;
    _computedScrollStyle = {};
    /**
     * The style to apply to the list items.
     * @type {ListStyle}
     */
    listStyle = 'text-only';
    /**
     * The spacing to apply between list items.
     * @type {Spacing}
     */
    spacing = 'default';
    /**
     * Shows or hides the leading text.
     * @type {boolean}
     */
    showLeadingText = true;
    /**
     * Shows or hides the text link.
     * @type {boolean}
     */
    showTextLink = true;
    /**
     * The name of the radio group.
     * @type {string}
     */
    name;
    /**
     * The items to display in the list.
     * @type {ListItem[]}
     */
    items = [];
    /**
     * The icon to display next to the list items.
     * @type {string}
     */
    showDivider = true;
    /**
     * The ID of the item to be visually highlighted.
     * @type {string | number}
     */
    highlightedId;
    /**
     * Emitted when a list item is checked or unchecked.
     * @type {EventEmitter<{ selectedItem: ListItem }>}
     */
    itemChange;
    // ------------------------------------------------------------------
    // Text Header Props
    // ------------------------------------------------------------------
    /**
     * The main text to display in the header.
     * @type {string}
     */
    headerLabel;
    /**
     * The subtext to display below the main header.
     * @type {string}
     */
    subtextLabel;
    /**
     * Shows or hides the leading icon.
     */
    showHeaderLeadingIcon = false;
    /**
     * The name of the leading icon.
     */
    headerLeadingIconName;
    /**
     * Shows or hides the trailing icon.
     */
    showHeaderTrailingIcon = false;
    /**
     * The name of the trailing icon.
     */
    headerTrailingIconName;
    // ------------------------------------------------------------------
    // Text Link Props
    // ------------------------------------------------------------------
    /**
     * **Required** The text to display in the link.
     * @type {string}
     */
    label;
    /**
     * The URL to navigate to when the link is clicked.
     * @type {string}
     */
    href;
    /**
     * The target attribute of the link. Possible values: '_blank', '_self', '_parent', '_top'.
     * @type {string}
     */
    target = '_self';
    /**
     * The rel attribute of the link.
     * @type {string}
     */
    rel;
    /**
     * The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'.
     * @type {TextLinkSizes}
     */
    size = 'medium';
    /**
     * The variant of the text link. Possible values: 'primary', 'secondary'.
     * @type {TextLinkVariants}
     */
    variant = 'primary';
    /**
     * Defines a string value that labels the element being focused.
     * Use this when the visible text is ambiguous (e.g., "Read more").
     * @type {string}
     */
    linkAriaLabel = '';
    /**
     * Shows or hides the text link leading icon.
     */
    showLinkLeadingIcon = false;
    /**
     * The name of the text link leading icon.
     */
    linkLeadingIconName;
    /**
     * Shows or hides the text link trailing icon.
     */
    showLinkTrailingIcon = false;
    /**
     * The name of the text link trailing icon.
     */
    linkTrailingIconName;
    /**
     * The maximum number of items to display. A scrollbar will be shown if the total count exceeds this limit.
     */
    maxViewableItems = null;
    componentDidRender() {
        requestAnimationFrame(() => {
            this._calculateListHeight();
        });
    }
    _calculateListHeight() {
        if (!this._listEl || !this.items || this.items.length === 0 || !this.maxViewableItems) {
            return;
        }
        const listItems = this._listEl.querySelectorAll('li');
        const firstItem = listItems[0];
        const itemHeight = firstItem.offsetHeight;
        let gapHeight = 0;
        // Calculate Gap + Divider
        // If we have more than 1 item, we measure the distance between them
        if (listItems.length > 1) {
            const secondItem = listItems[1];
            // The distance from the top of item 1 to the top of item 2
            // implicitly includes the item height + any divider + any flex-gap
            const distanceBetweenItems = secondItem.offsetTop - firstItem.offsetTop;
            gapHeight = distanceBetweenItems - itemHeight;
        }
        const itemsToShow = Math.min(this.items.length, this.maxViewableItems);
        // If itemsToShow is 0, height is 0.
        // If itemsToShow is 1, formula results in just itemHeight (gap * 0)
        const totalHeight = itemHeight * itemsToShow + gapHeight * Math.max(0, itemsToShow - 1);
        this._computedScrollStyle = {
            maxHeight: `${totalHeight}px`,
            overflowY: this.items.length > this.maxViewableItems ? 'auto' : 'hidden',
        };
    }
    /**
     * Handles a change event for a list item and emits the itemChange event.
     * @param item The list item that was changed.
     * @param newCheckedState The new checked state of the list item.
     */
    handleChange(item, newCheckedState) {
        const updatedItem = { ...item, checked: newCheckedState };
        this.itemChange.emit({ selectedItem: updatedItem });
    }
    /**
     * Handles a change event from a radio group and emits the itemChange event accordingly.
     * Finds the list item that corresponds to the selected radio button value and emits the itemChange event with the updated list item.
     */
    handleRadioGroupChange(event) {
        const selectedValue = event.detail; // this is the value of the selected radio button
        const selectedItem = this.items.find(item => item.value === selectedValue);
        if (selectedItem) {
            this.itemChange.emit({ selectedItem: { ...selectedItem, checked: true } });
        }
    }
    /**
     * Returns a Tailwind CSS class string that controls the spacing between list items.
     * The class string is determined by the value of the `spacing` property.
     * @returns {string} The Tailwind CSS class string.
     */
    get spacingClass() {
        const spacing = {
            condensed: 'gap-y-100',
            default: 'gap-y-200',
            expanded: 'gap-y-300',
        };
        return spacing[this.spacing];
    }
    /**
     * Returns a Tailwind CSS class string for the divider's top margin.
     * This matches the gap spacing to maintain visual consistency.
     * @returns {string} The Tailwind CSS class string.
     */
    get dividerSpacingClass() {
        const spacing = {
            condensed: 'mt-100',
            default: 'mt-200',
            expanded: 'mt-300',
        };
        return spacing[this.spacing];
    }
    /**
     * Returns a Tailwind CSS class string that resets the styles of a button component.
     * The class string is used to reset the styles of the list item buttons.
     * @returns {string} The Tailwind CSS class string.
     */
    get buttonResetClasses() {
        return 'bg-transparent border-none p-0 m-0 font-inherit text-left w-full cursor-pointer';
    }
    /**
     * Renders a list item based on the provided ListItem object.
     * The rendered list item can be a checkbox, a text-only item, or an item with a leading or trailing icon.
     * The item's text and icon are conditionally styled based on the checked state of the item.
     * The item is wrapped in a reset button class string to remove any unwanted CSS styles.
     * @param {ListItem} item - The ListItem object to render.
     * @returns {JSX.Element} - The rendered list item element.
     */
    renderListItem(item) {
        const conditionalTextClasses = customTwMerge('component-large-alt text-text-body', item.checked ? 'text-text-disclaimer' : '');
        const conditionalIconClasses = customTwMerge('text-text-body', item.checked ? 'text-text-disclaimer' : '');
        const textWithIconContainerClasses = 'flex items-center gap-x-150';
        let content = null;
        switch (this.listStyle) {
            case 'checkbox':
                content = h("wdpr-checkbox", { label: item.text, checked: item.checked, onWdprChange: ev => this.handleChange(item, ev.detail.checked) });
                break;
            case 'with-leading-icon':
            case 'with-trailing-icon':
            case 'text-only':
            default:
                content = (h("button", { type: "button", class: this.buttonResetClasses, onClick: () => this.handleChange(item, !item.checked) }, this.listStyle === 'text-only' ? (h("span", { class: conditionalTextClasses }, item.text)) : (h("span", { class: textWithIconContainerClasses }, this.listStyle === 'with-leading-icon' && h("wdpr-icon-library", { class: conditionalIconClasses, icon: item.icon, size: "medium", decorative: true }), h("span", { class: conditionalTextClasses }, item.text), this.listStyle === 'with-trailing-icon' && h("wdpr-icon-library", { class: conditionalIconClasses, icon: item.icon, size: "medium", decorative: true })))));
                break;
        }
        return content;
    }
    renderRadioGroup() {
        return (h("wdpr-radio-group", { ariaLabel: this.name, onWdprChange: ev => this.handleRadioGroupChange(ev), class: "w-full" }, this.items.map((item, index) => {
            const shouldShowDivider = this.showDivider && index < this.items.length - 1;
            const isHighlighted = this.highlightedId != null && item.id === this.highlightedId;
            const itemUniqueId = `option-${item.id}`;
            return (h("div", { key: item.id, class: customTwMerge('flex flex-col', item.checked ? 'item-selected' : '', isHighlighted ? 'item-highlighted' : ''), id: itemUniqueId }, h("wdpr-radio-button", { value: item.value, label: item.text, selected: item.checked }), shouldShowDivider && h("wdpr-divider", { class: this.dividerSpacingClass })));
        })));
    }
    render() {
        const listContainerClasses = customTwMerge('flex flex-col items-start', this.spacingClass);
        const listUlClasses = customTwMerge('flex flex-col w-full', this.spacingClass);
        return (h("div", { key: '45d6b5ded690303700e625d252fe12d65db64234', class: listContainerClasses }, (this.showLeadingText || this.showTextLink) && (h("wdpr-text-header", { key: '4b6ad0b866dfd057ff1426e479bb121f9f3edf69', headerLabel: this.headerLabel, subtextLabel: this.subtextLabel }, this.showHeaderLeadingIcon && h("wdpr-icon-library", { key: '704e320009bf17072dacbbb62ab0159e067619c7', slot: "leading-icon", icon: this.headerLeadingIconName, decorative: true }), this.showHeaderTrailingIcon && h("wdpr-icon-library", { key: '352cc7ccdbd265c5637dabdcaa3ce20a7cc0c7bb', slot: "trailing-icon", icon: this.headerTrailingIconName, decorative: true }), this.showTextLink && (h("wdpr-text-link", { key: 'b6bf11f40d08168195c9fdd39571abffd5d6f4d0', slot: "text-link", href: this.href || '#', variant: this.variant, a11yLabel: this.linkAriaLabel, size: this.size, rel: this.rel, target: this.target }, this.showLinkLeadingIcon && h("wdpr-icon-library", { key: '4b90b3ce8379f92dcf044f1bb8fe813479d31233', slot: "leading-icon", icon: this.linkLeadingIconName, decorative: true }), this.label, this.showLinkTrailingIcon && h("wdpr-icon-library", { key: '103b367cb9f14924ef9eff5ff34111f0b8e4c8ac', slot: "trailing-icon", icon: this.linkTrailingIconName, decorative: true }))))), h("div", { key: '9126d42c3192828320b7e76c733915c20414ef02', class: "w-full", style: this._computedScrollStyle }, this.listStyle === 'radio' ? (this.renderRadioGroup()) : (h("ul", { class: listUlClasses, ref: el => (this._listEl = el) }, this.listStyle === 'swap' ? (h("li", null, h("slot", null))) : (this.items.map((item, index) => {
            const shouldShowDivider = this.showDivider && index < this.items.length - 1;
            const isHighlighted = this.highlightedId != null && item.id === this.highlightedId;
            const itemUniqueId = `option-${item.id}`;
            return (h("li", { key: item.id, class: customTwMerge('flex flex-col', item.checked ? 'item-selected' : '', isHighlighted ? 'item-highlighted' : ''), id: itemUniqueId }, this.renderListItem(item), shouldShowDivider && h("wdpr-divider", { class: this.dividerSpacingClass })));
        })))))));
    }
    static get is() { return "wdpr-list"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return ":host li.item-selected wdpr-checkbox::part(label),\n    :host div.item-selected wdpr-radio-button::part(label) {\n      color: var(--color-text-disclaimer);\n    }\n\n    :host li.item-highlighted,\n    :host div.item-highlighted {\n      outline: 2px solid var(--color-surface-actionable-focus);\n      outline-offset: 2px;\n    }"; }
    static get properties() {
        return {
            "listStyle": {
                "type": "string",
                "attribute": "list-style",
                "mutable": false,
                "complexType": {
                    "original": "ListStyle",
                    "resolved": "\"checkbox\" | \"radio\" | \"swap\" | \"text-only\" | \"with-leading-icon\" | \"with-trailing-icon\"",
                    "references": {
                        "ListStyle": {
                            "location": "import",
                            "path": "../../models/list.types",
                            "id": "src/models/list.types.ts::ListStyle"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{ListStyle}"
                        }],
                    "text": "The style to apply to the list items."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'text-only'"
            },
            "spacing": {
                "type": "string",
                "attribute": "spacing",
                "mutable": false,
                "complexType": {
                    "original": "Spacing",
                    "resolved": "\"condensed\" | \"default\" | \"expanded\"",
                    "references": {
                        "Spacing": {
                            "location": "import",
                            "path": "../../models/list.types",
                            "id": "src/models/list.types.ts::Spacing"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{Spacing}"
                        }],
                    "text": "The spacing to apply between list items."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'default'"
            },
            "showLeadingText": {
                "type": "boolean",
                "attribute": "show-leading-text",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Shows or hides the leading text."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "showTextLink": {
                "type": "boolean",
                "attribute": "show-text-link",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{boolean}"
                        }],
                    "text": "Shows or hides the text link."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
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
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The name of the radio group."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "items": {
                "type": "unknown",
                "attribute": "items",
                "mutable": false,
                "complexType": {
                    "original": "ListItem[]",
                    "resolved": "ListItem[]",
                    "references": {
                        "ListItem": {
                            "location": "import",
                            "path": "../../models/list.types",
                            "id": "src/models/list.types.ts::ListItem"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{ListItem[]}"
                        }],
                    "text": "The items to display in the list."
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[]"
            },
            "showDivider": {
                "type": "boolean",
                "attribute": "show-divider",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The icon to display next to the list items."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "highlightedId": {
                "type": "any",
                "attribute": "highlighted-id",
                "mutable": false,
                "complexType": {
                    "original": "string | number",
                    "resolved": "number | string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string | number}"
                        }],
                    "text": "The ID of the item to be visually highlighted."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "headerLabel": {
                "type": "string",
                "attribute": "header-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The main text to display in the header."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "subtextLabel": {
                "type": "string",
                "attribute": "subtext-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The subtext to display below the main header."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "showHeaderLeadingIcon": {
                "type": "boolean",
                "attribute": "show-header-leading-icon",
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
                    "text": "Shows or hides the leading icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "headerLeadingIconName": {
                "type": "string",
                "attribute": "header-leading-icon-name",
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
                    "text": "The name of the leading icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "showHeaderTrailingIcon": {
                "type": "boolean",
                "attribute": "show-header-trailing-icon",
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
                    "text": "Shows or hides the trailing icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "headerTrailingIconName": {
                "type": "string",
                "attribute": "header-trailing-icon-name",
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
                    "text": "The name of the trailing icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "label": {
                "type": "string",
                "attribute": "label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "**Required** The text to display in the link."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "href": {
                "type": "string",
                "attribute": "href",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The URL to navigate to when the link is clicked."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "target": {
                "type": "string",
                "attribute": "target",
                "mutable": false,
                "complexType": {
                    "original": "Target",
                    "resolved": "\"_blank\" | \"_parent\" | \"_self\" | \"_top\"",
                    "references": {
                        "Target": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::Target"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The target attribute of the link. Possible values: '_blank', '_self', '_parent', '_top'."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'_self'"
            },
            "rel": {
                "type": "string",
                "attribute": "rel",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "The rel attribute of the link."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "TextLinkSizes",
                    "resolved": "\"large\" | \"medium\" | \"small\" | \"xsmall\" | \"xxsmall\"",
                    "references": {
                        "TextLinkSizes": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::TextLinkSizes"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{TextLinkSizes}"
                        }],
                    "text": "The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'medium'"
            },
            "variant": {
                "type": "string",
                "attribute": "variant",
                "mutable": false,
                "complexType": {
                    "original": "TextLinkVariants",
                    "resolved": "\"primary\" | \"primary-inverse\" | \"primary-underline\" | \"primary-underline-inverse\" | \"secondary\" | \"secondary-inverse\"",
                    "references": {
                        "TextLinkVariants": {
                            "location": "import",
                            "path": "../../models/text-link.types",
                            "id": "src/models/text-link.types.ts::TextLinkVariants"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{TextLinkVariants}"
                        }],
                    "text": "The variant of the text link. Possible values: 'primary', 'secondary'."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'primary'"
            },
            "linkAriaLabel": {
                "type": "string",
                "attribute": "link-aria-label",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{string}"
                        }],
                    "text": "Defines a string value that labels the element being focused.\nUse this when the visible text is ambiguous (e.g., \"Read more\")."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "''"
            },
            "showLinkLeadingIcon": {
                "type": "boolean",
                "attribute": "show-link-leading-icon",
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
                    "text": "Shows or hides the text link leading icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "linkLeadingIconName": {
                "type": "string",
                "attribute": "link-leading-icon-name",
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
                    "text": "The name of the text link leading icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "showLinkTrailingIcon": {
                "type": "boolean",
                "attribute": "show-link-trailing-icon",
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
                    "text": "Shows or hides the text link trailing icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "linkTrailingIconName": {
                "type": "string",
                "attribute": "link-trailing-icon-name",
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
                    "text": "The name of the text link trailing icon."
                },
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "maxViewableItems": {
                "type": "number",
                "attribute": "max-viewable-items",
                "mutable": false,
                "complexType": {
                    "original": "number | null",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The maximum number of items to display. A scrollbar will be shown if the total count exceeds this limit."
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "null"
            }
        };
    }
    static get states() {
        return {
            "_computedScrollStyle": {}
        };
    }
    static get events() {
        return [{
                "method": "itemChange",
                "name": "itemChange",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "type",
                            "text": "{EventEmitter<{ selectedItem: ListItem }>}"
                        }],
                    "text": "Emitted when a list item is checked or unchecked."
                },
                "complexType": {
                    "original": "{\n    selectedItem: {\n      id: string | number;\n      text: string;\n      value: string;\n      checked: boolean;\n      icon?: string;\n    };\n  }",
                    "resolved": "{ selectedItem: { id: string | number; text: string; value: string; checked: boolean; icon?: string; }; }",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
}
//# sourceMappingURL=wdpr-list.js.map
