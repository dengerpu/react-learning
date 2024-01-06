import React from 'react';
import ReactDOM from 'react-dom/client';
import ClassComponent from './views/ClassComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <ClassComponent title={'标题'}></ClassComponent>
  </>
);

setTimeout(function() {
  root.render(
    <>
      <ClassComponent title={'更换后的标题'}></ClassComponent>
    </>
  );
}, 5000)

