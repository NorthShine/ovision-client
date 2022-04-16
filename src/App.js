import { HashRouter as Router } from 'react-router-dom';
import './styles/styles.scss';
import { Routes } from './routing/Routes';
import { LoaderProvider } from './providers/LoaderProvider';
import { Provider as StateProvider } from 'react-redux';
import store from './store';
import { RoomProvider } from './providers/RoomProvider';

function App() {
  return (
    <Router>
      <StateProvider store={store}>
        <RoomProvider>
          <LoaderProvider>
            <Routes />
          </LoaderProvider>
        </RoomProvider>
      </StateProvider>
    </Router>
  );
}

export default App;
