export interface CellDataBase {
    date: Date;
    selected: boolean;
    isStartDate: boolean;
    isEndDate: boolean;
    inRange: boolean;
    disabled: boolean;
    showDot?: boolean;
    price?: number | undefined;
    isOutsideMonth?: boolean;
}
export type CellData = CellDataBase | null;
