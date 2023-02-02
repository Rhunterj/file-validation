import { validateMock } from "../__mocks__/validateMock";
import { validate } from "../helpers/validate";
import { validateErrorMock } from "../__mocks__/validateErrorMock";

test("validateFile function", () => {
  jest.useFakeTimers('modern')
  jest.setSystemTime(new Date('2017-01-01'));
  
  const result = validate(validateMock);
  
  expect(result).toEqual(validateErrorMock);
  expect(result).toMatchSnapshot();
});
