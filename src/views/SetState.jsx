import React from 'react'
import { flushSync } from 'react-dom'
// flushSync:可以刷新“updater更新队列”，也就是让修改状态的任务立即批处理一次！！
class Demo extends React.Component {
  state = {
      x: 10,
      y: 5,
      z: 0
  };

  handle = () => {
      let { x, y } = this.state;
      // this.setState({ x: x + 1 }, () => {
      //   console.log("setState回调函数：当前部分状态更新完毕后执行")
      // });
      // console.log(this.state); //10/5/0

      // // 同时修改三个状态值，只会出发一次视图更新
      // this.setState({ 
      //   x: x + 1,
      //   y: y + 1,
      //   z: z + 1
      // });

      this.setState({ x: x + 1 })
      console.log(this.state); //10/5/0
      flushSync(() => {
        this.setState({ y: y + 1 });
        console.log(this.state); //10/5/0
      }) 
      console.log(this.state) //11/6/0
      // flushSync();可以这样直接调用
      
      // 在修改z之前，要保证x/y都已经更改和让视图更新了
      this.setState({ z: this.state.x + this.state.y });
  };

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    console.log("componentDidUpdate,更新完毕后执行，在setState回调函数之前")
  }

  /* handle = () => {
      let { x, y, z } = this.state;
      this.setState({ x: x + 1 }); //异步
      this.setState({ y: y + 1 }); //异步
      console.log(this.state); //{x:10,y:5,z:0} -> 渲染

      setTimeout(() => {
          this.setState({ z: z + 1 }); //异步
          console.log(this.state); //{x:11,y:6,z:0} -> 渲染
      }, 1000);
  }; */

  render() {
      console.log('视图渲染:RENDER');
      let { x, y, z } = this.state;
      return <div>
          x:{x} - y:{y} - z:{z}
          <br />
          <button onClick={this.handle}>按钮</button>
      </div>;
  }
}

export default Demo;