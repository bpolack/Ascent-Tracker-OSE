import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Global Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

const App = () => {
	return (
		<div className="App">
			<h1>React App</h1>
			<FontAwesomeIcon icon={faCoffee} />
		</div>
	);
}

export default App;