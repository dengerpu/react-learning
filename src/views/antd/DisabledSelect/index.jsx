import React, { useState } from 'react';
import { Select, Tooltip } from 'antd';

const { Option } = Select;

const MySelect = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const maxSelection = 1;

  const handleChange = (value) => {
    if (value.length <= maxSelection) {
      setSelectedItems(value);
    }
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // 添加更多选项
  ];

  return (
    <Select
      mode="multiple"
      value={selectedItems}
      onChange={handleChange}
      style={{ width: '300px' }}
    >
      {options.map((option) => {
        const isDisabled = selectedItems.length >= maxSelection && !selectedItems.includes(option.value);
        return (
          <Option
            key={option.value}
            value={option.value}
            disabled={isDisabled}
          >
            <Tooltip title={isDisabled ? '最多只能选中10个' : ''}>
              {option.label}
            </Tooltip>
          </Option>
        );
      })}
    </Select>
  );
};

export default MySelect;
