import { createStore } from 'redux';
import reducer from './reducres';

// 创建容器
const store = createStore(reducer);
export default store;