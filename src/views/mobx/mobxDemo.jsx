import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

// 公共状态管理
class Store {
  @observable count = 0;

  @action
  increment() {
    this.count++;
  }
}
const store = new Store();

// 组件监听
// @observer
// class Demo extends React.Component {
//   render() {
//     return (
//       <div>
//         <p>{store.count}</p>
//         <button onClick={() => store.increment()}>+1</button>
//       </div>
//     );
//   }
// }

// 函数组件不支持装饰器，我们则基于observer把其执行即可
const Demo = observer(() => {
  return (
    <div>
      <p>{store.count}</p>
      <button onClick={() => store.increment()}>+1</button>
    </div>
  );
})

export default Demo;