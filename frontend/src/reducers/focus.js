import { SET_FOCUS } from '../actions/types';

const initialState = false;

export default function focusReducer(state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case SET_FOCUS:
			return payload;
		default:
			return state;
	}
}