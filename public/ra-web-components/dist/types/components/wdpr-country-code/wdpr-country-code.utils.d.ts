import { CountryCodeNavigationDirection } from './wdpr-country-code.model';
export declare function findNextEnabledIndex(items: HTMLWdprCountryCodeItemElement[], start: number, direction: CountryCodeNavigationDirection): number;
export declare function getInitialFocusIndex(items: HTMLWdprCountryCodeItemElement[], direction: CountryCodeNavigationDirection): number;
export declare function itemMatchesFilter(item: HTMLWdprCountryCodeItemElement, filterText: string): boolean;
