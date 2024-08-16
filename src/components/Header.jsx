import { useState } from 'react';
import RegisterPlayerModal from './RegisterPlayerModal';

const PickleballHeader = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <header className="d-flex justify-content-between p-3 bg-dark text-white">
      <h1>Beer League Pickleball</h1>
      <button className="btn btn-primary" onClick={() => setShowModal(true)}>
        Register Player
      </button>
      <RegisterPlayerModal show={showModal} onHide={() => setShowModal(false)} />
    </header>
  );
}

export default PickleballHeader;