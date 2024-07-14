import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const RouterView = function RouterView(props) {
    let { routes } = props;
    return <Switch>
        {
            routes.map((route, index) => {
                let { redirect, from, to, exact, path, name, component: Component, meta } = route, props = {};
                if (redirect) {
                    props = {to};
                    if(from) props.from = from;
                    if(exact) props.exact = true;
                    return <Redirect key={index} {...props}></Redirect>
                } 
                props = {path};
                if(exact) props.exact = true;
                return <Route key={index} {...props} render={() => {
                    // 做一些特殊的处理，例如：登录态校验，导航守卫等
                    return <Component></Component>
                }}></Route>
            })
        }
    </Switch>
}

export default RouterView;