/* eslint react/prop-types: 0 */
import { useState, useContext } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import PlayerContext from '../contexts/PlayerContext';

const RegisterPlayerModal = ({ show, onHide }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const { setPlayers } = useContext(PlayerContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post('http://localhost:5000/api/players', { name });
      // Fetch updated players list
      const response = await axios.get('http://localhost:5000/api/players');
      setPlayers(response.data);
      setName('');
      onHide();
    } catch (error) {
      console.error('Error adding player:', error);
      setError('Failed to add player. Please try again.')
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Register Player</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="playerName">
            <Form.Label>Player Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter player name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          {error && <p className="text-danger">{error}</p>} {/* Display error message */}
          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterPlayerModal;