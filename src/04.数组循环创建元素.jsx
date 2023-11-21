import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
let arr = [
  {
  id: 1,
  title: '1111111111111'
  },
  {
    id: 2,
    title: '222222222222'
  },
  {
    id: 3,
    title: '3333333333333333'
  },  
]
root.render(
  <>
   <ul>
    {arr.map((item, index) => {
      // 循环创建的元素一定设置key属性，属性值是本次循环中的“唯一值”「优化DOM-DIFF
      return <li key={item.id}>
        <em>{index}</em>:
        <span>{item.title}</span>
      </li>
    })}
   </ul>
   <ol>
    {/* 要用密集数组，而不能用稀疏数组 */}
    {new Array(5).fill(null).map((_,index) => {
      return <li key={index}>列表{index}</li>
    })}
   </ol>
  </>
);