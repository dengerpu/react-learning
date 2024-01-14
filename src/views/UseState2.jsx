import React, {useState}from 'react'

// 实现原理
// var _state;
// function useState(initialValue) {
//   // 这样保证了初始值只会被赋值一次
//   if(typeof _state === 'undefined') {
//     if(typeof initialValue === "function") {
//       _state = initialValue();
//     } else {
//       _state = initialValue;
//     }
//   }
//   var setState = function setState(value) {
//     // 两个值相同，不更新视图
//     if(Object.is(value, _state)) return;
//     if(typeof value === 'function') {
//       _state = value(_state);
//     } else {
//       _state = value;
//     }
//     // 通知视图更新
//   }
//   return [_state, setState];
//   // 返回一个数组，第一个是当前状态，第二个是更新状态的函数
// }
// let [num1, setNum] = useState(0); //num1=0  setNum=setState 0x001
// setNum(100); //=>_state=100 通知视图更新
// // ---
// let [num2, setNum] = useState(0); //num2=100  setNum=setState 0x002

export default function Demo() { 
  let [num, setNum] = useState(10);
  const handler = () => {
      setNum(100);
      setTimeout(() => {
          console.log(num); //10
      }, 1000);
  };
  return <div>
      <span>{num}</span>
      <button onClick={handler}>新增</button>
  </div>;
}