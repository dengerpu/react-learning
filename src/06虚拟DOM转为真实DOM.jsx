import { createElement, render } from './jsxHandle'

let styleObj = {
  color: 'red',
  fontSize: '18px'
}
let virtualDom =   createElement(
  "div",
  {className: "container"},
  createElement(
    "h2",
    { className: "abc", style: styleObj },
    "标题"
  ),
  createElement(
    "div" ,
    { className: "aaa" },
    createElement("span", null, 'a'),
    createElement("span", null, 'b')
  )
)
console.log(virtualDom)
render(virtualDom, document.getElementById("root"));
