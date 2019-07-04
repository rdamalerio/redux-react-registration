import axios from 'axios';
import { returnErrors } from './errorActions';

import {
  USER_LOADED,
  USER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_FAIL,
  AUTH_ERROR,
  UPDATE_SUCCESS,
  UPDATE_FAIL
} from './types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

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
    try{
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    }catch(e){

    }
  });
 

  
};

// Update User
export const update = ({ id,fname,lname,phone,country,bday,email,question,ans }) => dispatch => {

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // Request body
  const body = JSON.stringify({ id,fname,lname,phone,country,bday,email,question,ans });
  
  axios
  .post('/api/update', body, config)
  .then(res =>
    dispatch({
      type: UPDATE_SUCCESS,
      payload: res.data,
      updateStatus: true,
    })
  )
  .catch(err => {
    try{
      dispatch(
        returnErrors(err.response.data, err.response.status, 'UPDATE_FAIL')
      );
      dispatch({
        type: UPDATE_FAIL
      });
    }catch(e){
      console.log(e);
    }
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

// Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

// Setup config/headers and token
export const tokenConfig = getState => {
  // Get token from localstorage
  const token = getState().reg.token;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};
