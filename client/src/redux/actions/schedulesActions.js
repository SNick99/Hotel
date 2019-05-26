import axios from 'axios';
import * as actionType from './types';

export const allSchedules = data => dispatch => {
  axios
    .get('/schedule/allSchedules', data)
    .then(res => {
      console.log('Action allSchedules', res.data);
      return dispatch({
        type: actionType.GET_ALL_SCHEDULES_SUCSSES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionType.GET_ALL_SCHEDULES_FAILER
      })
    );
};

export const allEmployeeSchedules = data => dispatch => {
  return axios
    .get('/schedule/addSchedule', data)
    .then(res => {
      console.log('Action allSchedules', res.data);
      return dispatch({
        type: actionType.GET_ALL_EMPLOYEE_SCHEDULES_SUCSSES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionType.GET_ALL_EMPLOYEE_SCHEDULES_FAILER
      })
    );
};

export const addSchedule = data => dispatch => {
  console.log(data);
  axios
    .post('/schedule/addSchedule', data)
    .then(res =>
      dispatch({
        type: actionType.ADD_SCHEDULE_SUCSSES
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.ADD_SCHEDULE_FAILER,
        payload: err.response.data
      })
    );
};

export const deleteSchedule = data => dispatch => {
  axios
    .delete(`/schedule/allSchedules/${data}`, data)
    .then(res =>
      dispatch({
        type: actionType.DELETE_SCHEDULE_SUCSSES,
        payload: res.data
      })
    )
    .catch(
      dispatch({
        type: actionType.DELETE_SCHEDULE_FAILER
      })
    );
};

export const updateSchedule = data => dispatch => {
  console.log(data);
  axios
    .put(`/schedule/allSchedules/${data.id}`, data)
    .then(res =>
      dispatch({
        type: actionType.UPDATE_SCHEDULE_SUCSSES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: actionType.UPDATE_SCHEDULE_FAILER
      })
    );
};
