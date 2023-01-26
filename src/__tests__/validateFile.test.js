import { validateMock } from "../__mocks__/validateMock";
import { validate } from "../helpers/validate";
import { errorsMock } from "../__mocks__/errorsMock";

test("validateFile function", () => {
  const result = validate(validateMock);
  
  expect(result).toEqual(errorsMock);
  expect(result).toMatchSnapshot();
});
