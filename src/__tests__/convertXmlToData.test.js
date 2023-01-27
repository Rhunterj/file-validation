import { convertXmlToData } from '../helpers/convertXmlToData';

test("convertXmlToData function", () => {
  const result = convertXmlToData('<records><record reference="123"><accountNumber>NL123</accountNumber><description>description</description><startBalance>1.23</startBalance><mutation>1.23</mutation><endBalance>1.23</endBalance></record></records>');
  
  expect(result).toEqual([{
    reference: 123,
    accountNumber: 'NL123',
    description: 'description',
    startBalance: 1.23,
    mutation: 1.23,
    endBalance: 1.23
  }]);
  expect(result).toMatchSnapshot();
});