// ES6内置API做兼容处理
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
import "@/index.less"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    首页
  </div>
);

// 跨域测试
fetch("/jianshu/asimov/subscriptions/recommended_collections")
.then(res => res.json())
.then(data => console.log(data))

fetch("/zhihu/news/latest")
.then(res => res.json())
.then(data => console.log(data))