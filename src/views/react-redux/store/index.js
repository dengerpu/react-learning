import { createStore, applyMiddleware } from 'redux';
import reducer from './reducres';
import reduxLogger  from 'redux-logger'

// 创建容器
const store = createStore(reducer, applyMiddleware(reduxLogger));
export default store;