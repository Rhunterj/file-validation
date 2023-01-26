export type convertedDataType = {
  accountNumber: string;
  description: string;
  endBalance: number;
  mutation: number;
  reference: string | number;
  startBalance: number;
}

export type errorsType = {
  duplicateKeys: convertedDataType[];
  invalidEndBalance: convertedDataType[];
}