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
