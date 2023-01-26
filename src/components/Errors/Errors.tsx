import React from "react";
import * as s from "./Errors.styled";
import { errorsType } from "../../types";

interface ErrorsProps {
  errors: errorsType;
}

export const Errors = ({ errors }: ErrorsProps) => {
  const duplicateErrors = errors.duplicateKeys.length > 0;
  const invalidEndBalance = errors.invalidEndBalance.length > 0;

  return (
    <s.errorContainer>
      {duplicateErrors && (
        <>
          <h3>Duplicate key errors:</h3>
          {errors.duplicateKeys.map((error, index) => {
            return (
              <p key={index}>
                {error.reference} - {error.description}
              </p>
            );
          })}
        </>
      )}
      {invalidEndBalance && (
        <>
          <h3>Incorrected end balance errors:</h3>
          {errors.invalidEndBalance.map((error, index) => {
            return (
              <p key={index}>
                {error.reference} - {error.description}
              </p>
            );
          })}
        </>
      )}
    </s.errorContainer>
  );
};
