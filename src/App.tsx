import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopBar from './components/TopBar';
import MDOReport from './pages/reports/MDOReport';
import GeneralReport from './pages/reports/GeneralReport';
import ContactsPage from './pages/contacts/ContactsPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TopBar/>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/reports-mdo" element = {<MDOReport/>}/>
          <Route path = "/reports-general" element = {<GeneralReport/>}/>
          <Route path = "/contacts-list" element = {<ContactsPage/>}/>
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
