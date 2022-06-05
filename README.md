# @datalist/country

the complete country data source

## Usage

```
npm i -S @datalist/country
```

```js
import { countryDataList } from '@datalist/country';
```

## Example

```json
[
  {
    "name": "Finland",
    "code": "FI",
    "alpha3Code": "FIN",
    "numericCode": "246",
    "topLevelDomains": [".fi"],
    "currencyCodes": []
  }
]
```

## Compared With Other Packages

| Package            | Number of Country | Translated Names | Currency Codes | Language Codes | Top-level Domains |
| ------------------ | ----------------- | ---------------- | -------------- | -------------- | ----------------- |
| @datalist/country  | 249               | N/A              | Yes            | N/A            | Yes               |
| i18n-iso-countries | 250               | EN,FR            | N/A            | N/A            | N/A               |

## Data Source

1. Country codes: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes
2. Currency codes: https://en.wikipedia.org/wiki/ISO_4217
