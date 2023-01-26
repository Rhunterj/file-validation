export const convertStringToNumber = (str: string) => {
  const number = Number(str);

  if (isNaN(number)) {
    return str;
  }

  return number;
}