'use strict';

var index = require('./index-4gPM_TYz.js');
var utils = require('./utils-CARbI7sq.js');
require('./bundle-cjs-Cajw0YnV.js');

const WdprCameraScanner = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
    }
    get el() { return index.getElement(this); }
    instruction = 'Center the Code Here';
    aspect = '1x1';
    /**
     * Preset sizes from design system
     */
    size = 'md';
    /**
     * Custom width (overrides size). Example: '280px', 'min(90vw, 360px)'
     */
    width;
    sizeMap = {
        sm: 'w-[240px]',
        md: 'w-[320px]',
        lg: 'w-[400px]',
    };
    render() {
        const resolvedWidthClass = this.width ? undefined : this.sizeMap[this.size];
        const root = utils.customTwMerge('relative select-none overflow-hidden mx-auto', // center horizontally
        resolvedWidthClass, this.aspect === '16x9' ? 'aspect-video' : 'aspect-square');
        const bounds = 'relative w-full h-full box-border';
        const corner = 'absolute w-dimension-450 h-dimension-450';
        const barBase = 'absolute bg-component-camera-scan-stroke rounded-025';
        const hBar = utils.customTwMerge(barBase, 'h-dimension-050 w-dimension-400');
        const vBar = utils.customTwMerge(barBase, 'w-dimension-050 h-dimension-400');
        const hintWrap = 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-text-inverse';
        const hintText = 'text-heading-xxsmall-alt leading-tight';
        const inset = '0';
        return (index.h(index.Host, { key: '2313bd00ba557214c2e3bef25e733525a6b5fcf7' }, index.h("div", { key: '3e7ccb41177cd0edc09e0b8dda19d0e3da10aada', class: root, part: "root", role: "application", "aria-label": "Camera scanner guide", style: this.width ? { width: this.width } : undefined }, index.h("div", { key: '17d245ef3aeef6969dfed549c171a22c8fb52718', class: bounds, part: "bounds" }, index.h("div", { key: '58b84cfca70bf02aa73854b67c92027cfad4537a', class: utils.customTwMerge(corner, `top-${inset} left-${inset}`), part: "corner-tl" }, index.h("span", { key: 'efec7ac57da0ca6850cdb061cc85d28cc75ae2ff', class: utils.customTwMerge(hBar, `top-${inset} left-${inset}`) }), index.h("span", { key: '2e9ffe94689792f08915b451bb3b19dd677579f6', class: utils.customTwMerge(vBar, `top-${inset} left-${inset}`) })), index.h("div", { key: '0e681ee01f4719786b4f3e61dfeefce72af32c0b', class: utils.customTwMerge(corner, `top-${inset} right-${inset}`), part: "corner-tr" }, index.h("span", { key: '9009b8d983073829a5538ebc47d7d88dade67820', class: utils.customTwMerge(hBar, `top-${inset} right-${inset}`) }), index.h("span", { key: '7c33e31f4a95cf3d6fa6f135621efcaeb081ead2', class: utils.customTwMerge(vBar, `top-${inset} right-${inset}`) })), index.h("div", { key: '13d1113b321df6f0af6fd0c5b3f07855d4ceb38e', class: utils.customTwMerge(corner, `bottom-${inset} left-${inset}`), part: "corner-bl" }, index.h("span", { key: '635b605168a198ad18e53877d77eefb7c89b340b', class: utils.customTwMerge(hBar, `bottom-${inset} left-${inset}`) }), index.h("span", { key: '035f96a165869daeb8f2f655a6254130c016337b', class: utils.customTwMerge(vBar, `bottom-${inset} left-${inset}`) })), index.h("div", { key: '755174e14529f8f4042143add0787d2f80002385', class: utils.customTwMerge(corner, `bottom-${inset} right-${inset}`), part: "corner-br" }, index.h("span", { key: 'ad75fc633c568d4635d9bdf600ccf5f368879513', class: utils.customTwMerge(hBar, `bottom-${inset} right-${inset}`) }), index.h("span", { key: 'fd1402aa559e6eaa46c5a419db32b2105ee585f6', class: utils.customTwMerge(vBar, `bottom-${inset} right-${inset}`) })), index.h("div", { key: '58e9d6a267781bf0a4b6c29247d714d78de187d6', class: hintWrap, part: "hint", "aria-live": "polite" }, index.h("div", { key: '6a894a824e5575ba8dfc25246d786e9021067f10', class: hintText }, this.instruction))))));
    }
};

exports.wdpr_camera_scanner = WdprCameraScanner;
//# sourceMappingURL=wdpr-camera-scanner.entry.cjs.js.map

//# sourceMappingURL=wdpr-camera-scanner.cjs.entry.js.map