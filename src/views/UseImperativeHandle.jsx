import React, { useImperativeHandle, useRef, useState } from "react";

class ClassChild extends React.Component {
   state = {
    num: 1
   }

  submit = () => {
    console.log('调用了子类的方法')
  }
  add = () => {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    let { num } = this.state
    return <>
      <h2>类组件</h2>
      <p>num: {num} </p>
      <button onClick={this.add}>子组件自调用点击加加</button>
    </>
  }
}

const FunDemo = React.forwardRef(function FunDemo(props, ref) {
  let [num, setNum] = useState(0)
  useImperativeHandle(ref, () => {
    // 在这里返回的内容，都可以被父组件的REF对象获取到
    return {
      num,
      add
    }
  })

  const add = () => {
    console.log('函数子组件add方法执行')
    setNum(num + 1)
  }
  return <>
    <h2>函数子组件</h2>
    <p>num: {num} </p>
    <button onClick={add}>子组件自调用点击加加</button>
  </>
})

const Demo = function Demo() {
  let child1 = useRef(null);
  let child2 = useRef(null);
  return <>
    <h1>函数式父组件</h1>
    <button onClick={() => {
      child1.current.add()
    }}>调用类组件中的方法</button>
    <button onClick={() => {
      child2.current.add()
    }}>调用函数组件中的方法</button>
    <div style={{width: 300, height: 300, border: '1px solid #ccc'}}>
      <ClassChild ref={child1}></ClassChild>
    </div>
    <div style={{width: 300, height: 300, border: '1px solid #ccc'}}>
      <FunDemo ref={child2}></FunDemo>
    </div>
    
  </>
}


export default Demo;