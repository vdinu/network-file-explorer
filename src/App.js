import './App.css';
import PrimeReactFileBrowser from './components/PrimeReactFileBrowser';
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider value={{ unstyled: true }}>
      <div className="App">
        <header className="App-header">
          <p>Network File Browser</p>
        </header>
      </div>
      <PrimeReactFileBrowser />
    </PrimeReactProvider>
  );
}

export default App;
