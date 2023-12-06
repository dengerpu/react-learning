import React from 'react';
import ReactDOM from 'react-dom/client';
import { createElement, render } from './jsxHandle'

const root = ReactDOM.createRoot(document.getElementById('root'));
let styleObj = {
  color: 'red',
  fontSize: '18px'
}
// root.render(
//   <>
//     <h2 className='abc' style={styleObj}>标题</h2>
//     <div className='aaa'>
//       <span>a</span>
//       <span>b</span>
//     </div>
//   </>
// );

render(
  <>
    <h2 className='abc' style={styleObj}>标题</h2>
    <div className='aaa'>
      <div className='bbb'>
        <p style={styleObj}>我是div标签下的p标签</p>
      </div>
      <span>a</span>
      <span>b</span>
    </div>
  </>
);
// console.log(
//   React.createElement(
//     React.Fragment,null,
//     React.createElement(
//       "h2",
//       { className: "abc", style: styleObj },
//       "标题"
//     ),
//     React.createElement(
//       "div" ,
//       { className: "aaa" },
//       React.createElement("span", null, 'a'),
//       React.createElement("span", null, 'b')
//     )
//   )
// )

console.log(
  createElement(
    React.Fragment,null,
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
)
