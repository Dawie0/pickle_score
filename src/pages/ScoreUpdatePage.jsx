import { useState } from 'react';
import axios from 'axios';

const ScoreUpdatePage = () => {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/scores', {
      team1: team1.split(','),
      team2: team2.split(','),
      team1Score,
      team2Score,
    });
  };

  return (
    <div className="container mt-4">
      <h2>Update Score</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Team 1 (comma-separated player IDs)</label>
          <input
            type="text"
            className="form-control"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Team 2 (comma-separated player IDs)</label>
          <input
            type="text"
            className="form-control"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Team 1 Score</label>
          <input
            type="number"
            className="form-control"
            value={team1Score}
            onChange={(e) => setTeam1Score(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>Team 2 Score</label>
          <input
            type="number"
            className="form-control"
            value={team2Score}
            onChange={(e) => setTeam2Score(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Update Score
        </button>
      </form>
    </div>
  );
}

export default ScoreUpdatePage;