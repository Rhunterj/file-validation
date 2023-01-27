import React from 'react';
import Input from './components/Input/Input';
import * as s from './App.styled';

const App = () => {
  return (
    <s.reset>
      <s.container>
        <s.title>Robbin's file validator</s.title>
        <p>This application validates .xml and .csv files provided by the user.</p>
        <Input label="Provide your file here:" />
      </s.container>
    </s.reset>
  );
}

export default App;
