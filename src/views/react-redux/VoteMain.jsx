import React from "react";
import { connect } from "react-redux";

const VoteMain = function(props) {
    let { supNum, oppNum } = props;

    return <div className="main">
        <p>支持人数：{supNum}人</p>
        <p>反对人数：{oppNum}人</p>
    </div>;
}
export default connect(
  state => {
    return {
      supNum: state.vote.supNum,
      oppNum: state.vote.oppNum
    }
  }
)(VoteMain);