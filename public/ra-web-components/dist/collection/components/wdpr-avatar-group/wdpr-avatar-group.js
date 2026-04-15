import { h, Host, forceUpdate } from "@stencil/core";
export class WdprAvatarGroup {
    el;
    /** Current slotted avatars */
    _avatars = [];
    /** Bumped to force re-render when child attributes change */
    _version = 0;
    /** Max avatars shown before rendering the +N overflow avatar */
    maxCount = 4;
    /** Avatar size propagated to slotted children and overflow */
    size = 'medium';
    attrObserver;
    childListObserver;
    componentWillLoad() {
        this._syncFromSlot();
    }
    async componentDidLoad() {
        this._startChildListObserver();
        // Ensure sync after custom element upgrades/distribution in Storybook-like environments
        if ('customElements' in window) {
            await customElements.whenDefined('wdpr-avatar');
            queueMicrotask(() => this._syncFromSlot());
            requestAnimationFrame(() => this._syncFromSlot());
        }
    }
    disconnectedCallback() {
        this.attrObserver?.disconnect();
        this.childListObserver?.disconnect();
    }
    /** Re-sync when the default slot distribution changes */
    onSlotChange() {
        this._syncFromSlot();
    }
    /** Re-sync when public props that affect visibility/size change */
    onPropsChange() {
        this._syncFromSlot();
    }
    /** Observe light-DOM children added/removed */
    _startChildListObserver() {
        this.childListObserver = new MutationObserver(() => this._syncFromSlot());
        this.childListObserver.observe(this.el, { childList: true });
    }
    /** Observe relevant attribute changes on each slotted avatar */
    _observeChildAttributes() {
        this.attrObserver?.disconnect();
        if (!this._avatars.length)
            return;
        this.attrObserver = new MutationObserver(() => {
            // Batch rapid changes and ensure a re-render
            queueMicrotask(() => {
                this._applyAriaLabel();
                this._version++;
                forceUpdate(this);
            });
        });
        this._avatars.forEach((a) => {
            this.attrObserver.observe(a, {
                attributes: true,
                attributeFilter: ['label', 'text', 'alt-text'],
            });
        });
    }
    /** Direct child avatars (same as default slot). Named slots re-project each into a shadow wrapper. */
    _getSlottedAvatars() {
        return Array.from(this.el.children).filter((el) => el.tagName.toLowerCase() === 'wdpr-avatar');
    }
    _avatarsShallowEqual(a, b) {
        return a.length === b.length && a.every((el, i) => el === b[i]);
    }
    /** Collect slotted avatars, assign named slots, propagate props, hide extras, and refresh a11y label */
    _syncFromSlot() {
        const next = this._getSlottedAvatars();
        Array.from(this.el.querySelectorAll('wdpr-avatar[slot^="avatar-"]')).forEach((node) => {
            const a = node;
            if (!next.includes(a)) {
                a.removeAttribute('slot');
            }
        });
        // Only the first maxCount avatars get a named slot + wrapper; extras stay in light DOM
        // unslotted so they do not participate in flex/overlap layout (hidden alone still left empty wrappers/slots in the flow).
        next.forEach((a, i) => {
            if (i < this.maxCount) {
                a.setAttribute('slot', `avatar-${i}`);
            }
            else {
                a.removeAttribute('slot');
            }
        });
        const listChanged = !this._avatarsShallowEqual(next, this._avatars);
        if (listChanged) {
            this._avatars = next;
            this._observeChildAttributes();
        }
        // Propagate size/border and hide avatars beyond maxCount
        this._avatars.forEach((a, i) => {
            a.size = this.size;
            a.showBorder = true;
            a.isInteractive = false;
            a.hidden = i >= this.maxCount;
        });
        this._applyAriaLabel(); // imperative to avoid missed attribute diffs
        this._version++; // ensure template consumers re-render if needed
    }
    /** Return a readable name for an avatar (label > altText > text) */
    _getAvatarName(avatar) {
        return (avatar.label ||
            avatar.altText ||
            avatar.text ||
            avatar.getAttribute?.('label') ||
            avatar.getAttribute?.('alt-text') ||
            avatar.getAttribute?.('text') ||
            '').trim();
    }
    /** Build a descriptive group label including overflow count */
    _buildGroupLabel() {
        const visible = this._avatars.slice(0, this.maxCount);
        const names = visible.map((a) => this._getAvatarName(a)).filter(Boolean);
        const overflowCount = Math.max(0, this._avatars.length - this.maxCount);
        if (names.length && overflowCount > 0)
            return `${names.join(', ')}, and ${overflowCount} more`;
        if (names.length)
            return names.join(', ');
        if (overflowCount > 0)
            return `${overflowCount} more`;
        return 'Avatar group';
    }
    /** Imperatively set aria-label on the host to guarantee updates */
    _applyAriaLabel() {
        const author = this.el.getAttribute('aria-label');
        if (author && author.trim().length > 0)
            return; // respect author override
        this.el.setAttribute('aria-label', this._buildGroupLabel());
    }
    get _containerClasses() {
        return 'inline-flex items-center group';
    }
    /** Map size to a positive spacing token; CSS negates it with calc(* -1) */
    get _overlapToken() {
        const map = {
            small: 'var(--spacing-100)',
            medium: 'var(--spacing-150)',
            large: 'var(--spacing-200)',
        };
        return map[this.size] ?? 'var(--spacing-200)';
    }
    _renderOverflow(count) {
        if (count <= 0)
            return null;
        const capped = Math.min(count, 99);
        return (h("wdpr-avatar", { "is-overflow": true, "show-border": true, isInteractive: false, text: `+${capped}`, size: this.size }));
    }
    render() {
        const overflowCount = Math.max(0, this._avatars.length - this.maxCount);
        return (h(Host, { key: 'bae60d3442a857a37625362e1d1d1d218001ba36', style: { '--avatar-overlap': this._overlapToken }, role: "group", "data-v": this._version }, h("div", { key: '3c93ac7bc6bc1853f4d9a5c2938e89005dd9c5be', class: this._containerClasses }, this._avatars.slice(0, this.maxCount).map((_, i) => (h("div", { class: "avatar-wrapper" }, h("slot", { name: `avatar-${i}`, onSlotchange: () => this._syncFromSlot() })))), overflowCount > 0 && h("div", { key: '890bebab51eb96084f461913fdf2117c0a0bcda8', class: "avatar-wrapper mb-1" }, this._renderOverflow(overflowCount)))));
    }
    static get is() { return "wdpr-avatar-group"; }
    static get encapsulation() { return "shadow"; }
    static get styles() { return "/* Overlap lives on shadow wrappers so consumer * resets cannot override ::slotted() margins */\n    .group .avatar-wrapper + .avatar-wrapper {\n      margin-inline-start: calc(var(--avatar-overlap, 16px) * -1);\n    }"; }
    static get properties() {
        return {
            "maxCount": {
                "type": "number",
                "attribute": "max-count",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Max avatars shown before rendering the +N overflow avatar"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "4"
            },
            "size": {
                "type": "string",
                "attribute": "size",
                "mutable": false,
                "complexType": {
                    "original": "AvatarGroupSize",
                    "resolved": "\"large\" | \"medium\" | \"small\"",
                    "references": {
                        "AvatarGroupSize": {
                            "location": "local",
                            "path": "/harness/packages/stencil-library/src/components/wdpr-avatar-group/wdpr-avatar-group.tsx",
                            "id": "src/components/wdpr-avatar-group/wdpr-avatar-group.tsx::AvatarGroupSize"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Avatar size propagated to slotted children and overflow"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "'medium'"
            }
        };
    }
    static get states() {
        return {
            "_avatars": {},
            "_version": {}
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "maxCount",
                "methodName": "onPropsChange"
            }, {
                "propName": "size",
                "methodName": "onPropsChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "slotchange",
                "method": "onSlotChange",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=wdpr-avatar-group.js.map
