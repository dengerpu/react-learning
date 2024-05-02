import React, { useContext } from "react";
import { Button } from 'antd';
import ThemeContext from "../../ThemeContext";
import actions from "./store/actions";

const VoteFooter = function VoteFooter() {
    let { store } = useContext(ThemeContext);
    const support = function() {
      store.dispatch(actions.vote.support(10))
    }
    const oppose = function() {
      store.dispatch(actions.vote.oppose())
    }
    return <div className="footer">
        <Button type="primary" onClick={support}>支持</Button>
        <Button type="primary" danger onClick={oppose}>反对</Button>
    </div >;
};

export default VoteFooter;