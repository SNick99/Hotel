import * as actionsTypes from '../actions/types';

const initialState = {
  employees: []
};

export default function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    case actionsTypes.DELETE_EMPLOYEE:
      return {
        ...state,
        employees: action.payload
      };
    case actionsTypes.UPDATE_EMPLOYEE_SUCSSES:
      return {
        ...state,
        employees: action.payload
      };
    case actionsTypes.UPDATE_EMPLOYEE_FAILER:
      return {
        ...state
      };
    default:
      return state;
  }
}
