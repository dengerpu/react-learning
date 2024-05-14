import React, { useEffect } from 'react';
import { Pagination, Button } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.scss'

const MyPagination = () => {
  // useEffect(() => {
  //   const input = document.getElementsByClassName('ant-pagination-options-quick-jumper')[0];
  //   input.getElementsByTagName('input')[0].placeholder = '跳至';
  // }, [])
  
  const customLocale = {
    Pagination: {
      items_per_page: '/ 页',
      jump_to: '前往',
      jump_to_confirm: '确认',
      page: '页',
    },
  };

  return (
    <ConfigProvider locale={{ ...zhCN, ...customLocale }}>
      <Pagination total={100}  showQuickJumper={{
          goButton: (
            <Button type="primary" size="small" style={{ marginLeft: 8 }}>
              Go
            </Button>
          )
        }} />
    </ConfigProvider>
  );
};

export default MyPagination;
