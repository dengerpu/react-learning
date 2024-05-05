import * as TYPES from '../actions-types.js';
import { getTaskList } from '../../api/index.js';
// 添加任务
const taskAction = {
  // 异步派发： 从服务器获取全局任务，同步到redux容器中
  // 使用的是redux-promise中间件
  async queryAllList(selectIndex, current, pageSize) {
    let list = [];
    let total = 0;
    try {
      let result = await getTaskList(selectIndex, current, pageSize);
      console.log('taskAction发送请求返回的数据', result);
      if(+result.code === 0) {
        list = result.list;
        total = result.total;
      }
    }catch(_) {
      console.log(_);
    }
    return {
      type: TYPES.TASK_LIST,
      list,
      total
    }
  },
  // 同步派发任务
  deleteTaskById(id) {
    return {
      type: TYPES.TASK_REMOVE,
      id
    }
  },
  // 同步派发：修改任务
  updateTaskById(id) {
    return {
      type: TYPES.TASK_UPDATE,
      id
    }
  }
}
export default taskAction;