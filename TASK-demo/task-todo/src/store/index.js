import { applyMiddleware, createStore } from "redux";
import reducer from "./reducers";
import reduxLogger from "redux-logger";
import { thunk as reduxThunk } from 'redux-thunk';
import reduxPromise from "redux-promise";

const store = createStore(
  reducer,
  applyMiddleware(reduxLogger, reduxThunk, reduxPromise)
)
export default store;