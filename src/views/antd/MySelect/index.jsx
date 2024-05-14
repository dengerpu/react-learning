import React, { useState } from 'react';
import { Select } from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;

const isValidInput = (input) => {
  const regex = /^(\d+|\d+,\d+)$/;
  return regex.test(input);
};

const CustomSelect = () => {
  const [values, setValues] = useState([]);

  const handleChange = (value) => {
    const validValues = value.filter(val => isValidInput(val));
    setValues(validValues);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      const inputValue = event.target.value;
      if (!isValidInput(inputValue)) {
        event.preventDefault();
      }
    }
  };

  return (
    <Select
      mode="tags"
      style={{ width: '100%' }}
      value={values}
      onChange={handleChange}
      tokenSeparators={[',']}
      onInputKeyDown={handleInputKeyDown}
    >
      {values.map((value) => (
        <Option key={value} value={value}>{value}</Option>
      ))}
    </Select>
  );
};

const App = () => (
  <div style={{ padding: '50px' }}>
    <h1>Custom Select Input</h1>
    <CustomSelect />
  </div>
);

export default App;
