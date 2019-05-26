import axios from 'axios';
import * as actionType from './types';

// Get all orders

export const allOrders = data => dispatch => {
  axios
    .get('/order/allOrders', data)
    .then(res =>
      dispatch({
        type: actionType.GET_ALL_ORDERS_SUCSSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.GET_ALL_ORDERS_FAILER
      })
    );
};

export const addOrder = data => dispatch => {
  console.log(data);
  axios
    .post('/order/addOrder', data)
    .then(res =>
      dispatch({
        type: actionType.ADD_ORDERS_SUCSSES
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.ADD_ORDERS_FAILER
      })
    );
};

export const allForOrder = data => dispatch => {
  return axios
    .get('/order/addOrder', data)
    .then(res => {
      console.log('infffff', res.data);
      return dispatch({
        type: actionType.GET_ALL_INFO_FOR_ORDERS_SUCSSES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionType.GET_ALL_INFO_FOR_ORDERS_FAILER
      })
    );
};

export const deleteOrder = data => dispatch => {
  axios
    .delete(`/order/allOrders/${data}`, data)
    .then(res =>
      dispatch({
        type: actionType.DELETE_ORDER_SUCSSES,
        payload: res.data
      })
    )
    .catch(
      dispatch({
        type: actionType.DELETE_ORDER_FAILER
      })
    );
};
