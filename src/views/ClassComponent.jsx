import React from 'react';
import PropTypes from 'prop-types'
class ClassComponent extends React.Component {
  // 属性规则校验
  static defaultProps = {
    num: 0
  };
  static propTypes = {
    title: PropTypes.string.isRequired,
    num: PropTypes.number
  }
  // 初始化状态
  state = {
    supNum: 20,
    oppNum: 10
  };

  render() {
    let {title} = this.props,
    { supNum, oppNum } = this.state;
    console.log("组件渲染")
    return <div className="vote-box">
            <div className="header">
              <h2 className="title">{title}</h2>
              <span>{supNum + oppNum}人</span>
            </div>
            <div className="main">
              <p>支持人数：{supNum}人</p>
              <p>反对人数：{oppNum}人</p>
            </div>
            <div className="footer">
              <button onClick={() => {
                // 修改状态，让视图更新
                this.setState({
                  supNum: supNum + 1
                });
              }}>支持</button>

              <button onClick={() => {
                this.state.oppNum++;
                // 强制让视图更新
                this.forceUpdate();
              }}>反对</button>
            </div>
          </div>;
  }

  UNSAFE_componentWillMount() {
    console.log("组件渲染前")
  }
  componentDidMount() {
    console.log("组件渲染后")
  }
}

export default ClassComponent