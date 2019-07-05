import { combineReducers } from 'redux';
import regReducer from './regReducer';
import errorReducer from './errorReducer';
import imageReducer from './imageReducer';

export default combineReducers({
    error: errorReducer,
    reg: regReducer,
    img: imageReducer,
})