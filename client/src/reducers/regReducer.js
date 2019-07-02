import {REGISTER_USER,REGISTER_SUCCESS} from '../actions/types';

const initialState = {
  isRegister: null,
  isAuthenticated: null,
  isLoading: false,
  user: null,
  payload:null
};

export default function(state = initialState, action) {
    switch (action.type) {
      case REGISTER_USER:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload
        };
      case REGISTER_SUCCESS:
          //localStorage.setItem('token', action.payload.token); jwt
          return {
            ...state,
            ...action.payload,
            isRegister: true,
            isLoading: false,
            payload:action.payload
        };  
      
      default:
        return state;
    }
  }