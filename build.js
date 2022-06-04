import axios from 'axios';
import fs from 'fs';
import { parse } from 'node-html-parser';

function cleanName(input) {
  return input
    .replaceAll(/\(the\)/g, '')
    .replaceAll(/\[.*\]/g, '')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

(async () => {
  const countries = [];

  await (async () => {
    const html = await axios.get(
      'http://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes'
    );

    const root = parse(String(html.data));

    const rows = root
      .querySelector('.wikitable.sortable tbody')
      .querySelectorAll('tr');
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName('td');
      if (cells.length === 8) {
        const name = cleanName(cells[0].textContent);
        const code = cleanName(cells[3].querySelector('span').textContent);
        const alpha3Code = cleanName(cells[4].textContent);
        const numericCode = cleanName(cells[5].textContent);
        const topLevelDomains = cleanName(cells[7].textContent).split(' ');

        countries.push({
          name,
          code,
          alpha3Code,
          numericCode,
          topLevelDomains,
          currencyCodes: [],
        });
      }
    }
  })();

  await (async () => {
    const html = await axios.get('http://en.wikipedia.org/wiki/ISO_4217');

    const root = parse(String(html.data));

    const rows = root
      .querySelector('.wikitable.sortable tbody')
      .querySelectorAll('tr');
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const cells = row.getElementsByTagName('td');
      if (cells.length === 5) {
        const code = cleanName(cells[0].textContent);
        const countryCodes = cells[4].textContent;

        countries.forEach((country) => {
          if (
            countryCodes.includes('(' + country.code + ')') ||
            countryCodes.includes(country.name)
          ) {
            country.currencyCodes.push(code);
          }
        });
      }
    }
  })();

  const content =
    'import { CountryData } from "./CountryData";export const countryDataList: CountryData[] = ' +
    JSON.stringify(countries, null, 2) +
    ';';
  fs.writeFileSync('./src/countryDataList.ts', content);
})();
