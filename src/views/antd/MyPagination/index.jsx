import React from 'react';
import { Pagination } from 'antd';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import './index.scss'

const MyPagination = () => {
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
      <Pagination total={100} showQuickJumper />
    </ConfigProvider>
  );
};

export default MyPagination;
