import { combineReducers } from 'redux';
import taskReducer from './teskReducer';

// 合并reducer
const reducer = combineReducers({
  // 添加reducer
  task: taskReducer
})
export default reducer;