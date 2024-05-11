import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/antd/DateRange'

import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import './装饰器/decorator1.js'
import './装饰器/decorator2.js'
import moment from 'moment'
import 'moment/locale/zh-cn' // 手动引入中文语言包
moment.locale('zh-cn')

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ConfigProvider locale={zhCN}>
    <Demo></Demo>
  </ConfigProvider>
);

