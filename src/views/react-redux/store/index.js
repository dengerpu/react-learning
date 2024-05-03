import { createStore, applyMiddleware } from 'redux';
import reducer from './reducres';
import reduxLogger  from 'redux-logger'
import {thunk as reduxThunk}  from 'redux-thunk';
import reduxPromise from 'redux-promise'

// 创建容器
const store = createStore(reducer, applyMiddleware(reduxLogger, reduxThunk, reduxPromise));
export default store;