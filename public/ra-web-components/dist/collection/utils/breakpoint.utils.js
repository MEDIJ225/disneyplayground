import { BREAKPOINT_EXTRA_LARGE, BREAKPOINT_LARGE, BREAKPOINT_MEDIUM } from "../models/breakpoint.model";
export function isMobile() {
    return window.innerWidth < BREAKPOINT_MEDIUM;
}
export function isTablet() {
    return window.innerWidth >= BREAKPOINT_MEDIUM && window.innerWidth < BREAKPOINT_LARGE;
}
export function isDesktop() {
    return window.innerWidth >= BREAKPOINT_LARGE && window.innerWidth < BREAKPOINT_EXTRA_LARGE;
}
export function isDisplay() {
    return window.innerWidth >= BREAKPOINT_EXTRA_LARGE;
}
export function isHigherThanTablet() {
    return window.innerWidth > BREAKPOINT_MEDIUM;
}
//# sourceMappingURL=breakpoint.utils.js.map
