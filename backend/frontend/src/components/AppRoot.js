import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Import App Components
import ParticleWrapper from './elements/ParticleWrapper/ParticleWrapper';
import FocusToggle from './elements/FocusToggle/FocusToggle';
import Header from './layout/Header/Header';
import Landing from './pages/Landing/Landing';
import Routes from './pages/Routes';
import AlertContainer from './layout/AlertContainer/AlertContainer';
import Footer from './layout/Footer/Footer';

export const AppRoot = (props) => {

	return (
		<Router>
			<div className={`${props.focus ? 'dark' : '' }`}>
				<div className="relative bg-gradient-to-tl from-pink-500 via-fuchsia-500 to-indigo-500 dark:from-indigo-900 dark:to-gray-800">
					<ParticleWrapper />
					<Header />
					<div className="relative">
						<FocusToggle />
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route component={Routes} />
						</Switch>
					</div>
					<AlertContainer />
					<Footer />
				</div>
			</div>
		</Router>
	);
}

AppRoot.propTypes = {
	focus: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
	focus: state.focus
});

export default connect(mapStateToProps)(AppRoot)