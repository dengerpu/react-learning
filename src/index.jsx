import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import Demo from './router/基本使用/index.jsx';
import routes from './router/路由表/route.js';
import RouterView from './router/路由表/index.jsx';
// import './views/mobx/autorun'
// import './views/mobx/computed'
import HomeHead from './router/路由表/HomeHead.jsx';

import 'antd/dist/antd.css';
import Echarts from './views/echarts';
import DisabledSelect from './views/antd/DisabledSelect'

import './装饰器/decorator1.js'
import './装饰器/decorator2.js'
 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    {/* <Demo></Demo>
    <Echarts></Echarts> */}
    <HashRouter>
      <DisabledSelect></DisabledSelect>
      <RouterView routes={routes}></RouterView>
      <HomeHead></HomeHead>
    </HashRouter>
  </>
);

