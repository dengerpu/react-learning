import { combineReducers } from 'redux';
import voteReducer from './voteReducer';

const reducer = combineReducers({
    vote: voteReducer,
    // other reducers
})

export default reducer;