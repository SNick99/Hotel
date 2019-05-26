import axios from 'axios';
import * as actionType from './types';

// Get all employees

export const allProducts = data => dispatch => {
  axios
    .get('/product/allProducts', data)
    .then(res => {
      return dispatch({
        type: actionType.GET_ALL_PRODUCTS_SUCSSES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionType.GET_ALL_PRODUCTS_FAILER
      })
    );
};

export const addProduct = data => dispatch => {
  console.log(data);
  axios
    .post('/product/addProduct', data)
    .then(res =>
      dispatch({
        type: actionType.ADD_PRODUCT_SUCSSES
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.ADD_PRODUCT_FAILER
      })
    );
};

export const deleteProduct = data => dispatch => {
  axios
    .delete(`/product/allProducts/${data}`, data)
    .then(res =>
      dispatch({
        type: actionType.DELETE_PRODUCTS_SUCSSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.DELETE_PRODUCTS_FAILER
      })
    );
};

export const updateProduct = data => dispatch => {
  console.log(data);
  axios
    .put(`/product/allProducts/${data.id}`, data)
    .then(res =>
      dispatch({
        type: actionType.UPDATE_PRODUCT_SUCSSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.UPDATE_PRODUCT_FAILER
      })
    );
};
