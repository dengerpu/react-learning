import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/类组件通信[上下文]/Vote';

const root = ReactDOM.createRoot(document.getElementById('root'));

setTimeout(function() {
  root.render(
    <>
      <Demo></Demo>
    </>
  );
}, 5000)

