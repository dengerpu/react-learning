import { createStore } from 'redux';
import _ from '../../../utils/index'

// REDUCER
let initial = {
  supNum: 0,
  oppNum: 0
}

const reducer = function reducer(state = initial, action) {
  // 防止直接操作原始状态，先对state进行深拷贝
  state = _.clone(state);
  let {type, payload} = action;
  switch (type) {
    case 'SUPPORT':
      state.supNum += payload;
      break;
    case 'OPPOSE':
      state.oppNum += payload;
      break;
    default:
  }
  return state;
}

// 创建容器
const store = createStore(reducer);
export default store;