import React from "react";
import { Link, Route, Redirect, Switch, NavLink } from 'react-router-dom'
import A1 from './a/A1';
import A2 from './a/A2';
import A3 from './a/A3';

// 处理样式
import styled from "styled-components";
const DemoBox = styled.div`
    display: flex;
    .menu{
        a{
          display:block;
        }
    }
`;

const A = function A() {
    return <DemoBox>
        {/* 这里不需要写HashRouter，因为父组件已经写过了 */}
        <div className="menu">
            <NavLink to="/a/a1">A1</NavLink>
            <NavLink to="/a/a2">A2</NavLink>
            <NavLink to="/a/a3">A3</NavLink>
        </div>
        <div className="content">
            {/* 二级嵌套路由 */}
            <Switch>
                <Redirect from="/a" to="/a/a1" exact/>
                <Route path="/a/a1" component={A1}/>
                <Route path="/a/a2" component={A2}/>
                <Route path="/a/a3" component={A3}/>
            </Switch>
        </div>
    </DemoBox>
};
export default A;