import React from 'react';
import Input from './components/Input/Input';
import * as s from './App.styled';

const App = () => {
  return (
    <s.reset>
      <s.container>
        <Input label="test" />
      </s.container>
    </s.reset>
  );
}

export default App;
