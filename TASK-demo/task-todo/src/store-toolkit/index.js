import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import taskSliceReducer from './features/taskSlice';


const store = configureStore({
  reducer: {
    // 按模块管理各个切片导出的reducer
    task: taskSliceReducer
  },
  // 使用中间件「如果我们不指定任何中间件，则默认集成了reduxThunk；
  // 但是一但设置，会整体替换默认值，需要手动指定thunk中间件！」
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxLogger),
})

export default store;