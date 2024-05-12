import { useState, useEffect }  from 'react';
import { DatePicker, Button, ConfigProvider } from 'antd';
import './daterange.scss';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';

const { RangePicker } = DatePicker;
const DateRange = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([moment().subtract(6, 'days'), moment()]);
  const [pickerVisible, setPickerVisible] = useState(false); // 控制日期选择器弹框的显示隐藏

  useEffect(() => {
    console.log('我只会执行一次', selectedDateRange)
  },[])

  useEffect(() => {
    console.log('useEffect, selectedDateRange:', selectedDateRange)
  }, [selectedDateRange])

  const handleYesterday = () => {
    const yesterday = moment().subtract(1, 'days');
    setSelectedDateRange([yesterday, yesterday]);
  };

  const handleLast7Days = () => {
    const last7Days = [moment().subtract(6, 'days'), moment()];
    setSelectedDateRange(last7Days);
  };



  const handleCancel = () => {
    setSelectedDateRange([]); // 清空选中的日期范围
    setPickerVisible(false); // 关闭日期选择器弹框
  };

  // 点击确认才能发送请求
  const handleConfirm = () => {
    // 处理确认按钮点击事件，可以在这里执行你需要的逻辑
    console.log("点击了确认按钮Selected Date Range:", selectedDateRange);
    setPickerVisible(false); // 关闭日期选择器弹框
  };

  const handleOpenChange = (open) => {
    if (!open) return; // 如果弹框是关闭的，不做任何操作
    setPickerVisible(open);
  };

  const onCalendarChange = (dates) => {
    console.log('onCalendarChange:', dates);
    setSelectedDateRange(dates);
  }

  const renderFooter = () => (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={handleCancel}>取消</Button>
      <Button type="primary" onClick={handleConfirm}>确定</Button>
    </div>
  );

  return (
    <div>
      <div className="date-buttons">
        <Button onClick={handleYesterday}>昨日</Button>
        <Button onClick={handleLast7Days}>近7日</Button>
      </div>
      <RangePicker
        locale={locale}
        separator='至'
        value={selectedDateRange}
        onChange={(dates) => {
          console.log('onChange事件触发', dates);
        }}
        onCalendarChange={onCalendarChange} // 选择日期时不关闭弹框
        renderExtraFooter={renderFooter} // 在日期选择器下方添加页脚按钮
        onOpenChange={handleOpenChange} // 控制日期选择器弹框的显示隐藏
        open={pickerVisible} // 控制日期选择器弹框的显示隐藏
      />  
    </div>
  );
};

export default DateRange; 
