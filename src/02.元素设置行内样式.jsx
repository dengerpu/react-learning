import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <h2 className='abc' style={{
      color: 'red', 
      fontSize: '24px' // 样式属性要用驼峰命名法
      }}>
      首页
    </h2>
  </>
);