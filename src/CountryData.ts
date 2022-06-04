export interface CountryData {
  /** ISO 3166 Country/Region Name in English, e.g. Finland */
  name: string;
  /** ISO 3166-1 Alpha-2 Country/Region Code, e.g. FI (for Finland) */
  code: string;
  /** ISO 3166-1 Alpha-3 Country/Region Code, e.g. FIN (for Finland) */
  alpha3Code: string;
  /** ISO 3166-1 Numeric Country/Region Code, e.g. 246 (for Finland) */
  numericCode: string;
  /** Internet Top-Level Domain (TLD) Name, e.g. .fi (for Finland), .uk and .gb (for United Kingdom) */
  topLevelDomains: string[];
  /** ISO 4217 Currency Code, e.g. EUR (for Euro). Check @datalist/currency package for full data */
  currencyCodes: string[];
}
