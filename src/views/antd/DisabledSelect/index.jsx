import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Select } from 'antd-v5';
const MAX_COUNT = 3;
const App = () => {
  const [value, setValue] = React.useState(['Ava Swift']);
  const suffix = (
    <>
      <span>
        {value.length} / {MAX_COUNT}
      </span>
      <DownOutlined />
    </>
  );
  return (
    <Select
      mode="multiple"
      maxCount={MAX_COUNT}
      value={value}
      style={{
        width: '100%',
      }}
      onChange={setValue}
      suffixIcon={suffix}
      placeholder="Please select"
      options={[
        {
          value: 'Ava Swift',
          label: 'Ava Swift',
        },
        {
          value: 'Cole Reed',
          label: 'Cole Reed',
        },
        {
          value: 'Mia Blake',
          label: 'Mia Blake',
        },
        {
          value: 'Jake Stone',
          label: 'Jake Stone',
        },
        {
          value: 'Lily Lane',
          label: 'Lily Lane',
        },
        {
          value: 'Ryan Chase',
          label: 'Ryan Chase',
        },
        {
          value: 'Zoe Fox',
          label: 'Zoe Fox',
        },
        {
          value: 'Alex Grey',
          label: 'Alex Grey',
        },
        {
          value: 'Elle Blair',
          label: 'Elle Blair',
        },
      ]}
    />
  );
};
export default App;