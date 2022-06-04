import axios from 'axios';
import fs from 'fs';
import { parse } from 'node-html-parser';

function cleanName(input) {
  return input
    .replaceAll(/\(.*\)/g, '')
    .replaceAll(/\[.*\]/g, '')
    .replaceAll(/\s+/g, ' ')
    .trim();
}

(async () => {
  const countryCodeHtml = await axios.get(
    'http://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes'
  );

  const root = parse(String(countryCodeHtml.data));

  const countries = [];

  const countryRows = root.querySelectorAll('.wikitable.sortable tbody tr');
  for (let i = 0; i < countryRows.length; i++) {
    const row = countryRows[i];
    const cells = row.getElementsByTagName('td');
    if (cells.length >= 8) {
      const name = cleanName(cells[0].textContent);
      const officialName = cleanName(cells[1].textContent);
      const sovereignty = cleanName(cells[2].textContent);
      const code = cleanName(cells[3].querySelector('span').textContent);
      const alpha3Code = cleanName(cells[4].textContent);
      const numericCode = cleanName(cells[5].textContent);
      const topLevelDomain = cleanName(cells[7].textContent);

      countries.push({
        name,
        officialName,
        sovereignty,
        code,
        alpha3Code,
        numericCode,
        topLevelDomain,
        currencyCode: '',
      });
    }
  }

  console.log(countries);

  let content = fs.readFileSync('./index.ts', 'utf-8');
  content = content.replace(
    /const\ countryDataList:\ CountryData\[\]\ =\ [^;]*;/s,
    'const countryDataList: CountryData[] = ' +
      JSON.stringify(countries, null, 2) +
      ';'
  );
  fs.writeFileSync('./index.ts', content);
})();
