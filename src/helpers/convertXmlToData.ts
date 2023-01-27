import { convertedDataType } from "../types";
import { convertStringToNumber } from "./stringToNumber";

export const convertXmlToData = (xml: string): convertedDataType[] => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xml, "text/xml");
  const records = xmlDoc.querySelectorAll('record');

  return Array.from(records, record => {
    const obj: Record<string, any> = {};
    obj['reference'] = Number(record.getAttribute("reference"));
    Array.from(record.children).forEach(child => {
      obj[child.tagName] = convertStringToNumber(child.innerHTML);
    });
    return obj as convertedDataType;
  });
}