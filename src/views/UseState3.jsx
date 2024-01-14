import React, {useState} from 'react'

// export default function Demo() {
//   let [state, setState] = useState({
//       x: 10,
//       y: 20
//   });
//   const handler = () => {
//       // setState({ x: 100 }); //state={x:100} // 这样y会丢失
//       setState({
//           ...state, 
//           x: 100
//       });
//   };
//   return <div>
//       <span>x:{state.x}</span><br/>
//       <span>y:{state.y}</span>
//       <button onClick={handler}>处理</button>
//   </div>;
// }

export default function Demo() {
  let [x, setX] = useState(10);
  let [y, setY] = useState(20); 
  const handler = () => {
    setX(100);
  };
  return <div>
      <span>x:{x}</span><br/>
      <span>y:{y}</span>
      <button onClick={handler}>处理</button>
  </div>;
}