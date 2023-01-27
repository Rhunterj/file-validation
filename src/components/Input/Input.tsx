import React, { useState } from "react";
import { errorsType } from "../../types";
import { validate } from "../../helpers/validate";
import * as s from "./Input.styled";
import { Errors } from "../Errors/Errors";
import { convertCsvToData } from "../../helpers/convertCsvToData";
import { convertXmlToData } from "../../helpers/convertXmlToData";

interface InputProps {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  const [errors, setErrors] = useState<errorsType>({
    duplicateKeys: [],
    invalidEndBalance: [],
    invalidFileType: { name: "", type: "" },
    itemsChecked: 0,
  });
  const [file, setFile] = useState<any | null>({ name: "", type: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return; // if no file is selected (e.g. user clicks cancel

    if (
      e.target.files[0].type !== "text/csv" &&
      e.target.files[0].type !== "text/xml"
    ) {
      setErrors({
        duplicateKeys: [],
        invalidEndBalance: [],
        invalidFileType: {
          name: e.target.files[0].name,
          type: e.target.files[0].type,
        },
        itemsChecked: 0,
      });
      return;
    }

    readFile(e.target.files[0], e.target.files[0].type);
    setFile({ name: e.target.files[0].name, type: e.target.files[0].type });
  };

  const readFile = (file: File, type: string) => {
    const reader = new FileReader();

    reader.onload = () => {
      const fileText = reader.result as string;
      const json = convertFileToJson(fileText, type);

      if (typeof json === "object" && json !== null) {
        const errorsObj = validate(json);
        setErrors(errorsObj);
      }
    };

    // set encoding to iso-8859-1 to avoid encoding issues
    reader.readAsText(file, "iso-8859-1");
  };

  const convertFileToJson = (file: string, type: string) => {
    if (!file) return;

    if (type === "text/csv") {
      return convertCsvToData(file!);
    }

    return convertXmlToData(file!);
  };

  return (
    <s.inputWrapper>
      <s.labelWrapper>
        <s.label>{label}</s.label>
        <input type="file" accept=".csv, .xml" {...props} onChange={onChange} />
      </s.labelWrapper>
      {(errors.duplicateKeys.length > 0 ||
        errors.invalidEndBalance.length > 0 ||
        errors.invalidFileType.name.length > 0) && (
        <Errors errors={errors} file={file} />
      )}
    </s.inputWrapper>
  );
};

export default Input;
