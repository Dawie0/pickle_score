import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RosterTable from './pages/RosterTable';
import ClearPage from './pages/clear';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<RosterTable />} />
          <Route path="/clear" element={<ClearPage />} />
        </Routes>
    </Router>
  );
}

export default App;
