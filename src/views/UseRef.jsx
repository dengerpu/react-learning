import React, { useEffect, useRef, useState } from 'react'

function Demo() {
  let x = useRef(null);
  let y = React.createRef();
  let z;
  useEffect(() => {
    console.log(x.current, y.current, z)
  }, [])
  return <>
  {/* // Function components cannot have string refs. We recommend using useRef() instead.
  <span ref="box"></span> */}
    <ChildDemo1 ref={x}></ChildDemo1>
    <p ref={y}>父组件的内容</p>
    <div ref={x => z = x}>这样也可以获取ref</div>
    <ChildDemo2></ChildDemo2>
  </>
}

// 基于forwardRef实现ref转发，目的：获取子组件内部的某个元素
const ChildDemo1 = React.forwardRef(function ChildDemo1(props, ref) {
  // console.log(ref)
  return <>
    <span ref={ref}>子组件1</span>
  </>
})

let prev1;
let prev2;
const ChildDemo2 = function ChildDemo2() {
  let [num, setNum] = useState(0);
  let x1 = useRef(null);
  let x2 = React.createRef();

  if(!prev1) {
    // 第一次DEMO执行，把第一次创建的REF对象赋值给变量
    prev1 = x1;
    prev2 = x2;
  } else {
    console.log('prev1 === x1', prev1 === x1); // useRef再每一次组件更新的时候（函数重新执行），再次执行useRef方法的时候，不会创建新的REF对象了，获取到的还是第一次创建的那个REF对象！！
    console.log('prev2 === x2', prev2 === x2); // false createRef在每一次组件更新的时候，都会创建一个全新的REF对象出来，比较浪费性能！！
    // 总结：在类组件中，创建REF对象，我们基于 React.createRef 处理；但是在函数组件中，为了保证性能，我们应该使用专属的 useRef 处理！！
  }

  return (<>
    <div>测试useRef和React.createRef区别</div>
    <span>num: {num}</span>
    <button onClick={
      () => {
        setNum(num + 1)
      }
    }>新增</button>
  </>)
}
export default Demo