import { VOTE_SUP, VOTE_OPP } from '../action-types';

// 延迟函数：返回promise实例，在指定的时间后，才会让实例为成功
const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};
const voteAction = {
    // redux-thunk中间件的语法
    support(payload) {
        return async dispatch => {
            await delay();
            dispatch({
                type: VOTE_SUP,
                payload
            });
        }
    },
    // redux-promise中间件
    async oppose() {
        await delay();
        return {
            type: VOTE_OPP
        };
    }
};
export default voteAction;