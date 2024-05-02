import React, { useContext, useEffect, useState } from "react";
import './Vote.scss';
import VoteMain from './VoteMain';
import VoteFooter from './VoteFooter';
import ThemeContext from "../../ThemeContext";

const Vote = function Vote() {
    const { store } = useContext(ThemeContext);
    let { supNum, oppNum } = store.getState().vote;

    // 控制视图更新的办法加入到redux事件池中
    let [_, setRandom] = useState(0);
    useEffect(() => {
      const unsubscribe = store.subscribe(() => {
        setRandom(Math.random());
      })
    })
    return <div className="vote-box">
        <div className="header">
            <h2 className="title">React是很棒的前端框架</h2>
            <span className="num">{supNum + oppNum}</span>
        </div>
        <VoteMain supNum={supNum} oppNum={oppNum}/>
        <VoteFooter />
    </div>;
};

export default Vote;
