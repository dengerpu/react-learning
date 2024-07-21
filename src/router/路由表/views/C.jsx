import React from "react";
import { useLocation, useRouteMatch, useParams } from "react-router-dom";
import qs from "qs";

const C = function C() {

    const location = useLocation();
    console.log(location.search); //"?id=100&name=zhangsan"
    // 获取传递的问号参数信息
    let { id, name } = qs.parse(location.search.substring(1));
    console.log(id, name);
    // 也可以基于URLSearchParams来处理
    let usp = new URLSearchParams(location.search);
    console.log(usp.get('id'), usp);

    //  path: '/c/:id?/:name?',
    const match = useRouteMatch();
    console.log(match.params); //=>{id:100,name:'张三'}
    let params = useParams();
    console.log(params); //=>{id:100,name:'zhufeng'} */

    // 获取隐式参数
    const location2 = useLocation();
    console.log('隐式参数', location2.state);

    return <div className="box">
        C组件的内容
    </div>;
};
export default C;