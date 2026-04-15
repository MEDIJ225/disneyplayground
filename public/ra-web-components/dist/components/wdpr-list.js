import { p as proxyCustomElement, H, c as createEvent, h } from './p-BRIGwGQo.js';
import { c as customTwMerge } from './p-CXZGMLMW.js';
import { d as defineCustomElement$a } from './p-DTaaOZwt.js';
import { d as defineCustomElement$9 } from './p-QL-JXwKm.js';
import { d as defineCustomElement$8 } from './p-CiDhVxgt.js';
import { d as defineCustomElement$7 } from './p-_QubyXiP.js';
import { d as defineCustomElement$6 } from './p-DuX_0jwp.js';
import { d as defineCustomElement$5 } from './p-VsruIb9P.js';
import { d as defineCustomElement$4 } from './p-DsPXJJ-e.js';
import { d as defineCustomElement$3 } from './p-YiP2RhPm.js';
import { d as defineCustomElement$2 } from './p-Cb7GjcQn.js';

const WdprList$1 = /*@__PURE__*/ proxyCustomElement(class WdprList extends H {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.itemChange = createEvent(this, "itemChange", 7);
    }
    _listEl;
    get el() { return this; }
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
    static get style() { return ":host li.item-selected wdpr-checkbox::part(label),\n    :host div.item-selected wdpr-radio-button::part(label) {\n      color: var(--color-text-disclaimer);\n    }\n\n    :host li.item-highlighted,\n    :host div.item-highlighted {\n      outline: 2px solid var(--color-surface-actionable-focus);\n      outline-offset: 2px;\n    }"; }
}, [257, "wdpr-list", {
        "listStyle": [1, "list-style"],
        "spacing": [1],
        "showLeadingText": [4, "show-leading-text"],
        "showTextLink": [4, "show-text-link"],
        "name": [1],
        "items": [16],
        "showDivider": [4, "show-divider"],
        "highlightedId": [8, "highlighted-id"],
        "headerLabel": [1, "header-label"],
        "subtextLabel": [1, "subtext-label"],
        "showHeaderLeadingIcon": [4, "show-header-leading-icon"],
        "headerLeadingIconName": [1, "header-leading-icon-name"],
        "showHeaderTrailingIcon": [4, "show-header-trailing-icon"],
        "headerTrailingIconName": [1, "header-trailing-icon-name"],
        "label": [1],
        "href": [1],
        "target": [1],
        "rel": [1],
        "size": [1],
        "variant": [1],
        "linkAriaLabel": [1, "link-aria-label"],
        "showLinkLeadingIcon": [4, "show-link-leading-icon"],
        "linkLeadingIconName": [1, "link-leading-icon-name"],
        "showLinkTrailingIcon": [4, "show-link-trailing-icon"],
        "linkTrailingIconName": [1, "link-trailing-icon-name"],
        "maxViewableItems": [2, "max-viewable-items"],
        "_computedScrollStyle": [32]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["wdpr-list", "wdpr-checkbox", "wdpr-divider", "wdpr-icon-library", "wdpr-inline-message", "wdpr-radio-button", "wdpr-radio-group", "wdpr-status-icon", "wdpr-text-header", "wdpr-text-link"];
    components.forEach(tagName => { switch (tagName) {
        case "wdpr-list":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, WdprList$1);
            }
            break;
        case "wdpr-checkbox":
            if (!customElements.get(tagName)) {
                defineCustomElement$a();
            }
            break;
        case "wdpr-divider":
            if (!customElements.get(tagName)) {
                defineCustomElement$9();
            }
            break;
        case "wdpr-icon-library":
            if (!customElements.get(tagName)) {
                defineCustomElement$8();
            }
            break;
        case "wdpr-inline-message":
            if (!customElements.get(tagName)) {
                defineCustomElement$7();
            }
            break;
        case "wdpr-radio-button":
            if (!customElements.get(tagName)) {
                defineCustomElement$6();
            }
            break;
        case "wdpr-radio-group":
            if (!customElements.get(tagName)) {
                defineCustomElement$5();
            }
            break;
        case "wdpr-status-icon":
            if (!customElements.get(tagName)) {
                defineCustomElement$4();
            }
            break;
        case "wdpr-text-header":
            if (!customElements.get(tagName)) {
                defineCustomElement$3();
            }
            break;
        case "wdpr-text-link":
            if (!customElements.get(tagName)) {
                defineCustomElement$2();
            }
            break;
    } });
}

const WdprList = WdprList$1;
const defineCustomElement = defineCustomElement$1;

export { WdprList, defineCustomElement };
//# sourceMappingURL=wdpr-list.js.map

//# sourceMappingURL=wdpr-list.js.map