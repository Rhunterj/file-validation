import { validateMock } from "../__mocks__/validateMock";
import { validate } from "../helpers/validate";
import { validateErrorMock } from "../__mocks__/validateErrorMock";

test("validateFile function", () => {
  const result = validate(validateMock);
  
  expect(result).toEqual(validateErrorMock);
  expect(result).toMatchSnapshot();
});
