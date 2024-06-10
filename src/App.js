import './App.css';
import { Explorer } from './pages/explorer/Explorer';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    
    <BrowserRouter>
      <PrimeReactProvider value={{ unstyled: true }}>
        <div className="App">
          <header className="App-header">
            <p>Network File Browser</p>
          </header>
        </div>
        
      </PrimeReactProvider>
      <Routes>
        <Route path="*" element={<Explorer />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;