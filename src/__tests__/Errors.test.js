import { render, screen } from "@testing-library/react";
import { Errors } from "../components/Errors/Errors";
import { errorsMock } from "../__mocks__/errorsMock";

describe("Test the errors component", () => {
  beforeAll(() => {
    jest.useFakeTimers("modern");
    jest.setSystemTime(new Date("2017-01-01"));
  });

  test("renders the Errors", () => {
    render(
      <Errors
        errors={errorsMock}
        fileData={{
          name: "",
          type: "",
        }}
      />
    );
    expect(screen.getByText(/Duplicate key errors:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Incorrected end balance errors:/i)
    ).toBeInTheDocument();
  });

  test("Doesnt render errors", () => {
    render(
      <Errors
        errors={{
          date: "Thu Feb 02 2023",
          time: "16:04:30",
          duplicateKeys: [],
          invalidEndBalance: [],
          invalidFileType: { name: "", type: "" },
          itemsChecked: 5,
        }}
        fileData={{
          name: "test.csv",
          type: "text/csv",
        }}
      />
    );
    expect(
      screen.queryByText(/Duplicate key errors:/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Incorrected end balance errors:/i)
    ).not.toBeInTheDocument();
  });

  test("Show error for wrong file type", () => {
    render(
      <Errors
        errors={{
          date: "Thu Feb 02 2023",
          time: "16:04:30",
          duplicateKeys: [],
          invalidEndBalance: [],
          invalidFileType: { name: "index.html", type: "html" },
          itemsChecked: 0,
        }}
        fileData={{
          name: "index.html",
          type: "html",
        }}
      />
    );
    expect(screen.queryByText(/Invalid file provided/i)).toBeInTheDocument();
  });
});
