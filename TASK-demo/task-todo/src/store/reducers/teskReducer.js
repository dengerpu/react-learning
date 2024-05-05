import * as TYPES from '../actions-types.js';
import _ from '../../assets/utils/util.js';
const initialState = {
  // 任务列表
  taskList: [],
  total: 0
}
export default function taskReducer(state = initialState, action){
  state = _.clone(true, state);
  let { taskList } = state;
  switch(action.type) {
    // 获取所有的任务
    case TYPES.TASK_LIST:
      state.taskList = action.list;
      state.total = action.total;
      break;
    // 删除任务
    case TYPES.TASK_REMOVE:
      if(Array.isArray(taskList)){
        state.taskList = taskList.filter(item => +item.id !== +action.id);
      }
      break;
    // 更新任务
    case TYPES.TASK_UPDATE:
      if(Array.isArray(taskList)){
        state.taskList = taskList.map(item => {
          if(+item.id === +action.id){
            item.state = 2;
            item.complete = new Date().toLocaleString('zh-CN', { hour12: false });
          }
          return item;
        })
      }
      break;
    default:
  }
  return state;
}