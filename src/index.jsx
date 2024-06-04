import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './router/基本使用/index.jsx';
// import './views/mobx/autorun'
// import './views/mobx/computed'

import 'antd/dist/antd.css';
import Echarts from './views/echarts';

import './装饰器/decorator1.js'
import './装饰器/decorator2.js'
 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Demo></Demo>
    <Echarts></Echarts>
  </>
);

