import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';

import employeesReducer from './reducers/employeesReducer';

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer
});
