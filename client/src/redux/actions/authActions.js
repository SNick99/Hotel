import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_EMPLOYEE } from './types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register employee action

export const registerEmployee = data => dispatch => {
  axios
    .post('/employee/addEmployee', data)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login -  get employee token jwt

export const loginEmployee = data => dispatch => {
  axios
    .post('/employee/login', data)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem('jwtToken', token);

      // setToken to Auth header
      setAuthToken(token);
      // Decode token
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentEmployee(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentEmployee = decoded => {
  return {
    type: SET_CURRENT_EMPLOYEE,
    payload: decoded
  };
};

// Logout employee

export const logoutEmployee = () => dispatch => {
  // Remove token from localStorege
  localStorage.removeItem('jwtToken');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set cuurent employee to {} which will set isAuthenticated to false
  dispatch(setCurrentEmployee({}));
};
