import { SET_CURRENT_EMPLOYEE } from "../actions/types";
import isEmpty from "../../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  employee: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_EMPLOYEE:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        employee: action.payload,
      };
    default:
      return state;
  }
}
