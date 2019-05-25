import * as actionType from '../actions/types';

const initialState = {
  schedules: [],
  employees: [],
  error: {}
};

export default function schedulesReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_SCHEDULES_SUCSSES:
      return {
        ...state,
        schedules: action.payload
      };
    case actionType.GET_ALL_SCHEDULES_FAILER:
      return {
        ...state
      };
    case actionType.GET_ALL_EMPLOYEE_SCHEDULES_SUCSSES:
      return {
        ...state,
        employees: action.payload
      };
    case actionType.GET_ALL_EMPLOYEE_SCHEDULES_FAILER:
      return {
        ...state
      };
    case actionType.ADD_SCHEDULE_SUCSSES:
      return {
        ...state
      };
    case actionType.ADD_SCHEDULE_FAILER:
      return {
        ...state,
        error: action.payload
      };
    case actionType.UPDATE_SCHEDULE_SUCSSES:
      return {
        ...state,
        schedules: action.payload
      };
    case actionType.UPDATE_SCHEDULE_FAILER:
      return {
        ...state,
        error: action.payload
      };
    case actionType.DELETE_SCHEDULE_SUCSSES:
      return {
        ...state,
        schedules: action.payload
      };
    case actionType.DELETE_SCHEDULE_FAILER:
      return {
        ...state
      };
    default:
      return state;
  }
}
