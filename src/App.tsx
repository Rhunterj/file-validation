import React from 'react';
import './App.css';
import Input from './components/Input/Input';
import * as s from './App.styled';

const App = () => {
  return (
    <s.container>
      <Input label="test" />
    </s.container>
  );
}

export default App;
