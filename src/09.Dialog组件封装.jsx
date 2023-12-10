import React from 'react';
import ReactDOM from 'react-dom/client';
import Dialog from './views/Dialog';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <Dialog title="提示框">
      <div style={{display: 'flex', justifyContent: 'center'}}>
        我是里面的内容
      </div>
    </Dialog>
  </>
);


