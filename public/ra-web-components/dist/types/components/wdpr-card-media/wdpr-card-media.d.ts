export type MediaType = 'blue-gradient' | 'gold-gradient' | 'green-gradient' | 'image' | 'icon';
export type MediaVariant = 'micro' | 'small' | 'medium' | 'large';
export declare class WdprCardMedia {
    /**
     * Reference to the host element of the component.
     */
    el: HTMLElement;
    /**
     * Type of media to display: blue-gradient, gold-gradient, green-gradient, image, or icon.
     * @default 'image'
     */
    type: MediaType;
    /**
     * Size variant for the media: micro, small, medium, or large.
     * @default 'medium'
     */
    variant: MediaVariant;
    /**
     * Icon name to display (used only if type is 'icon').
     */
    icon: string;
    /**
     * Image URL to display (used only if type is 'image').
     */
    src: string;
    /**
     * Base layout classes for the container.
     */
    get layoutClasses(): string;
    /**
     * Returns CSS classes for the background based on the gradient type.
     */
    get bgGradientClasses(): string;
    /**
     * Returns the gradient colors for the icon based on the type.
     */
    get iconColor(): "" | "text-text-body" | "text-icon-with-background-gold" | "text-icon-with-background-green-alt";
    /**
     * Renders the media content (image or icon) based on the props.
     */
    get cardMedia(): any;
    /**ˇ
     * Returns the base CSS classes depending on the media type and variant.
     */
    get baseClasses(): string;
    render(): any;
}
