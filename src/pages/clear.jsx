import axios from 'axios';

const ClearPage = () => {
  const clearPlayers = async () => {
    try {
      await axios.post('https://pickle-backend.vercel.app/api/players/clear');
      alert('All players have been cleared.');
    } catch (error) {
      console.error('Error clearing players:', error);
      alert('Failed to clear players.');
    }
  };

  const clearTournament = async () => {
    try {
      await axios.post('https://pickle-backend.vercel.app/api/tournament/clear');
      alert('All tournament data has been cleared.');
    } catch (error) {
      console.error('Error clearing tournament:', error);
      alert('Failed to clear tournament data.');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <button onClick={clearPlayers} style={{ marginRight: '20px' }}>
        Clear Players
      </button>
      <button onClick={clearTournament}>
        Clear Tournament
      </button>
    </div>
  );
};

export default ClearPage;