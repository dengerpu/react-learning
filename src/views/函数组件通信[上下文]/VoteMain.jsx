import React, { useContext, useMemo } from "react";
import ThemeContext from "../../ThemeContext";

const VoteMain = function VoteMain() {
    // 获取上下文中的信息
    let {supNum, oppNum} = useContext(ThemeContext);
    let ratio = useMemo(() => {
        let total = supNum + oppNum;
        return total > 0 ? (supNum / total * 100).toFixed(2) + '%' : '--';
    }, [supNum, oppNum]);
    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
        <p>支持比率：{ratio}</p>
    </div>;
};
export default VoteMain;