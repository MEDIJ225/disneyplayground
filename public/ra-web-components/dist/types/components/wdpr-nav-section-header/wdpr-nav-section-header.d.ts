export type NavHeaderSectionVariant = 'quiet' | 'loud';
export declare class WdprNavSectionHeader {
    /**
     * The visual style used for section headings.
     */
    variant: NavHeaderSectionVariant;
    /**
     * Optional fallback label when no slotted content is provided.
     */
    label: string;
    private get _containerClass();
    render(): any;
}
