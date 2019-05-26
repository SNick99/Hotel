import * as ActionTypes from '../actions/types';

const initialState = {
  clients: []
};

export default function clientsReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_ALL_CLIENTS:
      return {
        ...state,
        clients: action.payload
      };

    case ActionTypes.DELETE_CLIENT:
      return {
        ...state,
        clients: action.payload
      };
    case ActionTypes.UPDATE_CLIENT_SUCSSES:
      return {
        ...state,
        clients: action.payload
      };
    case ActionTypes.UPDATE_CLIENT_FAILER:
      return {
        ...state
      };
    default:
      return state;
  }
}
