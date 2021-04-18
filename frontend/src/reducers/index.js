import { combineReducers } from 'redux';
import alert from './alert';
import focus from './focus';

export default combineReducers({
	alert,
	focus
});