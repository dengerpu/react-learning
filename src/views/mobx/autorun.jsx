import { observable, autorun } from 'mobx'

class Store {
  @observable count = 0
}

const store = new Store()

// autorun 是一个函数，它接受一个函数作为参数，该函数会在依赖发生变化时自动执行【最开始立即执行一次】
autorun(() => {
  console.log('Count is:', store.count)
})

// 一秒钟后改变内容
setTimeout(() => {
  store.count++
}, 1000)