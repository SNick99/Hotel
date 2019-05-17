import { GET_ALL_EMPLOYEES, DELETE_EMPLOYEE } from '../actions/types';

const initialState = {
  employees: []
};

export default function employeesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: action.payload
      };
    default:
      return state;
  }
}
