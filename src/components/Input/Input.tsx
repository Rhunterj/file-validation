import React, { useEffect, useState } from "react";
import * as s from "./Input.styled";

interface InputProps {
  label: string;
}

const Input = ({ label, ...props }: InputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileText, setFileText] = useState<string | null>(null); 
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (fileText) {
      convertFileToJson(fileText);
    }
  }, [fileText]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    if (!e.target.files?.[0]) return; // if no file is selected (e.g. user clicks cancel
    
    setFile(e.target.files[0]);
    setFileType(e.target.files[0].type);

    readFile(e.target.files[0]);
  }

  
  const readFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      setFileText(reader.result as string);
    };
  
    reader.readAsText(file);
  }
  
  const convertCsvToJson = (csv: string) => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {
      const obj: Record<string, any> = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }
    console.log(result, 'csv')
    return result;
  }

  const convertXmlToJson = (xml: string) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const result = [];
    const headers = xmlDoc.getElementsByTagName("column");

    for (let i = 0; i < headers.length; i++) {
      const obj: Record<string, any> = {};

      const currentline = headers[i].getElementsByTagName("value");

      for (let j = 0; j < currentline.length; j++) {
        obj[headers[j].textContent!] = currentline[j].textContent;
      }

      result.push(obj);
    }
    console.log(result, 'xml')

    return result;
  }

  const convertFileToJson = (file: string) => {
    if (!file) return;
    
    if (fileType === "text/csv") {
      return convertCsvToJson(fileText!);
    } 
    
    if (fileType === "text/xml") {
      return convertXmlToJson(fileText!);
    }

    return 'Please provie a valid file';
  }

 
  return (
    <s.inputWrapper>
      <h2>Insert your file here: </h2>
      <label>{label}</label>
      <input type="file" accept=".csv, .xml"{...props} onChange={onChange}/>
    </s.inputWrapper>
  );
};

export default Input;