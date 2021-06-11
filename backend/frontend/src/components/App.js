// Redux & Redux Persist
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store';

// Import Main App Component
import AppRoot from './AppRoot';

const App = () => {

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<AppRoot />
			</PersistGate>
		</Provider>
	);
}

export default App