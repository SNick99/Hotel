import * as actionType from '../actions/types';

const initialState = {
  products: []
};

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.GET_ALL_PRODUCTS_SUCSSES:
      return {
        ...state,
        products: action.payload
      };
    case actionType.GET_ALL_PRODUCTS_FAILER:
      return {
        ...state
      };
    case actionType.ADD_PRODUCT_SUCSSES:
      return {
        ...state
      };
    case actionType.ADD_PRODUCT_FAILER:
      return {
        ...state
      };
    default:
      return state;
  }
}
