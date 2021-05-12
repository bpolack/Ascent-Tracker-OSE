import { combineReducers } from 'redux';
import alert from './alert';
import focus from './focus';
import authentication from './authentication';
import project from './project';

export default combineReducers({
	alert,
	focus,
	authentication,
	project
});