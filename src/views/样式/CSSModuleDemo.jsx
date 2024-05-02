import React from 'react';
import sty from './css/demo.module.scss';
const Demo = function Demo() {
    return <div className='personal'>
        <h1 className={sty.title}>111</h1>
        <h2 className={sty.subTitle}>222</h2>
        <span>文字</span>
    </div>;
};
export default Demo;