export type convertedDataType = {
  accountNumber: string;
  description: string;
  endBalance: number;
  mutation: number;
  reference: string | number;
  startBalance: number;
}

export type fileType = {
  name: string;
  type: string;
}

export type errorsType = {
  date: string,
  time: string,
  duplicateKeys: convertedDataType[];
  invalidEndBalance: convertedDataType[];
  invalidFileType: fileType;
  itemsChecked: number;
}