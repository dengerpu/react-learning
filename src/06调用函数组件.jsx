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

console.log(React.createElement(FunComponent, {
  title: "\u6211\u662F\u6807\u9898",
  x: 10,
  y: "10",
  data: [100, 200],
  className: "box",
  style: {
    fontSize: '20px'
  }
}))
