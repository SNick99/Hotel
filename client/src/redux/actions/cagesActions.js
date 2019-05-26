import axios from 'axios';
import * as actionType from './types';

// Get all employees

export const allCages = data => dispatch => {
  axios
    .get('/cage/allCages', data)
    .then(res => {
      return dispatch({
        type: actionType.GET_ALL_CAGES_SUCSSES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionType.GET_ALL_CAGES_FAILER
      })
    );
};

export const addCage = data => dispatch => {
  console.log(data);
  axios
    .post('/cage/addCage', data)
    .then(res => console.log('Add cage' + res.data))
    .catch(err => console.log(err));
};

export const deleteCage = data => dispatch => {
  axios
    .delete(`/cage/allCages/${data}`, data)
    .then(res =>
      dispatch({
        type: actionType.DELETE_CAGE,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const updateCage = data => dispatch => {
  console.log(data);
  axios
    .put(`/cage/allCages/${data.id}`, data)
    .then(res =>
      dispatch({
        type: actionType.UPDATE_CAGE_SUCSSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.UPDATE_CAGE_FAILER,
        payload: err.response.data
      })
    );
};
