import React from 'react'

class Child1 extends React.Component {
  emBox = React.createRef()
  state = {
      x: 100,
      y: 200
  };
  render() {
      return <div>
          <span>子组件1</span>
          <em ref={this.emBox}>100</em>
      </div>;
  }
}

const Child2 = React.forwardRef(function Child2(props, ref) {
  return <>
    子组件2
    <button ref={ref}>按钮</button>
  </>
})

class Demo extends React.Component {
  render() {
    return <>
      <h1>1111</h1>
      <Child1 ref={x => this.child1 = x}></Child1>
      <Child2 ref={x => this.child2 = x}></Child2>
    </>
  }

  componentDidMount() {
    console.log(this.child1); // 存储的是:子组件的实例对象
    console.log(this.child2);
  }
}

export default Demo