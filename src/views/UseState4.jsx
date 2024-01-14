import React, { useState } from 'react'
import { flushSync } from 'react-dom'

// export default function Demo() {
//   console.log('RENDER渲染');
//   let [x, setX] = useState(10),
//       [y, setY] = useState(20),
//       [z, setZ] = useState(30);

//   const handle = () => {
//       flushSync(() => {
//           setX(x + 1);
//           setY(y + 1);
//       });
//       setZ(z + 1);
//   };
//   return <div className="demo">
//       <span className="num">x:{x}</span><br/>
//       <span className="num">y:{y}</span><br/>
//       <span className="num">z:{z}</span><br/>
//       <button type="primary"
//           size="small"
//           onClick={handle}>
//           新增
//       </button>
//   </div>;
// }


export default function Demo() {
  console.log('RENDER渲染');
  let [x, setX] = useState(10);


  const handle = () => {
    for(let i = 0; i < 10; i++) {
      setX(prev => {
        // prev:存储上一次的状态值
        console.log(prev);
        return prev + 1; //返回的信息是我们要修改的状态值
      })
    }
  };
  return <div className="demo">
      <span>x: {x}</span>
      <button type="primary"
          size="small"
          onClick={handle}>
          执行
      </button>
  </div>;
}
