import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";

// Import Required Components
import HeroSection from '../layout/HeroSection/HeroSection';

const ProtectedRoute = ({
	component: Component,
	authentication: { isAuthenticated, loading },
	...rest
}) => (
	<Route
		{...rest}
		render={props =>
			loading ? (
				<HeroSection>
					<Loader
						type="Puff"
						color="#6366f1"
						height={100}
						width={100}
						timeout={5000} 
					/>
				</HeroSection>
			) : isAuthenticated ? (
				<Component {...props} />
			) : (
				<Redirect to="/login" />
			)
		}
	/>
);

ProtectedRoute.propTypes = {
	authentication: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	authentication: state.authentication
});

export default connect(mapStateToProps)(ProtectedRoute);
