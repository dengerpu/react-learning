/* TASK版块的切片，包含：REDUCER & ACTION-CREATOR */
import { createSlice } from '@reduxjs/toolkit';
import { getTaskList } from '../../api/index.js';
const taskSlice = createSlice({
  // 切片的名字
  name: 'task',
  // 切片对应reducer中的初始状态
  initialState: {
    taskList: null,
    total: 0
  },
  // 编写不同业务逻辑下，对公共状态的更改
  reducers: {
    getAllTaskList(state, action) {
      // state:redux中的公共状态信息「基于immer库管理，无需自己再克隆了」
      // action:派发的行为对象，我们无需考虑行为标识的问题了；传递的其他信息，都是以action.payload传递进来的值！！
      state.taskList = action.payload.list;
      state.total = action.payload.total;
    },
    removeTask(state, { payload }) {
      let taskList = state.taskList;
      if (!Array.isArray(taskList)) {
        return;
      }
      // payload:接收传递进来的，要删除那一项的ID
      state.taskList = taskList.filter(item => item.id !== payload);
    },
    updateTask(state, { payload }) {
      let taskList = state.taskList;
      if (!Array.isArray(taskList)) {
        return;
      }
      // payload:接收传递进来的，要删除的那一项的ID
      state.taskList = taskList.map(item => {
        if (+item.id === +payload) {
            item.state = 2;
            item.complete = new Date().toLocaleString('zh-CN');
        }
        return item;
      })
    }
  }
});

// 从切片中获取actionCreator：此处解构的方法和上面reducers中的方法，仅仅是函数名相同；方法执行，返回需要派发的行为对象；后期我们可以基于dispatch进行任务派发即可！！
export let { getAllTaskList, removeTask, updateTask } = taskSlice.actions;
// console.log(getAllTaskList([])); //=>{type: 'task/getAllTaskList', payload: []}
// 加下面是因为这连个函数名与其他函数中的函数名重复了；所以需要修改一下函数名；
export const removeTaskAction = removeTask;
export const updateTaskAction = updateTask;

// 实现异步派发「redux-thunk」
export const getAllTaskListAsync = (selectIndex, current, pageSize) => {
  return async dispatch => {
    let list = [];
    let total = 0;
    try {
      let result = await getTaskList(selectIndex, current, pageSize);
      console.log('taskAction发送请求返回的数据', result);
      if(+result.code === 0) {
        list = result.list;
        total = result.total;
      }
    } catch (_) { }
    dispatch(getAllTaskList({list, total}));
  }
}

// 从切片中获取reducer
export default taskSlice.reducer;