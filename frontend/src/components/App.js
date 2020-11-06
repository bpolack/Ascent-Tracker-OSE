import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Global app styles

// Import Required Components
import Header from './layout/Header/Header';
import Footer from './layout/Footer/Footer';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

// Redux
import { Provider } from 'react-redux';
import store from '../store';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<Header />
					<Switch>
						<Route exact path="/" component={Landing} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/register" component={Register} />
					</Switch>
					<Footer />
				</div>
			</Router>
		</Provider>
	);
}

export default App;