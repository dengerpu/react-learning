import htpp from './http'

// 获取指定状态的任务信息
export const getTaskList = (state = 0, current = 1, pageSize = 2) => {
  return htpp.get('/getTaskList', {
    params: {
      state,
      page: current,
      limit: pageSize
    }
  })
}

// 新增任务
export const addTask = (task, time) => {
  return htpp.post('/addTask', {
    task,
    time
  })
}

// 删除任务
export const removeTask = (id) => {
  return htpp.get('/removeTask', {
    params: {
      id
    }
  })
}

// 完成任务
export const completeTask = (id) => {
  return htpp.get('/completeTask', {
    params: {
      id
    }
  })
}
