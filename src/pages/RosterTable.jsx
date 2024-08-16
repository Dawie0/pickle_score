import { useContext, useState } from 'react';
import axios from 'axios';
import PlayerContext from '../contexts/PlayerContext';
import ScoreUpdateModal from '../components/ScoreUpdateModal';

const RosterTable = () => {
  const { players, fetchPlayers } = useContext(PlayerContext);
  const [showModal, setShowModal] = useState(false);

  const playerList = Array.isArray(players) ? players : [];

  const handleScoreUpdate = async ({ playerId, result, points }) => {
    console.log('Updating player:', playerId, result, points);
  
    try {
      const response = await axios.put(`http://localhost:5000/api/players/${playerId}/update`, {
        result,
        points,
      });
      console.log('Update response:', response.data); // Log the response
      fetchPlayers(); // Refresh the player list after updating
    } catch (error) {
      console.error('Error updating player score:', error.response || error.message);
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Pickleball Roster</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {playerList.map((player) => (
            <tr key={player._id}>
              <td>{player.name}</td>
              <td>{player.wins}</td>
              <td>{player.losses}</td>
              <td>{player.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Update Score
      </button>
      <ScoreUpdateModal
        show={showModal}
        onHide={() => setShowModal(false)}
        players={playerList}
        onUpdate={handleScoreUpdate}
      />
    </div>
  );
}

export default RosterTable;