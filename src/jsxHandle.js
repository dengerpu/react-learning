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