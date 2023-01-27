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
  const [errors, setErrors] = useState<errorsType>({ duplicateKeys: [], invalidEndBalance: [] });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    if (!e.target.files?.[0]) return; // if no file is selected (e.g. user clicks cancel
    
    readFile(e.target.files[0], e.target.files[0].type);
  }

  const readFile = (file: File, type: string) => {
    const reader = new FileReader();

    reader.onload = () => {
      const fileText = reader.result as string;
      const json = convertFileToJson(fileText, type);
     
      if(typeof json === 'object' && json !== null) {
        const errorsObj = validate(json);
        setErrors(errorsObj);
      }
    };
  
    // set encoding to iso-8859-1 to avoid encoding issues
    reader.readAsText(file, "iso-8859-1");
  }

  const convertFileToJson = (file: string, type: string) => {
    if (!file) return;
    
    if (type === "text/csv") {
      return convertCsvToData(file!);
    } 
    
    if (type === "text/xml") {
      return convertXmlToData(file!);
    }

    return 'Please provide a valid file';
  }

  return (
    <s.inputWrapper>
      <h2>Insert your file here: </h2>
      <label>{label}</label>
      <input type="file" accept=".csv, .xml" {...props} onChange={onChange}/>
      {(errors.duplicateKeys.length > 0 || errors.invalidEndBalance.length > 0) && <Errors errors={errors} />}
    </s.inputWrapper>
  );
};

export default Input;