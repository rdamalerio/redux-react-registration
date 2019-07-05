import { UPLOAD_SUCCESS, UPLOAD_FAIL } from '../actions/types';

const initialState = {
  msg: {},
  uploadStatus: false,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case UPLOAD_SUCCESS:
      return {
        ...state,
        uploadStatus:true
      };
    case UPLOAD_FAIL:
      return {
        ...state,
        uploadStatus:false
      };
    default:
      return state;
  }
}