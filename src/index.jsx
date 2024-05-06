import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/react-redux/index'
import './装饰器/decorator1.js'
import './装饰器/decorator2.js'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Demo></Demo>
  </>
);

