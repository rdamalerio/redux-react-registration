import {
  REGISTER_USER,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,  
  USER_LOADED,
  USER_LOADING,} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isRegister: false,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  payload:null
};

export default function(state = initialState, action) {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case REGISTER_USER:
        return {
          ...state,
          isAuthenticated: true,     
          user: action.payload,
          isLoading: false
        };
      case LOGIN_SUCCESS:
          localStorage.setItem('token', action.payload.token);
          return {
            ...state,
            ...action.payload,
            isAuthenticated: true,
            isLoading: false,
            isRegister: false
          };    
      case REGISTER_SUCCESS:
          localStorage.setItem('token', action.payload.token);
          return {
            ...state,
            ...action.payload,
            isAuthenticated: false,
            isLoading: false,
            isRegister: true
        };  
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
          localStorage.removeItem('token');
          return {
            ...state,
            token: null,
            user: null,
            isAuthenticated: false,
            isLoading: false,
            isRegister:false
        };      
      default:
        return state;
    }
  }