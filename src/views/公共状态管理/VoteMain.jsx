import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../../ThemeContext";

// class VoteMain extends React.Component {
//     render() {
//         let { supNum, oppNum } = this.props;
//         return <div className="main">
//             <p>支持人数：{supNum}人</p>
//             <p>反对人数：{oppNum}人</p>
//         </div>;
//     }
// }

const VoteMain = function() {
    const { store } = useContext(ThemeContext);
    let { supNum, oppNum } = store.getState();

    // 控制视图更新的办法加入到redux事件池中
    let [_, setRandom] = useState(0);
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setRandom(Math.random());
      })
    })
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
    </div>;
}
export default VoteMain;