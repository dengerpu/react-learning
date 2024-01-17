import React, { useEffect, useMemo, useState } from "react";

export default function Demo() {
  let [supNum, setSupNum] = useState(0);
  let [oppNum, setOppNum] = useState(0);
  let [x, setX] = useState(0);
  

  // // 计算支持比率
  // let total = supNum + oppNum, ratio = '--';
  // if(total > 0) {
  //   console.log('当x++的时候，我也会执行')
  //   ratio = (supNum / (total)).toFixed(2);
  // }

  let ratio = useMemo(() => {
    let ratio = '--';
    let total = supNum + oppNum;
    if(total > 0) {
      ratio = (supNum / (total)).toFixed(2);
    }
    console.log('我只有在supNum和oppNum改变的时候，才会触发')
    return ratio;
  }, [supNum, oppNum])

  // let ratio = '--';
  // let [ratio, setRatio] = useState('--');
  // useEffect(() => {
  //   let total = supNum + oppNum;
  //   if(total > 0) {
  //     ratio = (supNum / (total)).toFixed(2);
  //   }
  //   setRatio(ratio) // 需要添加这个才会重新渲染
  //   console.log('支持率将重新计算，但是ratio是不会重新渲染的')
  // }, [supNum, oppNum])

  
  
  return <>
    <div className="main">
      <p>支持人数：{supNum}人</p>
      <p>反对人数：{oppNum}人</p>
      <p>支持比率：{ratio}</p>
      <p>x: {x}</p>
    </div>
    <div className="footer">
      <button onClick={() => {
        setSupNum(supNum + 1);
      }}>支持</button>
      <button onClick={() => {
        setOppNum(oppNum + 1);
      }}>反对</button>
      <button onClick={() => {
        setX(x + 1);
      }}>x++</button>
    </div>
  </>
}