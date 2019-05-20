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
    default:
      return state;
  }
}
