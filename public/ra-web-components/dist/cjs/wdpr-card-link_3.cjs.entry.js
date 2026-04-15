'use strict';

var index = require('./index-4gPM_TYz.js');
var cardContentRenderer = require('./card-content-renderer-DSH1fGA-.js');
var utils = require('./utils-CARbI7sq.js');
require('./card-styles-CO5BLqZi.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprCardLink = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.clicked = index.createEvent(this, "clicked", 7);
    }
    get el() { return index.getElement(this); }
    type = 'button';
    disabled = false;
    checked = false;
    name;
    value;
    a11yLabel;
    clicked;
    _handleClick = (e) => {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        if (this.type === 'button' || this.type === 'caret' || this.type === 'ellipses' || this.type === 'radio' || this.type === 'checkbox' || this.type === 'slot') {
            e.preventDefault();
            e.stopPropagation();
            this.clicked.emit();
        }
    };
    render() {
        if (this.type === 'button') {
            return (index.h("wdpr-button", { variant: "secondary", a11yLabel: "Card Button", size: "small", disabled: this.disabled, onClick: this._handleClick }, index.h("slot", null)));
        }
        if (this.type === 'caret') {
            return (index.h("wdpr-icon-button", { iconName: "next-caret-2.0", size: "small", disabled: this.disabled, a11yLabel: "Card Caret Link", onClick: this._handleClick, onClicked: e => e.stopPropagation(), "aria-disabled": this.disabled ? 'true' : 'false' }));
        }
        if (this.type === 'ellipses') {
            return (index.h("wdpr-icon-button", { iconName: "more", size: "small", disabled: this.disabled, a11yLabel: this.a11yLabel || 'More options', onClick: this._handleClick, "aria-disabled": this.disabled ? 'true' : 'false' }));
        }
        if (this.type === 'radio') {
            return index.h("wdpr-radio-button", { onClick: this._handleClick, name: "option", value: "option1", customAriaLabel: this.a11yLabel, disabled: this.disabled });
        }
        if (this.type === 'checkbox') {
            return index.h("wdpr-checkbox", { onClick: this._handleClick, checked: this.checked, labelPosition: "none", customAriaLabel: this.a11yLabel, disabled: this.disabled });
        }
        if (this.type === 'slot') {
            return (index.h("div", { onClick: this._handleClick }, index.h("slot", null)));
        }
    }
};
WdprCardLink.style = ":host {\n      display: flex;\n      align-items: center;\n    }";

const WdprCardMicroContent = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    primaryHeadline;
    body;
    disabled = false;
    headingLevel = 'h3';
    render() {
        const props = {
            body: this.body,
            primaryHeadline: this.primaryHeadline,
            headingLevel: this.headingLevel,
        };
        return (index.h(cardContentRenderer.RenderCardContent, { key: '1d216a795c58c508d5c4e05b611a70ab5ba14cf2', disabled: this.disabled, variant: 'micro', ...props }));
    }
};
WdprCardMicroContent.style = ":host { display: flex; align-items: center; width: 100%; }";

const WdprGuestCard = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.wdprSelectedChange = index.createEvent(this, "wdprSelectedChange", 7);
    }
    get el() { return index.getElement(this); }
    isOnSurface = false;
    actionPosition = 'none';
    mediaPosition = 'leading';
    fullWidth = false;
    disabled = false;
    headingLevel = 'h3';
    a11yLabel;
    selected = false;
    wdprSelectedChange;
    componentWillLoad() {
        console.warn('The wdpr-guest-card component is deprecated and will be removed in a future major release');
    }
    componentDidLoad() {
        const slot = this.el.shadowRoot?.querySelector('slot[name="content"]');
        utils.propagateToSlot(slot, 'headingLevel', this.headingLevel, 'wdpr-card-micro-content', 'heading-level');
    }
    _handleSelectedChange = (event) => {
        event.stopPropagation();
        this.wdprSelectedChange.emit(event.detail);
    };
    render() {
        return (index.h(index.Host, { key: 'e4c5fe47da85fb3cebc4140ec1cfbcc46686ec37' }, index.h("wdpr-card-micro", { key: 'e5451d3b494eebcf63bd55f78996259f8e5065bf', mediaPosition: this.mediaPosition, fullWidth: this.fullWidth, actionPosition: this.actionPosition, isOnSurface: this.isOnSurface, disabled: this.disabled, a11yLabel: this.a11yLabel, selected: this.selected, onWdprSelectedChange: this._handleSelectedChange }, index.h("slot", { key: '6bd2de8dbcfe05f5cec1d6c6c0208c38a707dde7', name: "media", slot: "media" }), index.h("slot", { key: '18c163977d5c57a384d541be21a1a01419316510', name: "content", slot: "content" }), index.h("slot", { key: 'bd390fa629ad3faab348eb631d3f319736ca8464', name: "link", slot: "link" }), index.h("slot", { key: '43670355b50982bdff5c995b02ceb16255f533bf', name: "footer", slot: "footer" }))));
    }
};
WdprGuestCard.style = ":host { display: block; }\n    :host([full-width]) { width: 100%; }\n    :host([disabled]) {\n      pointer-events: none;\n      opacity: 0.5;\n    }";

exports.wdpr_card_link = WdprCardLink;
exports.wdpr_card_micro_content = WdprCardMicroContent;
exports.wdpr_guest_card = WdprGuestCard;
//# sourceMappingURL=wdpr-card-link.wdpr-card-micro-content.wdpr-guest-card.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-link_3.cjs.entry.js.map