import { GET_TIMES, GET_TIME, ADD_TIME, UPDATE_TIME, DELETE_TIME, TIME_ERROR, CLEAR_TIME } from '../actions/types';

const initialState = {
	times: [],
	time: null,
	loading: true,
	error: {}
};

export default function timeReducer(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case GET_TIMES:
			return {
				...state,
				times: payload,
				loading: false
			};
		case GET_TIME:
			return {
				...state,
				time: payload,
				loading: false
			};
		case ADD_TIME:
			return {
				...state,
				times: [payload, ...state.times],
				loading: false
			};
		case DELETE_TIME:
			return {
				...state,
				times: state.times.filter((time) => time._id !== payload),
				loading: false
			};
		case TIME_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		case UPDATE_TIME:
			return {
				...state,
				times: state.times.map((time) =>
					time._id === payload._id ? payload : time
				),
				loading: false
			};
		case CLEAR_TIME:
			return {
				...state,
				time: null,
				times: null,
				loading: false
			};
		default:
			return state;
	}
}