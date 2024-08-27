import { useContext, useState } from 'react';
import axios from 'axios';
import PlayerContext from '../contexts/PlayerContext';
import ScoreUpdateModal from '../components/ScoreUpdateModal';

const RosterTable = () => {
  const { players, fetchPlayers, generateTournament, tournament, fetchTournament } = useContext(PlayerContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(0)
  const [selectedGame, setSelectedGame] = useState(null);

  const playerList = Array.isArray(players) ? players : [];

  const handleGameClick = (match, game) => {
    // Check if the game has team1/team2 or team3/team4 and normalize them
    const normalizedGame = {
      ...game,
      team1: game.team1 || game.team3,
      team2: game.team2 || game.team4,
    };
  
    setSelectedGame(normalizedGame);
    setSelectedMatch(match.matchNumber);
    setShowModal(true);
  };


  const handleScoreUpdate = async ({ team1Score, team2Score }) => {
    try {
      const { team1, team2 } = selectedGame;

      if (!Array.isArray(team1) || !Array.isArray(team2)) {
        console.error('Error: team1 or team2 is not an array', { team1, team2 });
        return;
      }

      // Determine winners and losers
      const winningTeam = team1Score > team2Score ? team1 : team2;
      const losingTeam = team1Score > team2Score ? team2 : team1;

      console.log('Winning Team:', winningTeam);
      console.log('Losing Team:', losingTeam);

      // Update each player in the winning team
      for (const player of winningTeam) {
        
        const playerName = playerList.find((p) => p.name === player);

        await axios.put(`https://pickle-backend.vercel.app/api/players/${playerName._id}/update`, {
          result: 'win',
          points: team1Score > team2Score ? team1Score + 15 : team2Score + 15,
        });
      }

      // Update each player in the losing team
      for (const player of losingTeam) {

        const playerName = playerList.find((p) => p.name === player);

        await axios.put(`https://pickle-backend.vercel.app/api/players/${playerName._id}/update`, {
          result: 'loss',
          points: team1Score > team2Score ? team2Score : team1Score,
        });

        // If losing team score is greater than 11, add bonus points (commented out for now)
        /*
        if (losingTeamScore > 11) {
          await axios.put(`https://pickle-backend.vercel.app/api/players/${playerName._id}/update`, {
            result: 'loss',
            points: // Add bonus points here,
          });
        }
        */
      }
      

      // Remove the game from the tournament
      await axios.post(`https://pickle-backend.vercel.app/api/tournament/remove-game`, {
        matchNumber: selectedMatch,
        gameNumber: selectedGame.game_number,
      });

      // Fetch updated player list
      fetchPlayers();
      fetchTournament()
      setShowModal(false);
    } catch (error) {
      console.error('Error updating player score:', error.response || error.message);
    }
  };
  
  return (
    <div className="container mt-4">
      <h2>Rankings</h2>
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
      <button className="btn btn-primary" onClick={generateTournament}>
        Generate Tournament
      </button>

      {tournament.length > 0 && (
  <div className="matches mt-4">
    {tournament.map((match) => (
      <div key={match.matchNumber} className="match border p-3 mb-3">
        <h4>Match {match.matchNumber}</h4>
        
        {/* Render Game 1 if it exists */}
        {match.game1 && (
          <div className="game border p-3 mb-3" onClick={() => handleGameClick(match, match.game1)}>
            <h5>Game 1</h5>
            <div className="row">
              <div className="col">
                <h6>Team 1</h6>
                {match.game1.team1.map((player, i) => (
                  <p key={i}>{player}</p>
                ))}
              </div>
              <div className="col text-center">
                <h2>VS</h2>
              </div>
              <div className="col">
                <h6>Team 2</h6>
                {match.game1.team2.map((player, i) => (
                  <p key={i}>{player}</p>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Render Game 2 if it exists */}
        {match.game2 && (
          <div className="game border p-3 mb-3" onClick={() => handleGameClick(match, match.game2)}>
            <h5>Game 2</h5>
            <div className="row">
              <div className="col">
                <h6>Team 1</h6>
                {match.game2.team3.map((player, i) => (
                  <p key={i}>{player}</p>
                ))}
              </div>
              <div className="col text-center">
                <h2>VS</h2>
              </div>
              <div className="col">
                <h6>Team 2</h6>
                {match.game2.team4.map((player, i) => (
                  <p key={i}>{player}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    ))}
  </div>
)}

{selectedGame && (
  <ScoreUpdateModal
    show={showModal}
    onHide={() => setShowModal(false)} // Change `onClose` to `onHide`
    onUpdate={handleScoreUpdate}
    game={selectedGame} // Change `selectedGame` to `game`
    matchNumber={selectedMatch}
  />
)}
    </div>
  );
};

export default RosterTable;