import A from './views/A';
import B from './views/B';
import C from './views/C';

/* 
一级路由 
  重定向选项
    + redirect:true
    + from:从哪来
    + to:定向的地址
    + exact:精准匹配
  正常选项
    + path:匹配路径
    + name:路由名称
    + component:需要渲染的组件
    + meta:路由元信息
    + exact:精准匹配
*/
const routes = [{
    redirect: true,
    from: '/',
    to: '/a',
    exact: true
}, {
    path: '/a',
    name: 'a',
    component: A,
    meta: {}
}, {
    path: '/b',
    name: 'b',
    component: B,
    meta: {}
}, {
    path: '/c',
    name: 'c',
    component: C,
    meta: {}
}, {
    redirect: true,
    to: '/a'
}];
export default routes;