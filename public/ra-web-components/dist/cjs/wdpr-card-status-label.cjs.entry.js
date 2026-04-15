'use strict';

var index = require('./index-4gPM_TYz.js');

const WdprCardStatusLabel = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    label;
    variant = 'informational';
    get variantClasses() {
        return {
            success: 'bg-surface-status-success-alt-2',
            warning: 'bg-surface-status-warning-alt-2',
            informational: 'bg-surface-status-informational-alt-2',
            error: 'bg-surface-status-critical',
        };
    }
    ;
    get textColor() {
        return {
            success: 'text-text-status-success',
            warning: 'text-text-status-warning',
            informational: 'text-text-body',
            error: 'text-text-inverse',
        };
    }
    ;
    get iconName() {
        switch (this.variant) {
            case 'success':
                return 'checkmark';
            case 'warning':
                return 'alert';
            case 'error':
                return 'alert-notification-1';
            case 'informational':
                return 'info';
        }
    }
    ;
    render() {
        const variantBg = this.variantClasses[this.variant];
        const textColor = this.textColor[this.variant];
        const containerClasses = `box-border flex h-dimension-450 items-center py-112 px-200 w-full ${variantBg} ${textColor}`;
        return (index.h("div", { key: '848b65324fb5484c6ad814cf5f7f46c55ccd2fad', class: containerClasses }, index.h("div", { key: 'cd8650fe7e6c085bc0fe6271426e36c35c061467', class: textColor }, index.h("wdpr-icon-library", { key: 'eab1a91670eeb73d8859da88908245501d25cd65', icon: this.iconName, size: "xxsmall" })), index.h("div", { key: '13f2d3aaa8b2c1fcc5484d6fc83742b3ce304044', class: "font-body-alt component-small w-full pl-050 pt-025" }, this.label)));
    }
};
WdprCardStatusLabel.style = ":host { width: 100%; }";

exports.wdpr_card_status_label = WdprCardStatusLabel;
//# sourceMappingURL=wdpr-card-status-label.entry.cjs.js.map

//# sourceMappingURL=wdpr-card-status-label.cjs.entry.js.map