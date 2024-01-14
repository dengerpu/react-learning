import React, { useEffect, useState } from 'react'


export default function Demo() {
  let [x, setX] = useState(0),
  [num, setNum] = useState(10);

  useEffect(() => {
    // 第一次渲染完成和实体更新都会触发
    // 类似 componentDidMount && componentDidUpdate
    console.log('@1', num)
  })

  useEffect(() => {
    // 第一次渲染完成触发
    // 类似 componentDidMount
    console.log('@2', num)
  }, [])

  useEffect(() => {
    // 所依赖的num状态发生改变触发
    console.log('@3', num)
  }, [num])

  useEffect(() => {
    return () => {
    // 组件释放执行
      // 获取的值还是上一次的
      console.log('@4', num);
    }
  })

  const handle = () => {
    setNum(num + 1);
  };
  const handle2 = () => {
    setX(x + 1);
  }
  return <>
      <span>{num}</span>
      <button onClick={handle}>新增num</button>
      <button onClick={handle2}>新增x</button>
  </>;
}