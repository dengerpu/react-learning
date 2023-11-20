import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
let flag = false
root.render(
  <>
    {/* 控制元素的display样式:不论显示还是隐藏，元素本身都渲染出来了 */}
    <button style={{
      display: flag ? 'block': 'none'
    }}>控制显示</button>
    <br/>
    {/* 控制元素渲染或者不渲染 */}
    {flag ? <button>控制显示</button> : null}
    <br/>
    {flag && <button>控制显示</button>}
  </>
);