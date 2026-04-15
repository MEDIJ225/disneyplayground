export type AvatarGroupSize = 'small' | 'medium' | 'large';
export declare class WdprAvatarGroup {
    el: HTMLWdprAvatarGroupElement;
    /** Current slotted avatars */
    private _avatars;
    /** Bumped to force re-render when child attributes change */
    private _version;
    /** Max avatars shown before rendering the +N overflow avatar */
    maxCount: number;
    /** Avatar size propagated to slotted children and overflow */
    size: AvatarGroupSize;
    private attrObserver?;
    private childListObserver?;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    disconnectedCallback(): void;
    /** Re-sync when the default slot distribution changes */
    onSlotChange(): void;
    /** Re-sync when public props that affect visibility/size change */
    onPropsChange(): void;
    /** Observe light-DOM children added/removed */
    private _startChildListObserver;
    /** Observe relevant attribute changes on each slotted avatar */
    private _observeChildAttributes;
    /** Direct child avatars (same as default slot). Named slots re-project each into a shadow wrapper. */
    private _getSlottedAvatars;
    private _avatarsShallowEqual;
    /** Collect slotted avatars, assign named slots, propagate props, hide extras, and refresh a11y label */
    private _syncFromSlot;
    /** Return a readable name for an avatar (label > altText > text) */
    private _getAvatarName;
    /** Build a descriptive group label including overflow count */
    private _buildGroupLabel;
    /** Imperatively set aria-label on the host to guarantee updates */
    private _applyAriaLabel;
    private get _containerClasses();
    /** Map size to a positive spacing token; CSS negates it with calc(* -1) */
    private get _overlapToken();
    private _renderOverflow;
    render(): any;
}
