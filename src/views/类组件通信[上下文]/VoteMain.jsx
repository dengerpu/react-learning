import React from "react";
import ThemeContext from "../../ThemeContext";

class VoteMain extends React.Component {
    render() {
        return <ThemeContext.Consumer>
            {
                context => {
                    let {supNum, oppNum} = context
                    return <div className="main">
                        <p>支持人数：{supNum}人</p>
                        <p>反对人数：{oppNum}人</p>
                        <p>支持比率：--</p>
                    </div>
                }
            }
        </ThemeContext.Consumer>
    }
}

export default VoteMain;