import { convertedDataType } from "../types";
import { slugify } from "./slugify";
import { convertStringToNumber } from "./stringToNumber";

export const convertCsvToData = (csv: string): convertedDataType[] => {
  const lines = csv.split("\n").slice(1);
  lines.pop(); // remove last empty line

  return lines.map(line => {
    const values = line.split(",");
    const headers = csv.split("\n")[0].split(",");

    return headers.reduce((obj: any, header: string, index: number) => {
      obj[slugify(header)] = convertStringToNumber(values[index]);
      return obj;
    }, {}) as convertedDataType
  });
}