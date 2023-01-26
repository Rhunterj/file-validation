import React, { useEffect, useState } from "react";
import { slugify } from "../../helpers/slugify";
import { convertStringToNumber } from "../../helpers/stringToNumber";
import * as s from "./Input.styled";

interface InputProps {
  label: string;
}

interface convertedData {
  accountNumber: string;
  description: string;
  endBalance: string | number;
  mutation: string | number;
  reference: string | number;
  startBalance: string | number;
}

const Input = ({ label, ...props }: InputProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileText, setFileText] = useState<string | null>(null); 
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (fileText) {
      const json = convertFileToJson(fileText);

      if(typeof json === 'object' && json !== null) {
        validateObj(json);
      }
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

  const convertCsvToData = (csv: string): convertedData[] => {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length - 1; i++) {
      const obj: Record<string, any> = {};
      const currentline = lines[i].split(",");

      for (let j = 0; j < headers.length - 1; j++) {
        const slugifiedKey = slugify(headers[j]);
        obj[slugifiedKey!] = convertStringToNumber(currentline[j]);
      }

      result.push((obj as unknown) as convertedData)
    }
    console.log(result, 'csv')
    return result;
  }

  const convertXmlToData = (xml: string): convertedData[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, "text/xml");
    const result = [];
    const records = xmlDoc.querySelectorAll('record')!;

    for (let i = 0; i < records.length; i++) {
      const obj: Record<string, any> = {};

      const reference = records[i].getAttribute("reference");
      const slugifiedKey = slugify(reference!);
      obj[slugifiedKey!] = Number(reference);

      const children = records[i].children;
      for (let j = 0; j < children.length; j++) {
        const slugifiedKey = slugify(children[j].tagName);
        obj[slugifiedKey!] = convertStringToNumber(children[j].innerHTML);
      }

      result.push((obj as unknown) as convertedData);
    }
    console.log(result, 'xml')

    return result;
  }

  const convertFileToJson = (file: string) => {
    if (!file) return;
    
    if (fileType === "text/csv") {
      return convertCsvToData(fileText!);
    } 
    
    if (fileType === "text/xml") {
      return convertXmlToData(fileText!);
    }

    return 'Please provie a valid file';
  }

  const validateObj = (obj: convertedData[]) => {
    const hasDuplicateReference = obj.reduce((acc, curr) => {
      acc[curr.reference] = ++acc[curr.reference] || 0;
      return acc
    }, {} as Record<string, number>)

    const duplicateReferences = obj.filter(e => hasDuplicateReference[e.reference]);
    console.log(hasDuplicateReference, 'hasDuplicateReference');
    console.log(duplicateReferences, 'duplicateReferences');
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