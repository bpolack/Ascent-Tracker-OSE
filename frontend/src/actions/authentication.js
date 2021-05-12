import api from '../utils/api';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, FETCH_USER, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from './types';

// User login action
export const login = (email, password) => async dispatch => {

	const body = { email, password };

	try {

		const res = await api.post('/users/login', body);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(getUser());
	}
	catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'Error')));
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// User logout action
export const logout = () => ({ type: LOGOUT });

// Get user details action
export const getUser = () => async dispatch => {
	try {

		const res = await api.get('/users');

		dispatch({
			type: FETCH_USER,
			payload: res.data
		});
	}
	catch (err) {
		console.log(err.response);

		dispatch({
			type: AUTH_ERROR
		});
	}
};

// User sign up action
export const register = formData => async dispatch => {
	try {

		const res = await api.post('/users', formData);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(getUser());
	} 
	catch (err) {

		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach(error => dispatch(setAlert(error.msg, 'Error')));
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};