import * as ActionTypes from '../actions/types';

const initialState = {
  orders: [],
  info: {}
};

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_ORDERS_SUCSSES:
      return {
        ...state,
        orders: action.payload
      };

    case ActionTypes.GET_ALL_ORDERS_FAILER:
      return {
        ...state
      };
    case ActionTypes.ADD_ORDERS_SUCSSES:
      return {
        ...state
      };
    case ActionTypes.ADD_ORDERS_FAILER:
      return {
        ...state
      };
    case ActionTypes.GET_ALL_INFO_FOR_ORDERS_SUCSSES:
      return {
        ...state,
        info: action.payload
      };
    case ActionTypes.GET_ALL_INFO_FOR_ORDERS_FAILER:
      return {
        ...state
      };
    case ActionTypes.DELETE_ORDER_SUCSSES:
      return {
        ...state,
        orders: action.payload
      };

    case ActionTypes.DELETE_ORDER_FAILER:
      return {
        ...state
      };
    default:
      return state;
  }
}
