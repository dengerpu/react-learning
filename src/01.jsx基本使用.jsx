import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
let text = "首页"
let num = 123
let flag = true
let a = null
let b = undefined
let c = Symbol("1")
let arr = [1,2,3]
let Fun = function() {}
root.render(
  <>
    <span>number/string: 值是啥，就渲染出来啥---{text}, {num}</span><br/>
    <span>boolean/null/undefined/Symbol/BigInt---{flag}, {a}, {b}, {c}</span><br/>
    <span>数组对象:把数组的每一项都分别拿出来渲染---{arr}</span><br/>
    <span>函数对象:不支持在身中渲染，但是可以作为函数组件---<Fun/></span><br/>
  </>
);
