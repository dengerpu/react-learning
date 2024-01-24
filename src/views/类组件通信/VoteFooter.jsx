import React from "react";
import { Button } from 'antd';

class VoteFooter extends React.Component {
    render() {
        let {change} = this.props;
        return <div className="footer">
            <Button type="primary" onClick={change.bind(null, 'sup')}>支持</Button>
            <Button type="primary" onClick={change.bind(null, 'opp')} danger>反对</Button>
        </div>;
    }
}

export default VoteFooter;