/* eslint react/prop-types: 0 */
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const PlayerContext = createContext({
    players: [], // Default value
    setPlayers: () => {},
    fetchPlayers: () => {}, // Default fetch function
  });

export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [tournament, setTournament] = useState([]);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('https://pickle-backend.vercel.app/api/players'); // Adjust URL as needed
      if (response.data.length === 0) {
        console.log('No players found');
        setPlayers([]); // Set players to an empty array
      } else {
        setPlayers(response.data);
      }
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  const fetchTournament = async () => {
    try {
      const response = await axios.get('https://pickle-backend.vercel.app/api/tournament'); // Adjust URL as needed
      if (response.data.length === 0) {
        console.log('No tournaments found');
        setTournament([]); // Set tournament to an empty array
      } else {
        setTournament(response.data);
      }
    } catch (error) {
      console.error('Error fetching tournament:', error);
    }
  }

  const generateTournament = async () => {
    try {
      const response = await axios.post('https://pickle-backend.vercel.app/api/generate-tournament');
      if (response.data.length === 0) {
        console.log('No tournaments found');
        setTournament([]); // Set tournament to an empty array
      } else {
        setTournament(response.data);
        fetchTournament()
      }
    } catch (error) {
      console.error('Error generating tournament:', error);
    }
  };

  // Fetch players from the server on component mount
  useEffect(() => {
    fetchPlayers();
    fetchTournament();
  }, []);

  return (
    <PlayerContext.Provider value={{ players, setPlayers, fetchPlayers, generateTournament, tournament, fetchTournament }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;