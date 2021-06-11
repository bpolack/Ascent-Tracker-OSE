import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';

// Import Components
import ProtectedRoute from './ProtectedRoute';

// Import Public Pages for Routes
import Error404 from './Error404/Error404';
import Login from './Login/Login';
import Register from './Register/Register';

// Import Private Pages for Routes
import Track from './Track/Track';
import Projects from './Track/Projects/Projects';
import Time from './Track/Time/Time';
import Profile from './Profile/Profile';

export class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<ProtectedRoute exact path="/profile" component={Profile} />
				<ProtectedRoute exact path="/track" component={Track} />
				<ProtectedRoute exact path="/track/projects" component={Projects} />
				<ProtectedRoute exact path="/track/time" component={Time} />
				<Route component={Error404} />
			</Switch>
		)
	}
}

export default Routes
