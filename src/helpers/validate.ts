import { convertedDataType, errorsType } from "../types";
import { getDateAndTime } from "./getDateAndTime";

export const validate = (obj: convertedDataType[]): errorsType => {
  const errors: any = {};
  const { date, time } = getDateAndTime();

  const hasDuplicateReference = obj.reduce((acc, curr) => {
    acc[curr.reference] = ++acc[curr.reference] || 0;
    return acc
  }, {} as Record<string, number>)

  const duplicateReferences = obj.filter(item => hasDuplicateReference[item.reference]);
  errors.duplicateKeys = duplicateReferences;

  const checkEndbalance = (item: convertedDataType) => item.endBalance !== Math.round((item.startBalance + item.mutation) * 100) / 100;
  const hasInvalidEndBalance = obj.filter((item) => checkEndbalance(item));

  errors.date = date;
  errors.time = time;
  errors.invalidEndBalance = hasInvalidEndBalance;
  errors.itemsChecked = obj.length;
  
  return errors;
}