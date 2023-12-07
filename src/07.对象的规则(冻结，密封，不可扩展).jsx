import React from 'react';
import ReactDOM from 'react-dom/client';
import FunComponent from './views/FunctionComponent'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <FunComponent title="我是标题" x={10} y="10" data={[100,200]} className="box" style={{ fontSize: '20px'}}/>
    <FunComponent></FunComponent>
  </>
);

// 对象规则
const obj = {x: 1, y: 2, z: 3};
// Object.freeze(obj)
// console.log(Object.isFrozen(obj)) // 判断一个对象是否被冻结
// 冻结后，不能新增，不能修改，不能删除，不能劫持
// obj.x = 1111;
// obj.a = 2222;
// delete obj.z;
// Object.defineProperty(obj, 'x', {
//   get() {},
//   set() {}
// })

// 密封对象
// Object.seal(obj);
// // 密封后，可以修改，不能新增，不能删除
// obj.x = 15; // 可修改
// obj.a = 2222; // 不能新增
// delete obj.z; // 不能删除
// Object.defineProperty(obj, 'x', { // 不可以被重新定义
//   get() {},
//   set() {}
// })
Object.seal(obj);
console.log(Object.isSealed(obj))

// 不可扩展
// Object.preventExtensions(obj);
// 可修改，可删除，不可新增，不可以被重新定义
// obj.x = 1111; // 可修改
// // obj.a = 333;  // 不可新增
// delete obj.y; // 可删除
// Object.defineProperty(obj, 'x', { // 可以被重新定义
//   get() {},
//   set() {}
// })
console.log(Object.isExtensible(obj));
console.log(obj);


