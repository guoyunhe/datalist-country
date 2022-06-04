import { countryDataList } from './countryDataList';

function uniq(arr: string[]) {
  const set = new Set(arr);
  return Array.from(set);
}

describe('countryDataList', () => {
  it('has unique codes', () => {
    const codes = countryDataList.map((item) => item.code);
    expect(uniq(codes)).toEqual(codes);
  });
  it('has unique names', () => {
    const names = countryDataList.map((item) => item.name);
    expect(uniq(names)).toEqual(names);
  });
});
