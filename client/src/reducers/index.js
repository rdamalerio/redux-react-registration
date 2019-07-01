import { combineReducers } from 'redux';
import regReducer from './regReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    error: errorReducer,
    reg: regReducer,
})