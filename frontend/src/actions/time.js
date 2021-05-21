import api from '../utils/api';
import { setAlert } from './alert';
import { GET_TIMES, GET_TIME, ADD_TIME, UPDATE_TIME, DELETE_TIME, TIME_ERROR } from './types';

// Get Times (plural) - limited to 16 latest entries
export const getTimes = () => async dispatch => {
	try {
		const res = await api.get('/time');

		dispatch({
			type: GET_TIMES,
			payload: res.data
		});
	} catch (err) {

		dispatch({
			type: TIME_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Get Time
export const getTime = id => async dispatch => {
	try {
		const res = await api.get(`/time/${id}`);

		dispatch({
			type: GET_TIME,
			payload: res.data
		});
	} catch (err) {

		dispatch({
			type: TIME_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Add Time
export const addTime = formData => async dispatch => {
	try {
		const res = await api.post('/time', formData);

		dispatch({
			type: ADD_TIME,
			payload: res.data
		});

		dispatch(setAlert('New Time Added', 'Success'));
	} catch (err) {

		console.log(err);
		console.log(err.response);

		dispatch({
			type: TIME_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Update Time
export const updateTime = formData => async dispatch => {
	try {
		const res = await api.post('/time', formData);

		dispatch({
			type: UPDATE_TIME,
			payload: res.data
		});

		dispatch(setAlert('Time Updated', 'Success'));
	} catch (err) {
		dispatch({
			type: TIME_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Delete Time
export const deleteTime = id => async dispatch => {
	try {
		await api.delete(`/time/${id}`);

		dispatch({
			type: DELETE_TIME,
			payload: id
		});

		dispatch(setAlert('Time Removed', 'Warning'));
	} catch (err) {
		dispatch({
			type: TIME_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};