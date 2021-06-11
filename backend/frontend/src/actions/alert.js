import {v4 as uuid} from "uuid";
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType) => dispatch => {
	const id = uuid();

	dispatch({
		type: SET_ALERT,
		payload: {id, alertType, msg}
	});
}

export const removeAlert = (id) => dispatch => {
	dispatch({
		type: REMOVE_ALERT,
		payload: id
	});
}