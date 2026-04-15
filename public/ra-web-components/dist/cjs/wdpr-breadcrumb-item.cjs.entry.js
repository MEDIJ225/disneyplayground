'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprBreadcrumbItem = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.truncationClick = index.createEvent(this, "truncationClick", 7);
    }
    get el() { return index.getElement(this); }
    /**
     * @internal
     * Marks if the leading slot has content or not
     * @default false
     * @type {boolean}
     */
    _hasLeadingIcon = false;
    /**
     * @internal
     * Marks if the trailing slot has content or not
     * @default false
     * @type {boolean}
     */
    _hasTrailingIcon = false;
    /**
     * Flag to indicate if this breadcrumb item is the first one in the breadcrumb list.
     * @internal
     */
    _first;
    /**
     * Flag to indicate if this breadcrumb item is the last one in the breadcrumb list.
     * @internal
     */
    _last;
    /**
     * If true, shows a truncation marker (`…`) for this breadcrumb item.
     * Used internally by `WdprBreadcrumb` to collapse the item on smaller screens.
     * @internal
     * Design remove the truncation in Design 1.2.0 but not really clear how they want to handle this, we will leave it and change the logic if needed
     */
    showTruncation = false;
    /**
     * The URL to navigate to when the item is clicked.
     * @type {string}
     */
    href;
    /**
     * The target attribute of the item. Possible values: '_blank', '_self', '_parent', '_top'.
     * @type {string}
     */
    target = '_self';
    /**
     * If true, show a separator between this breadcrumb and the next.
     * @type {boolean}
     */
    separator = false;
    /**
     * **Required** The text to display in the item.
     * @type {string}
     */
    label;
    /**
     * The variant of the text item.
     * @type {TextLinkVariants}
     */
    variant;
    /**
     * The size of the text link. Possible values: 'xxsmall', 'xsmall', 'small', 'medium', 'large'.
     * @type {TextLinkSizes}
     */
    size = 'small';
    /**
     * The rel attribute of the item.
     * @type {string}
     */
    rel;
    truncationClick;
    /**
     * Marks this item as the first breadcrumb in the sequence.
     * Should only be called internally by `<wdpr-breadcrumb>`.
     * @internal
     */
    async setFirstBreadcrumb() {
        this._first = true;
    }
    /**
     * Marks this item as the last breadcrumb in the sequence.
     * Should only be called internally by `<wdpr-breadcrumb>`.
     * @internal
     */
    async setLastBreadcrumb() {
        this._last = true;
    }
    componentWillLoad() {
        this._hasLeadingIcon = !!this.el.querySelector('[slot="leading-icon"]');
        this._hasTrailingIcon = !!this.el.querySelector('[slot="trailing-icon"]');
    }
    _handleTruncationClick = () => {
        this.truncationClick.emit();
    };
    get _isInverseVariant() {
        return this.variant?.includes('inverse') || false;
    }
    get _separatorColorClass() {
        if (this._isInverseVariant) {
            return 'text-text-inverse';
        }
        return 'text-text-body';
    }
    render() {
        const { _first, _last, separator, target, label, size, showTruncation, _hasLeadingIcon, _hasTrailingIcon } = this;
        const href = this.href ?? '';
        const variant = this.variant ?? (_last ? 'secondary' : 'primary-underline');
        const attrs = { href, target, variant, size };
        const showSeparator = _last ? false : separator;
        const firstBreadcrumb = _first;
        return (index.h(index.Host, { key: 'f4f880a16c40e790bc2520ed6a99b480b6dc7527', role: "listitem", "data-first": firstBreadcrumb ? '' : undefined }, index.h("div", { key: 'c4435cc133ba9b356d080cedc3c1f1ec33669433', class: "flex items-center gap-100", part: "wrapper" }, index.h("span", { key: '859bea44b227f49da35626207cebe185ab01c646', class: `${showTruncation ? 'hidden' : ''}` }, index.h("wdpr-text-link", { key: 'b0773f483611fa5527c08e08597df4fbeb675e0f', ...attrs, "aria-current": _last ? 'page' : undefined, rel: this.rel }, _hasLeadingIcon && index.h("slot", { key: '6fc622b6f08317251a6a848bb986519e791f97a5', name: "leading-icon", slot: "leading-icon" }), index.h("span", { key: '1f438e9bebc55bc56de23bfa142a84daee9a37f3', class: `${firstBreadcrumb ? 'hidden md:block' : null}` }, label), _hasTrailingIcon && index.h("slot", { key: 'd32c552126d9e9d3763517b85c6c9b96fcbe3b89', name: "trailing-icon", slot: "trailing-icon" }))), showTruncation && (index.h("wdpr-icon-button", { key: 'ba180df4c9478387102dedd5c88cf0611a4432d9', variant: this._isInverseVariant ? 'inverse' : 'secondary', iconName: "more", size: "small", a11yLabel: "Show all breadcrumbs", onClicked: this._handleTruncationClick })), showSeparator && (index.h("span", { key: '45e597617024bcbbeaab5dacd45bb1ae6c8a6037', part: "separator", "aria-hidden": "true" }, index.h("slot", { key: '2fa98502af796c5d80e56128dc01d409c689377f', name: "separator" }, index.h("wdpr-icon-library", { key: 'bd934a8825811dd43b099ae0a3af29e4450032a6', class: this._separatorColorClass, size: "xsmall", icon: "next" })))))));
    }
};
WdprBreadcrumbItem.style = ":host(.hidden) {\n      display: none;\n    }\n    :host([data-first]) {\n      --wdpr-text-link-text-display: none;\n    }\n    @media (min-width: 768px) {\n      :host([data-first]) {\n        --wdpr-text-link-text-display: inline;\n      }\n    }";

exports.wdpr_breadcrumb_item = WdprBreadcrumbItem;
//# sourceMappingURL=wdpr-breadcrumb-item.entry.cjs.js.map

//# sourceMappingURL=wdpr-breadcrumb-item.cjs.entry.js.map