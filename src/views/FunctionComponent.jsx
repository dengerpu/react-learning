import React from 'react';
import PropTypes from 'prop-types';

const FunComponent = function (props) {
  console.log("父传子数据", props)
  // 接收到的对象是被冻结了的
  console.log(Object.isFrozen(props));
  let {x, y, title, children} = props;
  // 可以通过这种方式实现对传过来的数据值的修改
  let z = props.z
  z = 123
  // 也可以以这种方式赋值默认值
  // let {x = 1, y = 1, title} = props;
  // title = title ? title : '默认标题';

  // 要对children的类型做处理
  // 可以基于React.Children对象中提供的方法，对props.children做处理:count\forEach\map\toArray...
  // 好处:在这些方法的内部，已经对children的各种形式做了处理
  children = React.Children.toArray(children);
  // if(!children) {
  //   children = []
  // } else if (!Array.isArray(children)) {
  //   children = [children]
  // }
  return <div>
    <h2>{title}</h2>
    {children[0]}
    <hr/>
    我是函数组件<br/>
    {children[1]}
    <p>x: {x}</p>
    <p>y: {y}</p>
    <p>z: {z}</p>
  </div>;
}
// 设置默认值
FunComponent.defaultProps = {
  x: 1,
  y: "11",
  title: "默认标题"
}
// 设置其他校验规则
FunComponent.propTypes = {
  // 类型字符串，必传
  title: PropTypes.string.isRequired,
  // 类型是数字
  x: PropTypes.number,
  // 类型是字符串
  y: PropTypes.string,
  // 几种类型中的一种
  z: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  data: PropTypes.arrayOf(PropTypes.number)
}
export default FunComponent;