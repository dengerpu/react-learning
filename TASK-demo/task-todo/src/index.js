import React from 'react';
import ReactDOM from 'react-dom/client';
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd';
import './index.css'
import Task from './views/Task';
// import store from './store'
import store from './store-toolkit';
import { Provider } from 'react-redux'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <Task></Task>
    </Provider>
  </ConfigProvider>
);
