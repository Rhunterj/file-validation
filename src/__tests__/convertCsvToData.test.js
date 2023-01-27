import { convertCsvToData } from '../helpers/convertCsvToData';
import { csvMock } from '../__mocks__/csvMock';

test('convertCsvToData function', () => {
  const result = convertCsvToData(csvMock);

  expect(result).toEqual([{
    reference: 123,
    accountNumber: 'NL123',
    description: 'description',
    startBalance: 123,
    mutation: 123,
    endBalance: 123
  }]);
});