import * as actionType from '../actions/types';
import axios from 'axios';

export const addClient = data => dispatch => {
  axios
    .post('/client/addClient', data)
    .then(res => console.log('Add client' + res.data))
    .catch(err => console.log(err));
};

export const allClients = data => dispatch => {
  axios
    .get('/client/allClients', data)
    .then(res =>
      dispatch({
        type: actionType.GET_ALL_CLIENTS,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const deleteClient = data => dispatch => {
  axios
    .delete(`/client/allClients/${data}`, data)
    .then(res =>
      dispatch({
        type: actionType.DELETE_CLIENT,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};
