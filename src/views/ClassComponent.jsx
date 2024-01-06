/* 
创建类组件
  创建一个构造函数(类)
    + 要求必须继承React.Component/PureComponent这个类
    + 我们习惯于使用ES6中的class创建类「因为方便」
    + 必须给当前类设置一个render的方法「放在其原型上」：在render方法中，返回需要渲染的视图

  从调用类组件「new Vote({...})」开始，类组件内部发生的事情：
    1. 初始化属性 && 规则校验
      先规则校验，校验完毕后，再处理属性的其他操作！！
      方案一： 
      constructor(props) {
        super(props); //会把传递进来的属性挂载到this实例上
        console.log(this.props); //获取到传递的属性
      }
      方案二：即便我们自己不再constructor中处理「或者constructor都没写」，在constructor处理完毕后，React内部也会把传递的props挂载到实例上；所以在其他的函数中，只要保证this是实例，就可以基于this.props获取传递的属性！
        + 同样this.props获取的属性对象也是被冻结的{只读的}  Object.isFrozen(this.props)->true

    2. 初始化状态
      状态：后期修改状态，可以触发视图的更新
      需要手动初始化，如果我们没有去做相关的处理，则默认会往实例上挂载一个state，初始值是null => this.state=null
      手动处理：
      state = {
        ...
      };
      ---------修改状态，控制视图更新
      this.state.xxx=xxx ：这种操作仅仅是修改了状态值，但是无法让视图更新
      想让视图更新，我们需要基于React.Component.prototype提供的方法操作：
        @1 this.setState(partialState) 既可以修改状态，也可以让视图更新 「推荐」
          + partialState:部分状态
          this.setState({
            xxx:xxx
          });
        @2 this.forceUpdate() 强制更新

    3. 触发 componentWillMount 周期函数(钩子函数)：组件第一次渲染之前
      钩子函数：在程序运行到某个阶段，我们可以基于提供一个处理函数，让开发者在这个阶段做一些自定义的事情
      + 此周期函数，目前是不安全的「虽然可以用，但是未来可能要被移除了，所以不建议使用」
        + 控制会抛出黄色警告「为了不抛出警告，我们可以暂时用 UNSAFE_componentWillMount」
      + 如果开启了React.StrictMode「React的严格模式」，则我们使用 UNSAFE_componentWillMount 这样的周期函数，控制台会直接抛出红色警告错误！！
        React.StrictMode VS "use strict"
        + "use strict"：JS的严格模式
        + React.StrictMode：React的严格模式，它会去检查React中一些不规范的语法、或者是一些不建议使用的API等！！

    4. 触发 render 周期函数：渲染
    5. 触发 componentDidMount 周期函数：第一次渲染完毕
      + 已经把virtualDOM变为真实DOM了「所以我们可以获取真实DOM了」
      + ...
  组件更新的逻辑「第一种：组件内部的状态被修改，组件会更新」
    1. 触发 shouldComponentUpdate 周期函数：是否允许更新
       shouldComponentUpdate(nextProps, nextState) {
         // nextState:存储要修改的最新状态
         // this.state:存储的还是修改前的状态「此时状态还没有改变」
         console.log(this.state, nextState);

         // 此周期函数需要返回true/false
         //   返回true：允许更新，会继续执行下一个操作
         //   返回false：不允许更新，接下来啥都不处理
         return true;
       }
    2. 触发 componentWillUpdate 周期函数：更新之前
      + 此周期函数也是不安全的
      + 在这个阶段，状态/属性还没有被修改
    3. 修改状态值/属性值「让this.state.xxx改为最新的值」
    4. 触发 render 周期函数：组件更新
      + 按照最新的状态/属性，把返回的JSX编译为virtualDOM
      + 和上一次渲染出来的virtualDOM进行对比「DOM-DIFF」
      + 把差异的部分进行渲染「渲染为真实的DOM」
    5. 触发 componentDidUpdate 周期函数：组件更新完毕
    特殊说明：如果我们是基于 this.forceUpdate() 强制更新视图，会跳过 shouldComponentUpdate 周期函数的校验，直接从 WillUpdate 开始进行更新「也就是：视图一定会触发更新」！

  组件更新的逻辑「第二种：父组件更新，触发的子组件更新」
    1. 触发 componentWillReceiveProps 周期函数：接收最新属性之前
      + 周期函数是不安全的
      UNSAFE_componentWillReceiveProps(nextProps) {
        // this.props:存储之前的属性
        // nextProps:传递进来的最新属性值
        console.log('componentWillReceiveProps:', this.props, nextProps);
      }
    2. 触发 shouldComponentUpdate 周期函数
    ......

  组件卸载的逻辑
    1. 触发 componentWillUnmount 周期函数：组件销毁之前
    2. 销毁

      父子组件嵌套，处理机制上遵循深度优先原则：父组件在操作中，遇到子组件，一定是把子组件处理完，父组件才能继续处理
    + 父组件第一次渲染
      父 willMount -> 父 render「子 willMount -> 子 render -> 子didMount」 -> 父didMount 
    + 父组件更新：
      父 shouldUpdate -> 父willUpdate -> 父 render 「子willReceiveProps -> 子 shouldUpdate -> 子willUpdate -> 子 render -> 子 didUpdate」-> 父 didUpdate
    + 父组件销毁：
      父 willUnmount -> 处理中「子willUnmount -> 子销毁」-> 父销毁
      */
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    // this.props:存储之前的属性
    // nextProps:传递进来的最新属性值
    console.log("componentWillReceiveProps:", this.props, nextProps)
  }

  shouldComponentUpdate(nextProps, nextState) {
    // nextState:存储要修改的最新状态
    // this.state:存储的还是修改前的状态「此时状态还没有改变」
    console.log("shouldComponentUpdate:", this.state, nextState);

    // 此周期函数需要返回true/false
    //   返回true：允许更新，会继续执行下一个操作
    //   返回false：不允许更新，接下来啥都不处理
    return true;
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    // 此时还没有更改
    console.log('componentWillUpdate:', this.state, nextState);
  }

  componentDidUpdate() {
    // 此时数据已经修改
    console.log('componentDidUpdate: 组件更新完毕')
  }
  componentWillUnmount() {
    // 组件销毁前周期函数
    console.log("componentWillUnmount: 组件销毁前周期函数")
  }
}

export default ClassComponent