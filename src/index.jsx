import React from 'react';
import ReactDOM from 'react-dom/client';
import "@/index.less"

const root = ReactDOM.createRoot(document.getElementById('root'));
let text = "首页"
root.render(
  <>
    <span>{text}</span>
    <button>按钮</button>
  </>
);