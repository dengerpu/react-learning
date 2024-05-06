const classDecorator = (target) => {
  // target:被修饰的类「Demo」
  target.num = 100; //给类设置静态私有属性
  // return function () { } //返回的值将替换现有Demo的值
}

@classDecorator
class Demo { }

// 编译结果
// var _class;
// const classDecorator = target => {
//   // target:被修饰的类「Demo」
//   target.num = 100; //给类设置静态私有属性
//   // return function () { } //返回的值将替换现有Demo的值
// };
// let Demo = classDecorator(_class = class Demo {}) || _class;

const classDecorator1 = (target) => {
  console.log('classDecorator1'); // 后被执行
  target.num = 100;
};
const classDecorator2 = (target) => {
  console.log('classDecorator2'); // 这个先被执行
  // 给类的原型上设置公共属性/方法
  target.prototype.say = function say() { };
};

@classDecorator1 //第一个装饰器
@classDecorator2 //第二个装饰器
class Demo2 {

}
// const classDecorator1 = target => {
//   console.log('classDecorator1'); // 后被执行
//   target.num = 100;
// };
// const classDecorator2 = target => {
//   console.log('classDecorator2'); // 这个先被执行
//   // 给类的原型上设置公共属性/方法
//   target.prototype.say = function say() {};
// };
// let Demo2 = classDecorator1(_class2 = classDecorator2(_class2 = class Demo2 {}) || _class2) || _class2;