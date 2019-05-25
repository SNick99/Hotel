import { combineReducers } from 'redux';

import authReducer from './reducers/authReducer';

import employeesReducer from './reducers/employeesReducer';

import cageReducer from './reducers/cageReducer';

import clientsReducer from './reducers/clientsReducer';

import productsReducer from './reducers/productsReducer';

import schedulesReducer from './reducers/schedulesReducer';

export default combineReducers({
  auth: authReducer,
  employees: employeesReducer,
  cages: cageReducer,
  clients: clientsReducer,
  products: productsReducer,
  schedules: schedulesReducer
});
