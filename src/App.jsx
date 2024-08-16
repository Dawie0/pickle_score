import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import RosterTable from './pages/RosterTable';
import ScoreUpdatePage from './pages/ScoreUpdatePage';

function App() {
  return (
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<RosterTable />} />
          <Route path="/update-score" element={<ScoreUpdatePage />} />
        </Routes>
    </Router>
  );
}

export default App;
