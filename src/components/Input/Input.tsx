import React, { useEffect, useState } from "react";
import { slugify } from "../../helpers/slugify";
import { convertStringToNumber } from "../../helpers/stringToNumber";
import { convertedDataType, errorsType } from "../../types";
import { validate } from "../../helpers/validate";
import * as s from "./Input.styled";
import { Errors } from "../Errors/Errors";

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

  const convertCsvToData = (csv: string): convertedDataType[] => {
    const lines = csv.split("\n").slice(1);
    lines.pop(); // remove last empty line

    return lines.map(line => {
      const values = line.split(",");
      const headers = csv.split("\n")[0].split(",");

      return headers.reduce((obj: any, header: string, index: number) => {
        obj[slugify(header)] = convertStringToNumber(values[index]);
        return obj;
      }, {}) as convertedDataType
    });
  }

  const convertXmlToData = (xml: string): convertedDataType[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const records = xmlDoc.querySelectorAll('record');

    return Array.from(records, record => {
      const obj: Record<string, any> = {};
      obj['reference'] = Number(record.getAttribute("reference"));
      Array.from(record.children).forEach(child => {
        obj[child.tagName] = convertStringToNumber(child.innerHTML);
      });
      return obj as convertedDataType;
    });
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