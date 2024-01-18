import React, { useCallback, useState } from "react";

// let prev;
// export default function Demo() {
//   let [x, setX] = useState(0);

//   // const handler = () => {} //第一次:0x001  第二次:0x101  第三次:0x201 ...
//   const handler = useCallback(() => {}, []) //第一次:0x001  第二次:0x001  第三次:0x
//   if(!prev) {
//     prev = handler;
//   } else {
//     console.log(prev === handler) // 每次都会创建新的函数
//   }
//   const add = () => {
//     setX(x++);
//   }
//   return <>
//     <p>x: {x}</p>
//     <button onClick={add}>x++</button>
//   </>
// }

class Child extends React.PureComponent {
  render() {
    console.log('类子组件渲染');
    return <div>类子组件</div>;
  }
}

const Child2 = React.memo(function Child2() {
  console.log('函数子组件渲染')
  return <>
    <div>函数子组件</div>
  </>
})


let prev;
export default function Demo() {
  let [x, setX] = useState(0);

  // const handler = () => {} //第一次:0x001  第二次:0x101  第三次:0x201 ...
  const handler = useCallback(() => {}, []) //第一次:0x001  第二次:0x001  第三次:0x
  if(!prev) {
    prev = handler;
  } else {
    console.log(prev === handler) // 每次都会创建新的函数
  }
  const add = () => {
    setX(x++);
  }
  return <>
    <p>x: {x}</p>
    <Child handler={handler}></Child>
    <Child2 handler={handler}></Child2>
    <button onClick={add}>x++</button>
  </>
}