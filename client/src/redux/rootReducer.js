import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';

import employeesReducer from './reducers/employeesReducer';

import cageReducer from './reducers/cageReducer';

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  cages: cageReducer
});
