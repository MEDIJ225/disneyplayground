'use strict';

const BREAKPOINT_MEDIUM = 768; // In Pixels. Devices: Landscape Mobile / Tablet
const BREAKPOINT_LARGE = 1024; // In Pixels. Devices: Landscape Tablet / Desktop
const BREAKPOINT_EXTRA_LARGE = 1880; // In Pixels. Devices: Display

function isMobile() {
    return window.innerWidth < BREAKPOINT_MEDIUM;
}
function isTablet() {
    return window.innerWidth >= BREAKPOINT_MEDIUM && window.innerWidth < BREAKPOINT_LARGE;
}
function isDesktop() {
    return window.innerWidth >= BREAKPOINT_LARGE && window.innerWidth < BREAKPOINT_EXTRA_LARGE;
}
function isHigherThanTablet() {
    return window.innerWidth > BREAKPOINT_MEDIUM;
}

exports.isDesktop = isDesktop;
exports.isHigherThanTablet = isHigherThanTablet;
exports.isMobile = isMobile;
exports.isTablet = isTablet;
//# sourceMappingURL=breakpoint.utils-Clgj_h19.js.map

//# sourceMappingURL=breakpoint.utils-Clgj_h19.js.map