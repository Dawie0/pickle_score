/* eslint react/prop-types: 0 */
import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ScoreUpdateModal = ({ show, onHide, players, onUpdate }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [result, setResult] = useState('');
  const [points, setPoints] = useState('');

  const handleUpdate = () => {
    if (selectedPlayer && result && points) {
      onUpdate({ playerId: selectedPlayer, result, points: parseInt(points) });
      onHide(); // Close the modal after updating
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Score</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="playerSelect">
            <Form.Label>Select Player</Form.Label>
            <Form.Control
              as="select"
              value={selectedPlayer}
              onChange={(e) => setSelectedPlayer(e.target.value)}
            >
              <option value="" disabled>Select a player</option>
              {players.map((player) => (
                <option key={player._id} value={player._id}>
                  {player.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="resultSelect" className="mt-3">
            <Form.Label>Result</Form.Label>
            <Form.Control
              as="select"
              value={result}
              onChange={(e) => setResult(e.target.value)}
            >
              <option value="" disabled>Won or Lost</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="pointsInput" className="mt-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScoreUpdateModal;