import React from "react";
import * as s from "./Input.styled";

interface InputProps {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  return (
    <s.inputWrapper>
      <h2>Insert your file here: </h2>
      <label>{label}</label>
      <input type="file" accept=".csv .xml"{...props} />
    </s.inputWrapper>
  );
};

export default Input;