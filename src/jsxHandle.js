/**
 * 创建虚拟DOM对象
 * @param {*} ele 元素
 * @param {*} props 属性
 * @param  {...any} children 子节点
 */
export function createElement(ele, props, ...children) {
  let virtualDOM = {
    $$typeof: Symbol('react.element'),
    key: null,
    ref: null,
    type: null,
    props: {}
  };
  let len = children.length;
  virtualDOM.type = ele;
  if(props != null) {
    virtualDOM.props = {
      ...props
    }
  }
  if(len === 1) virtualDOM.props.children = children[0];
  if(len > 0) virtualDOM.props.children = children;
  return virtualDOM;
}

/**
 * 虚拟DOM渲染为真实DOM
 * @param {*} virtualDOM  
 * @param {*} container 容器
 */
export function render(virtualDOM, container) {
  let {type, props} = virtualDOM;
  if(typeof type === "string") {
    // 动态创建标签
    let element = document.createElement(type);
    each(props, (value, key) => {
      // className的处理：value存储的是样式类名
      if(key === 'className') {
        element.className = value;
        return;
      }
      // style的处理：value存储的是样式对象
      if(key === 'style') {
        let styleObj = value;
        each(styleObj, (val, attr) => {
          element.style[attr] = val;
        })
        return;
      }
      // 子节点的处理：value存储的children属性值
      if(key === 'children') {
        let children = value;
        if(!Array.isArray(children)) children = [children];
        children.forEach(child => {
          // 子节点是文本节点：直接插入即可
          if(/^(string|number)$/.test(typeof child)) {
            element.appendChild(document.createTextNode(child));
            return;
          }
          // 子节点又是一个virtualDOM：递归处理
          render(child, element);
        });
        return;
      }
      element.setAttribute(key, value);
    })
    // 把新增的标签，增加到指定容器中
    container.appendChild(element);
  }
}

/* 
封装一个对象迭代的方法 
  + 基于传统的for/in循环，会存在一些弊端「性能较差(既可以迭代私有的，也可以迭代公有的)；只能迭代“可枚举、非Symbol类型的”属性...」
  + 解决思路：获取对象所有的私有属性「私有的、不论是否可枚举、不论类型」
    + Object.getOwnPropertyNames(arr) -> 获取对象非Symbol类型的私有属性「无关是否可枚举」
    + Object.getOwnPropertySymbols(arr) -> 获取Symbol类型的私有属性
    获取所有的私有属性：
      let keys = Object.getOwnPropertyNames(arr).concat(Object.getOwnPropertySymbols(arr));
    可以基于ES6中的Reflect.ownKeys代替上述操作「弊端：不兼容IE」
      let keys = Reflect.ownKeys(arr);
*/
const each = function each(obj, callback) {
  if(obj == null || typeof obj !== "object") throw new TypeError("obj is not a object");
  if(typeof callback !== "function") throw new TypeError("callback is not a function");
  let keys = Reflect.ownKeys(obj);
  keys.forEach(key => {
    let value = obj[key];
    // 每一次迭代，都把回调函数执行
    callback(value, key);
  })
}