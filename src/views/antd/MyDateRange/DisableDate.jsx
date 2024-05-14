import React, { useState } from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';

const { RangePicker } = DatePicker;

const CustomRangePicker = () => {
  const [dates, setDates] = useState([]);
  const [value, setValue] = useState([]);

  // 限制日期选择
  const disabledDate = (current) => {
    // 今天和今天之后的日期不可选
    const today = moment().endOf('day');
    // 近两年前的日期不可选
    const twoYearsAgo = moment().subtract(2, 'years').startOf('day');
    // 日期不能超出近两年和今天
    if (!current) return false;
    return current.isAfter(today) || current.isBefore(twoYearsAgo);
  };

  // 限制选择范围在60天以内
  const disabledDateRange = (dates, current) => {
    if (!dates || dates.length === 0) return false;
    const tooLate = dates[0] && current.diff(dates[0], 'days') > 60;
    const tooEarly = dates[1] && dates[1].diff(current, 'days') > 60;
    return tooLate || tooEarly;
  };

  const handleCalendarChange = (dates) => {
    setDates(dates);
  };

  const handleChange = (value) => {
    setValue(value);
    setDates([]);
  };

  return (
    <RangePicker
      value={value}
      onChange={handleChange}
      onCalendarChange={handleCalendarChange}
      disabledDate={(current) => disabledDate(current) || disabledDateRange(dates, current)}
      style={{ width: '100%' }}
    />
  );
};

const App = () => (
  <div style={{ padding: '50px' }}>
    <h1>Custom RangePicker</h1>
    <CustomRangePicker />
  </div>
);

export default App;
