/* eslint-disable @typescript-eslint/no-explicit-any */
import { extendTailwindMerge } from "tailwind-merge";
export function format(first, middle, last) {
    return (first || '') + (middle != null && middle !== '' ? ` ${middle}` : '') + (last != null && last !== '' ? ` ${last}` : '');
}
export const forwardCommonHostAttributes = (el) => forwardHostAttributes(el, ['type', 'disabled']);
export function forwardHostAttributes(el, ignore = []) {
    const result = {};
    for (const attr of Array.from(el.attributes)) {
        if (!ignore.includes(attr.name)) {
            result[attr.name] = attr.value;
        }
    }
    return result;
}
export { twMerge } from 'tailwind-merge';
/**
 * Creates a native Event or CustomEvent depending on whether `detail` is provided.
 * Works in browsers and Jest/JSDOM (falls back to `document.createEvent`).
 */
export function createEvent(type, options) {
    const { bubbles = true, cancelable = true, composed = true, detail } = options ?? {};
    // Modern environments
    if (typeof CustomEvent === 'function') {
        if (detail !== undefined) {
            return new CustomEvent(type, { detail, bubbles, cancelable, composed });
        }
        return new Event(type, { bubbles, cancelable, composed });
    }
    // Fallback: legacy or limited JSDOM env
    if (typeof document !== 'undefined' && document.createEvent) {
        if (detail !== undefined) {
            const evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(type, bubbles, cancelable, detail);
            return evt;
        }
        const evt = document.createEvent('Event');
        evt.initEvent(type, bubbles, cancelable);
        return evt;
    }
    throw new Error('Event creation not supported in this environment');
}
export const customTwMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            'font-size': [
                {
                    text: [
                        'heading-xxsmall',
                        'body-large',
                        'body-small',
                        'label-small',
                        'component-xsmall',
                        'component-small',
                        'component-medium',
                        'component-large',
                        'component-xlarge',
                        'component-xxlarge',
                        'component-xxxlarge',
                    ],
                },
            ],
            'text-color': [
                {
                    text: [
                        'text-disabled',
                        'surface-status-informational',
                        'text-messaging-critical',
                        'text-actionable-default',
                        'text-actionable-hover',
                        'text-actionable-alt-default',
                        'text-actionable-alt-hover',
                        'text-actionable-alt-pressed',
                        'text-inverse',
                        'text-heading',
                        'text-body',
                        'text-label',
                        'text-default',
                        'text-status-neutral',
                        'text-status-success',
                        'text-status-warning',
                        'text-status-critical',
                        'text-status-informational',
                        'text-status-top-pick',
                        'text-actionable-disabled',
                        'text-transactional-disabled',
                        'text-actionable-focused',
                        'text-actionable-inverse-disabled',
                    ],
                },
            ],
            'outline-w': ['outline-000', 'outline-012', 'outline-025', 'outline-037', 'outline-050', 'outline-focus'],
        },
    },
});
/**
 * Generate a random ID for a11y.
 * @return {String}
 */
export const generateRandId = () => {
    const length = 6;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
};
/**
 * Propagate a property (and optional attribute fallback) to all assigned elements of a slot.
 *
 * @param slot        The slot element to inspect
 * @param propName    The property name to set (e.g. "disabled", "readonly")
 * @param value       The value to assign
 * @param attrName    Optional: attribute name to mirror as a fallback (defaults to propName)
 */
export function propagateToSlot(slot, propName, value, tagName = '', attrName = propName) {
    if (!slot)
        return;
    const nodes = slot.assignedElements({ flatten: true });
    for (const el of nodes) {
        const target = el;
        // If tagName is provided, only apply to matching elements
        if (tagName && el.tagName !== tagName.toUpperCase())
            continue;
        // Only treat it as a usable property if it's actually settable (not just on prototype)
        const hasOwn = Object.prototype.hasOwnProperty.call(target, propName);
        if (hasOwn) {
            target[propName] = value;
        }
        else {
            // For boolean-like attributes
            if (typeof value === 'boolean') {
                if (value)
                    el.setAttribute(attrName, '');
                else
                    el.removeAttribute(attrName);
            }
            else {
                if (value !== undefined && value !== null) {
                    el.setAttribute(attrName, String(value));
                }
                else {
                    el.removeAttribute(attrName);
                }
            }
        }
    }
}
/**
 * Finds the assigned elements of a specific tag name in a named slot.
 *
 * @param slot The slot element to inspect.
 * @param tagName The tag name to find (case-insensitive).
 * @returns The found elements or an empty array.
 */
export function findAssignedElementsByTag(slot, tagName) {
    if (!slot)
        return [];
    return slot.assignedElements({ flatten: true }).filter(el => el.tagName.toLowerCase() === tagName.toLowerCase());
}
export const stopAnd = (cb) => (ev) => {
    if (ev) {
        ev.stopPropagation();
    }
    cb();
};
//# sourceMappingURL=utils.js.map
