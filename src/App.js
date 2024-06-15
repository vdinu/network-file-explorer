import './App.css';
import { Explorer } from './pages/explorer/Explorer';
import { AppHeader } from './commons/layout/AppHeader';
import { AppSidebar } from './commons/layout/AppSidebar';
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "primereact/resources/themes/luna-amber/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  return (
    
    <BrowserRouter>
      <PrimeReactProvider>
        <AppHeader />
        <AppSidebar />
        <Routes>
          <Route path="*" element={<Explorer />}></Route>
        </Routes>
      </PrimeReactProvider>
    </BrowserRouter>
  );
}

export default App;