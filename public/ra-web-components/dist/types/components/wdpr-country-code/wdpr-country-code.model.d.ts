export type CountryCodeLocation = 'above' | 'below';
export type CountryCodeNavigationDirection = 'down' | 'up';
export type CountryCodeFilterMode = 'auto' | 'manual';
export type CountryCodeIconNameType = 'expand-show-less' | 'expand-show-more';
export interface CountryCodeValueItem {
    id: string;
    value: string;
    label: string;
    callingCode: string;
    isoCode: string;
}
export interface CountryCodeItemSelected {
    id: string;
    value: string;
    label: string;
    selected: boolean;
    callingCode: string;
    isoCode: string;
}
