import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from './types';

// Register User
export const register = ({ fname,lname,phone,country,bday,email,pass,question,ans }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ fname,lname,phone,country,bday,email,pass,question,ans });
  
  axios
  .post('/api/users', body, config)
  .then(res =>
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })   
  )
  .catch(err => {
    dispatch(
      returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
    );
    dispatch({
      type: REGISTER_FAIL
    });
  });
 

  
};

// Login User
export const login = ({ email, password }) => dispatch => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post('/api/auth', body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};


