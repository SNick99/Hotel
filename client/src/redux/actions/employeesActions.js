import axios from 'axios';
import * as actionType from './types';

// Get all employees

export const allEmployees = data => dispatch => {
  axios
    .get('/employee/allEmployees', data)
    .then(res =>
      dispatch({
        type: actionType.GET_ALL_EMPLOYEES,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// delete employee
export const deleteEmployee = data => dispatch => {
  axios
    .delete(`/employee/allEmployees/${data}`, data)
    .then(res =>
      dispatch({
        type: actionType.DELETE_EMPLOYEE,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
