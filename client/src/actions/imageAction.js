import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  UPLOAD_SUCCESS,
  UPLOAD_FAIL,
} from './types';


// Update User
export const upload = (file) => dispatch => {

  const data = new FormData();
  data.append('avatar',file,file.name);

  axios
  .post('/api/image', data)
  .then(res =>   
    dispatch({
      type: UPLOAD_SUCCESS,
      payload: res.data,
      updateStatus: true,
    })
  )
  .catch(err => {
    try{
      dispatch(
        returnErrors(err.response.data, err.response.status, 'UPLOAD_FAIL')
      );
      dispatch({
        type: UPLOAD_FAIL
      });
    }catch(e){
      console.log(e);
    }
  });
  
};

