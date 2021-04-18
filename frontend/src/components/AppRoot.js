import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AppRoot.css'; // Global app styles

// Import App Components
import ParticleWrapper from './elements/ParticleWrapper/ParticleWrapper';
import Header from './layout/Header/Header';
import AlertContainer from './layout/AlertContainer/AlertContainer';
import Footer from './layout/Footer/Footer';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

const AppRoot = (props) => {

	let appClass = "AscentApp ";
	if (props.focus) {
		appClass += "Focus";
	}

	return (
		<Router>
			<div className={appClass}>
				<ParticleWrapper />
				<Header />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/register" component={Register} />
				</Switch>
				<AlertContainer />
				<Footer />
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