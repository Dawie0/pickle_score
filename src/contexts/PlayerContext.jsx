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

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/players'); // Adjust URL as needed
      setPlayers(response.data);
    } catch (error) {
      console.error('Error fetching players:', error);
    }
  };

  // Fetch players from the server on component mount
  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <PlayerContext.Provider value={{ players, setPlayers, fetchPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;