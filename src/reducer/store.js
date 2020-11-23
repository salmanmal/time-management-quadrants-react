import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import Reducers from "./combineReducers";

// Applying middleware
let middlewares = [thunk];

if (process.env.NODE_ENV !== "production") {
  middlewares = [...middlewares, logger];
}

const store = createStore(Reducers, applyMiddleware(...middlewares));

export default store;
