import { REGISTER_SUCCESS, FETCH_USER, AUTH_ERROR, LOGIN_SUCCESS, LOGOUT } from '../actions/types';

const initialState = {
	token: null,
	isAuthenticated: null,
	loading: false,
	user: null
}

export default function authenticationReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case FETCH_USER:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: true
			};
		case LOGIN_SUCCESS:
			return {
				...state,
				...payload,
				isAuthenticated: true,
				loading: true
			};
		case AUTH_ERROR:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		case LOGOUT:
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null
			};
		default:
			return state;
	}
}