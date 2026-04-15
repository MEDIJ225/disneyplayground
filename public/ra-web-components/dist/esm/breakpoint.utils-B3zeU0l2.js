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

export { isTablet as a, isDesktop as b, isHigherThanTablet as c, isMobile as i };
//# sourceMappingURL=breakpoint.utils-B3zeU0l2.js.map

//# sourceMappingURL=breakpoint.utils-B3zeU0l2.js.map