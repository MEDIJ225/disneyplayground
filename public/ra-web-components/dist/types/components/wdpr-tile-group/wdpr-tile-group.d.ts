export declare class WdprTileGroup {
    el: HTMLElement;
    private _internalId;
    columns: number;
    tileGroupId: string;
    a11yLabel: string;
    componentDidLoad(): void;
    componentWillLoad(): void;
    onSlotChange(): void;
    handleKeyDown(ev: KeyboardEvent): void;
    handleTileClick(event: CustomEvent): void;
    private _propagateToSlotElements;
    render(): any;
}
