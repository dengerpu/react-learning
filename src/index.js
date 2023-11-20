// ES6内置API做兼容处理
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
import "@/index.less"

const root = ReactDOM.createRoot(document.getElementById('root'));

class Count extends React.Component{
  state = {num: 0};
  render() {
    let { num } = this.state;
    return <>
      <span>{num}</span><br/>
      <button onClick={() => {
        num++;
        this.setState({
          num
        })
      }}>累加</button>
    </>
  }
}

root.render(
  <div>
    首页
    <Count/>
  </div>
);

// 跨域测试
fetch("/jianshu/asimov/subscriptions/recommended_collections")
.then(res => res.json())
.then(data => console.log(data))

fetch("/zhihu/news/latest")
.then(res => res.json())
.then(data => console.log(data))