import * as actionType from '../actions/types';

const initialState = {
  cages: []
};

export default function cageReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_CAGES_SUCSSES:
      return {
        ...state,
        cages: action.payload
      };
    case actionType.GET_ALL_CAGES_FAILER:
      return {
        ...state
      };
    case actionType.DELETE_CAGE:
      return {
        ...state,
        cages: action.payload
      };
    default:
      return state;
  }
}
