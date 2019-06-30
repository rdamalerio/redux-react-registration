import { combineReducers } from 'redux';
//import authReducer from './authReducer';
import regReducer from './regReducer';
//import errorReducer from './errorReducer';

export default combineReducers({
    //auth: authReducer,
    //error: errorReducer,
    reg: regReducer,
})