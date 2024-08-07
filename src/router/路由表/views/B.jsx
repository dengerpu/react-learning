import React from "react";
import { useHistory } from "react-router-dom";

const B = function B() {
  const history = useHistory();
  // 传参方案一：问号传参
  // 传递的信息出现在URL地址上：丑、不安全、长度限制
  // 信息是显式的，即便在目标路由内刷新，传递的信息也在
  // const onClick = () => {
  //     history.push('/c?id=100&name=zhangsan');
  // }

  // 传参方案二：路径参数「把需要传递的值，作为路由路径中的一部分」
  // + 传递的信息也在URL地址中：比问号传参看起来漂亮一些、但是也存在安全和长度的限制
  // + 因为信息都在地址中，即便在目标组件刷新，传递的信息也在
  // const onClick = () => {
  //     history.push(`/c/100/zhufeng`);
  // }

  //  方案三：隐式传参
  //    + 传递的信息不会出现在URL地址中：安全、美观，也没有限制
  //    + 在目标组件内刷新，传递的信息就丢失了
  const onClick = () => {
    history.push({
      pathname: "/c",
      state: {
        id: 100,
        name: "zhangsan",
      },
    });
  };

  return (
    <div className="box">
      B组件-路由传递参数
      <button onClick={onClick}>点击跳转</button>
    </div>
  );
};
export default B;
