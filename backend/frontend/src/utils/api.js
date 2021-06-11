import axios from 'axios';
import { store } from '../store';
import { LOGOUT } from '../actions/types';

const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json'
	}
});

// Automatically add x-auth-token to all requests if present in persisted state
api.interceptors.request.use( (config) => {
    const token = store.getState().authentication.token;
    config.headers.common['x-auth-token'] = token;
    return config;
});

// Check for a permission denied error to force a log out on invalid tokens
api.interceptors.response.use(
	res => res,
	err => {
		if (err.response.status === 401) {
			store.dispatch({ type: LOGOUT });
		}
		return Promise.reject(err);
	}
);

export default api;