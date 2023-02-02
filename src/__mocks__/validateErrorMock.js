export const validateErrorMock = {
  date: "Sun Jan 01 2017",
  time: "01:00:00",
  duplicateKeys: [
    {
      accountNumber: "NL90ABNA0585647886",
      description: "Flowers for Richard Bakker",
      endBalance: 109.53,
      mutation: 14.63,
      reference: 138932,
      startBalance: 94.9,
    },
    {
      accountNumber: "NL93ABNA0585619023",
      description: "Candy from Vincent de Vries",
      endBalance: 6368,
      mutation: -939,
      reference: 138932,
      startBalance: 5429,
    },
  ],
  invalidEndBalance: [
    {
      accountNumber: "NL93ABNA0585619023",
      description: "Candy from Vincent de Vries",
      endBalance: 6368,
      mutation: -939,
      reference: 138932,
      startBalance: 5429,
    },
  ],
  itemsChecked: 5,
};
