import { SET_FOCUS } from './types';

export const setFocus = (value) => dispatch => {

	dispatch({
		type: SET_FOCUS,
		payload: value
	});
}