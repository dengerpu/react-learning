import React, { useContext } from "react";
import { Button } from 'antd';
import ThemeContext from "../../ThemeContext";

const VoteFooter = function VoteFooter() {
    let { store } = useContext(ThemeContext);
    const support = function() {
      store.dispatch({
        type: 'SUPPORT',
        payload: 1
      })
    }
    const oppose = function() {
      store.dispatch({
        type: 'OPPOSE',
        payload: 1
      })
    }
    return <div className="footer">
        <Button type="primary" onClick={support}>支持</Button>
        <Button type="primary" danger onClick={oppose}>反对</Button>
    </div >;
};

export default VoteFooter;