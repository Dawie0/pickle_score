/* eslint react/prop-types: 0 */
import { useState, useEffect } from 'react';

const ScoreUpdateModal = ({ show, onHide, game, onUpdate }) => {
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);

  useEffect(() => {
    // Reset the scores when the game changes
    if (game) {
      setTeam1Score(0);
      setTeam2Score(0);
    }
  }, [game]);

  const handleUpdate = () => {
    console.log('Team 1 Score:', team1Score);
    console.log('Team 2 Score:', team2Score);
    onUpdate({ team1Score, team2Score });
  };

  const handleTeam1ScoreChange = (e) => {
    const value = parseInt(e.target.value);
    console.log('Team 1 Score Change:', value);
    setTeam1Score(isNaN(value) ? 0 : value); // Set to 0 if NaN
  };
  
  const handleTeam2ScoreChange = (e) => {
    const value = parseInt(e.target.value);
    console.log('Team 2 Score Change:', value);
    setTeam2Score(isNaN(value) ? 0 : value); // Set to 0 if NaN
  }

  if (!game) return null;

  return (
    <div className={`modal ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Score</h5>
            <button type="button" className="close" onClick={onHide}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <h6>Game: {game.game_number}</h6>
            <div>
              <h6>Team 1</h6>
              {game.team1 && game.team1.map((player, i) => <p key={i}>{player}</p>)}
              <input
                type="number"
                value={team1Score}
                onChange={handleTeam1ScoreChange}
              />
            </div>
            <div>
              <h6>Team 2</h6>
              {game.team2 && game.team2.map((player, i) => <p key={i}>{player}</p>)}
              <input
                type="number"
                value={team2Score}
                onChange={handleTeam2ScoreChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onHide}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update Score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreUpdateModal;