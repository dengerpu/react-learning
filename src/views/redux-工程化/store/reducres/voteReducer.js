import { VOTE_SUP, VOTE_OPP } from '../action-types';
import _ from '../../../../utils/index';

let initialState = {
  supNum: 10,
  oppNum: 5
};
export default function voteReducer(state = initialState, action) {
  state = _.clone(true, state);
  let { type, payload = 1 } = action;
  switch (type) {
      case VOTE_SUP:
          state.supNum += payload;
          break;
      case VOTE_OPP:
          state.oppNum += payload;
          break;
      default:
  }
  return state;
};