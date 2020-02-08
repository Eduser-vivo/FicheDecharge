import { combineReducers, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import {reducer as formReducer} from 'redux-form'
import { scanReducer } from "./redux/reducer/scanReducer";


const rootReducer = combineReducers({
   form : formReducer,
   scanReq: scanReducer,  
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;