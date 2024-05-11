import { useState }  from 'react';
import { DatePicker, Button, ConfigProvider } from 'antd';
import './daterange.scss';
import zhCN from 'antd/es/locale/zh_CN'; // 引入语言包
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn'); // 注意这里设置 moment 必须放在有 import 的后面。

const { RangePicker } = DatePicker;
const DateRange = () => {
  const [selectedDateRange, setSelectedDateRange] = useState([]);
  const [pickerVisible, setPickerVisible] = useState(false); // 控制日期选择器弹框的显示隐藏

  const handleCancel = () => {
    setSelectedDateRange([]); // 清空选中的日期范围
    setPickerVisible(false); // 关闭日期选择器弹框
  };

  const handleConfirm = () => {
    // 处理确认按钮点击事件，可以在这里执行你需要的逻辑
    console.log("Selected Date Range:", selectedDateRange);
    setPickerVisible(false); // 关闭日期选择器弹框
  };

  const handleOpenChange = (open) => {
    setPickerVisible(open);
  };

  const renderFooter = () => (
    <div style={{ textAlign: 'center' }}>
      <Button onClick={handleCancel}>取消</Button>
      <Button type="primary" onClick={handleConfirm}>确定</Button>
    </div>
  );

  return (
    <div>
      <ConfigProvider locale={zhCN}>
      <RangePicker
        separator='至'
        value={selectedDateRange}
        onChange={dates => setSelectedDateRange(dates)}
        renderExtraFooter={renderFooter} // 在日期选择器下方添加页脚按钮
        onOpenChange={handleOpenChange} // 控制日期选择器弹框的显示隐藏
        open={pickerVisible} // 控制日期选择器弹框的显示隐藏
      />  
      </ConfigProvider>
    </div>
  );
};

export default DateRange;