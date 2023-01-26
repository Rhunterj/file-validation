import { convertedData } from "../types";

export const validate = (obj: convertedData[]) => {
  const errors: any = [];
  const hasDuplicateReference = obj.reduce((acc, curr) => {
    acc[curr.reference] = ++acc[curr.reference] || 0;
    return acc
  }, {} as Record<string, number>)

  const duplicateReferences = obj.filter(item => hasDuplicateReference[item.reference]);
  errors.duplicateKeys = duplicateReferences;

  const checkEndbalance = (item: convertedData) => item.endBalance !== Math.round((item.startBalance + item.mutation) * 100) / 100;
  const hasInvalidEndBalance = obj.filter((item) => checkEndbalance(item));

  errors.invalidEndBalance = hasInvalidEndBalance;

  return errors;
}