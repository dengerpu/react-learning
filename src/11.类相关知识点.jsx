import React from 'react';
import ReactDOM from 'react-dom/client';
import Vote from './views/StaticFunCom'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Vote></Vote>
  </>
);

class Parent {
  constructor(x,y) {
    // new的时候，执行的构造函数「可写可不写:需要接受传递进来的实参信息，才需要设置constructor」
    this.total = x + y;
  }
  num = 20; // 等价于this.num=2000给实例, 这是私有属性
  getNum = () => {
    // 箭头函数没有自己的this，所用到的this是宿主环境中的
    console.log(this)
  }
  sum() {
    // 类似于sum=function sum(){}不是箭头函数
    // 它是给Parent.prototype上设置公共的方法「sum函数是不可枚举的」
  }
  // 把构造函数当做一个普通对象，为其设置静态的私有属性方法Parent.xxx
  static avg = 100
  static average() {

  }
}
Parent.prototype.y = 100;
let p = new Parent(10,20);
console.log(p);
p.getNum();

