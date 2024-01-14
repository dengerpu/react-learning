import React, {useEffect, useState} from 'react'

// 模拟从服务器端获取数据
const queryData = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([10, 20, 30])
    }, 2000)
  })
}

export default function Demo() {
  let [num, setNum] = useState(0);

  // 这样会报错
  // if(num >= 5) {
  //   useEffect(() => {
  //     console.log('执行');
  //   })
  // }

  useEffect(() => {
    if(num >= 5) {
      console.log('执行');
    }
  })

  // 这样会报错， 加了async后，返回的是一个promise函数
  // useEffect如果设置返回值，则返回值必须是一个函数「代表组件销毁时触发」;
  // 下面案例中，callback经过async的修饰，返回的是一个promise实例，不符合要求！！
  // useEffect(async () => {
  //   let res = await queryData();
  //   console.log(res)
  // }, [])

  // 推荐用下面的方法
  useEffect(() => {
    queryData().then(res => {
      console.log(res)
    })
  }, [])

  // 或者这种方式也行
  useEffect(() => {
    const next = async () => {
      let res = await queryData()
      console.log(res)
    }
    next()
  })

  const handle = () => {
    setNum(num + 1); // 更新num的值
  }
  return <>
    <span>{num}</span>
    <button onClick={handle}>新增num</button>
  </>;
}
