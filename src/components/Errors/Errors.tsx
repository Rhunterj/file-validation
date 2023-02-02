import React from "react";
import * as s from "./Errors.styled";
import { errorsType } from "../../types";

interface ErrorsProps {
  errors: errorsType;
  fileData: { name: string; type: string; };
}

export const Errors = ({ errors, fileData }: ErrorsProps) => {
  const duplicateErrors = errors.duplicateKeys.length > 0;
  const invalidEndBalance = errors.invalidEndBalance.length > 0;
  const invalidFileType = errors.invalidFileType?.name.length > 0;
  const errorAmount = errors.duplicateKeys.length + errors.invalidEndBalance.length;
  const totalAmount = errors.itemsChecked;
  const errorPercentage = (errorAmount / totalAmount) * 100;

  return (
    <s.errorContainer>
      <s.informationWrapper>
        <h3>Provided file information</h3>
        <p><b>Name:</b> {fileData.name}</p>
        <p><b>Type:</b> {fileData.type}</p>
        <p><b>Date:</b> {errors.date}</p>
        <p><b>Time:</b> {errors.time}</p>
        <h3>Validation information</h3>
        {!invalidFileType && (
          <>
            <p><b>Items checked:</b> {totalAmount}</p>
            <p><b>Errors:</b> {errorAmount}</p>
            <s.progressbar>
              <s.innerBar width={errorPercentage}>
              </s.innerBar>
            </s.progressbar>
          </>
        )}
      </s.informationWrapper>
      {duplicateErrors && (
        <>
          <h3>Duplicate key errors:</h3>
          <s.table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {errors.duplicateKeys.map((error, index) => {
                return (
                  <tr key={index}>
                    <td>{error.reference}</td>
                    <td>{error.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </s.table>
        </>
      )}
      {invalidEndBalance && (
        <>
          <h3>Incorrected end balance errors:</h3>
          <s.table>
            <thead>
              <tr>
                <th>Reference</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {errors.invalidEndBalance.map((error, index) => {
                return (
                  <tr key={index}>
                    <td>{error.reference}</td>
                    <td>{error.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </s.table>
        </>
      )}
      {invalidFileType && (
        <>
          <h3>Invalid file provided</h3>
          <p>
            Please provide a valid file type. You provided{" "}
            {errors.invalidFileType.name} with type{" "}
            {errors.invalidFileType.type}
          </p>
          <p>Accepted file types are .csv and .xml</p>
        </>
      )}
    </s.errorContainer>
  );
};
