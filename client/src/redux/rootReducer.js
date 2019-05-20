import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';

import employeesReducer from './reducers/employeesReducer';

import cageReducer from './reducers/cageReducer';

import clientsReducer from './reducers/clientsReducer';

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  cages: cageReducer,
  clients: clientsReducer
});
