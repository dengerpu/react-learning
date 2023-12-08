import React from 'react';
import PropTypes from 'prop-types';

const SlotComponent = function (props) {
  let {children} = props;
  // 要对children的类型做处理
  // 可以基于React.Children对象中提供的方法，对props.children做处理:count\forEach\map\toArray...
  // 好处:在这些方法的内部，已经对children的各种形式做了处理
  children = React.Children.toArray(children);
  // if(!children) {
  //   children = []
  // } else if (!Array.isArray(children)) {
  //   children = [children]
  // }
  let headerSlot = [],
  contentSlot = [],
  footerSlot = [];
  children.forEach(child => {
    // 传递进来的插槽信息，都是编译为virtualDOM后传递进来的「签」
    let {slot} = child.props;
    if(slot === 'header') {
      headerSlot.push(child)
    } else if (slot === 'content') {
      contentSlot.push(child);
    } else {
      footerSlot.push(child);
    }
  })
  return <div>
    {headerSlot}
    <hr/>
    {contentSlot}
    <br />
    {footerSlot}
  </div>;
}
// 设置默认值
SlotComponent.defaultProps = {
  x: 1,
  y: "11",
  title: "默认标题"
}
// 设置其他校验规则
SlotComponent.propTypes = {
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
export default SlotComponent;