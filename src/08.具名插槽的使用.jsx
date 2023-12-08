import React from 'react';
import ReactDOM from 'react-dom/client';
import FunComponent from './views/FunctionComponent'
import SlotComponent from './views/SlotComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <>
    <FunComponent title="我是标题" children={[100,200]} x={10} y="10" z={122} data={[100,200]} className="box" style={{ fontSize: '20px'}}>
      <span style={{color: "red"}}>1111</span>
    </FunComponent>
    <FunComponent>
      <span style={{color: "red"}}>1111</span>
      <span style={{color: "red"}}>2222</span>
    </FunComponent>
    {/* 具名插槽使用 */}
    <SlotComponent>
      <h2 slot="header">我是标题</h2>
      <p slot="footer">我是页脚</p>
      <div slot='content'>
        <div style={{width: 300, height: 300, border: '1px solid red'}}>
          我是内容区域
        </div>
      </div>
    </SlotComponent>
  </>
);


