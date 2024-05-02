import styled from 'styled-components'

// 创建公共的样式变量
const colorBlue = "#1677ff",
    colorRed = "#ff4d4f";

// 创建一个 styled.div 组件
export const Container = styled.div`
    color: ${colorBlue}; // 设置字体颜色为蓝色
    border: 1px solid ${colorRed}; // 设置边框颜色为红色
    padding: 10px;
    width: 400px;
    height: 200px;
    &:hover {
      background-color: lightblue;
    }
    p {
      color: #ccc;
    }
`

// 使用传递的属性，动态设置样式  &&  给属性设置默认值！！
export const MenuBox = styled.ul.attrs(props => {
  return {
    style: {
      // 未传值就使用默认值
      backgroundColor: props.bgColor || '#fff',
      color: props.color || '#000'
    }
  }
})`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 10px;
    border: 1px solid ${colorRed};
    margin: 10px;
    background-color: ${props => props.style.backgroundColor};
    color: ${props => props.style.color};
  }
`

