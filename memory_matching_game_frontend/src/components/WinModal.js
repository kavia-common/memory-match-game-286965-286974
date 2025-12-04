import React from 'react';
import './WinModal.css';

// PUBLIC_INTERFACE
/**
 * Modal displayed when the player wins the game.
 * @param {Object} props
 * @param {number} props.moves - Total moves taken
 * @param {Function} props.onRestart - Handler to restart the game
 */
const WinModal = ({ moves, onRestart }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-labelledby="win-title" aria-modal="true">
        <h2 id="win-title" className="modal-title">Congratulations! 🎉</h2>
        <p className="modal-message">
          You matched all pairs in <strong>{moves}</strong> moves.
        </p>
        <button 
          className="play-again-btn"
          onClick={onRestart}
          autoFocus
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default WinModal;
