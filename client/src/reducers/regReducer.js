import uuid from 'uuid';
import {REGISTER_USER,REGISTER_SUCCESS,REGISTER_FAIL} from '../actions/types';

const initialState = {
    user:[{id:uuid(),lname:"fdsafdsa",phone:'dsafdsa',country:'dsafdsa',bday:'fdsafdsa',email:'abc',pass:'abc',question:'jdlsjalf',ans:'ldsjalf'}]
}

export default function(state = initialState, action) {
    switch (action.type) {
      case REGISTER_USER:
        return {
          ...state,
          isLoading: true
        };
      
      default:
        return state;
    }
  }