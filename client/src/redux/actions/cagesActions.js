import axios from 'axios';
import * as actionType from './types';

// Get all employees

export const allCages = data => dispatch => {
  axios
    .get('/cage/allCages', data)
    .then(res =>
      dispatch({
        type: actionType.GET_ALL_CAGES_SUCSSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.GET_ALL_CAGES_FAILER
      })
    );
};

export const addCage = data => dispatch => {
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
