import uuid from 'uuid';
import {REGISTER_USER,REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/types';

const initialState = {
    user:[{lname:"",phone:'',country:'',bday:'',email:'',pass:'',question:'',ans:''}]
}

export default function(state = initialState, action) {
    switch (action.type) {
      case REGISTER_USER:
        return {
          ...state,
          isLoading: true
        };
      case REGISTER_SUCCESS:
          return {
            ...state,
            ...action.payload,
            isRegister: true,
            error:false
        };  
      
      default:
        return state;
    }
  }