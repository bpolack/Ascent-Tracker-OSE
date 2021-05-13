import api from '../utils/api';
import { setAlert } from './alert';
import { GET_PROJECTS, GET_PROJECT, ADD_PROJECT, UPDATE_PROJECT, DELETE_PROJECT, PROJECT_ERROR } from './types';

// Get Projects
export const getProjects = () => async dispatch => {
	try {
		const res = await api.get('/projects');

		dispatch({
			type: GET_PROJECTS,
			payload: res.data
		});
	} catch (err) {

		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Get Project
export const getProject = id => async dispatch => {
	try {
		const res = await api.get(`/projects/${id}`);

		dispatch({
			type: GET_PROJECT,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Add Project
export const addProject = formData => async dispatch => {
	try {
		const res = await api.post('/projects', formData);

		dispatch({
			type: ADD_PROJECT,
			payload: res.data
		});

		dispatch(setAlert('New Project Added', 'Success'));
	} catch (err) {
		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Update Project
export const updateProject = formData => async dispatch => {
	try {
		const res = await api.post('/projects', formData);

		dispatch({
			type: UPDATE_PROJECT,
			payload: res.data
		});

		dispatch(setAlert('Project Updated', 'Success'));
	} catch (err) {
		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};

// Delete Project
export const deleteProject = id => async dispatch => {
	try {
		await api.delete(`/projects/${id}`);

		dispatch({
			type: DELETE_PROJECT,
			payload: id
		});

		dispatch(setAlert('Project Removed', 'Warning'));
	} catch (err) {
		dispatch({
			type: PROJECT_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status, errors: err.response.data.errors }
		});
	}
};