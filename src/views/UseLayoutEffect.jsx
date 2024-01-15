import React, { useState, useEffect, useLayoutEffect } from "react";


const Demo = function Demo() {
    // console.log('RENDER');
    let [num, setNum] = useState(0);

    // useLayoutEffect(() => {
    //     if (num === 0) {
    //         setNum(10);
    //     }
    // }, [num]); 

    useLayoutEffect(() => {
        console.log('useLayoutEffect'); //第一个输出
    }, [num]);
    useEffect(() => {
        console.log('useEffect'); //第二个输出
    }, [num]);

    return <div
        style={{
            backgroundColor: num === 0 ? 'red' : 'green'
        }}>
        <span>{num}</span>
        <button onClick={() => {
                setNum(0);
            }}>
            新增
        </button>
    </div>;
};

export default Demo;