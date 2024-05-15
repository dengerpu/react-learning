import { observable, autorun, computed, reaction } from "mobx";

class Store {
  @observable x = 10;
  @observable count = 20;
  @observable price = 30;
  // 设置具备计算缓存的计算属性：依赖的状态值没有变化，方法不会重新执行，使用之前计算缓存的结果
  @computed get total() {
    console.log('计算属性执行');
    return this.x + this.count + this.price;
  }
}
let store = new Store();

autorun(() => {
  console.log('autorun执行', store.total, store.x);
})

// 相比较于autorun，提供更精细的管控「第一次不会触发」
reaction(
  () => [store.total, store.x],
  ([total, x], [prevTotal, prevX]) => {
    console.log('reaction执行', total, x, prevTotal, prevX);
  }
)

setTimeout(() => {
  store.x = 100;
  store.count = 200;
}, 1000)