import { createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import {reducer as Task} from "./containers/Task/reducers/reducers";



const store = createStore(
    combineReducers({Task}),
    {},
    applyMiddleware(logger,thunk)
);

export default store;
