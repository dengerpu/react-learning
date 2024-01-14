import React, { useState } from "react";

export default function Demo() {
  let [num, setNum] = useState(0);
  const handler = () => {
    setNum(num + 1);
  }
  return <>
    <h1>num: {num}</h1>
    <button onClick={handler}>增加</button>
  </>
}