// test the convertToJson function
const convertToJson = require('../convertFileToJson');

test('converts a file to json', () => {
  const json = convertToJson('./__tests__/test.txt');
  expect(json).toEqual({ name: 'test', age: 22 });
});

// test to see if the file exists
test('throws an error if the file does not exist', () => {
  expect(() => {
    convertToJson('./__tests__/test2.txt');
  }).toThrow();
});


// test convertToXml function
const convertToXml = require('../convertFileToXml');

test('converts a file to xml', () => {
  const xml = convertToXml('./__tests__/test.txt');
  expect(xml).toEqual('<name>test</name><age>22</age>');
});

// test to see if the file exists
test('throws an error if the file does not exist', () => {
  expect(() => {
    convertToXml('./__tests__/test2.txt');
  }).toThrow();
});