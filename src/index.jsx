import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './views/UseCallback.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

setTimeout(function() {
  root.render(
    <>
      <Demo></Demo>
    </>
  );
}, 5000)

