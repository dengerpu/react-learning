import React from "react"

class Demo extends React.Component {
  box2 = React.createRef(); // 等价于 创建了一个对象 this.box2 = { current: null};
  render() {
    return <div>
        <h2 id="dom">DOM</h2>
        <h2 className="title" ref="titleBox">温馨提示</h2>
        <h2 className="title" ref = {x => this.box = x}>友情提示</h2>
        <h2 className="title" ref={this.box2}>郑重提示</h2>
    </div>;
  }
  // 组件渲染后的生命周期函数
  componentDidMount() {
    // 这个时候虚拟DOM已经渲染为真实DOM了，可以直接获取
    console.log(document.querySelector('#dom'));
    // ref方式获取元素
    console.log(this.refs.titleBox);
    console.log(this.box)
    console.log(this.box2.current)
  }
}

export default Demo