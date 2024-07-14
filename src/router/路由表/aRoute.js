/* A组件的二级路由 */
import A1 from './views/a/A1';
import A2 from './views/a/A2';
import A3 from './views/a/A3';

const aRoutes = [{
    redirect: true,
    from: '/a',
    to: '/a/a1',
    exact: true
}, {
    path: '/a/a1',
    name: 'a-a1',
    component: A1,
    meta: {}
}, {
    path: '/a/a2',
    name: 'a-a2',
    component: A2,
    meta: {}
}, {
    path: '/a/a3',
    name: 'a-a3',
    component: A3,
    meta: {}
}];
export default aRoutes;