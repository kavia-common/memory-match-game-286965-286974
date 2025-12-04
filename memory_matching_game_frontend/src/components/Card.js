import React from 'react';
import './Card.css';

// PUBLIC_INTERFACE
/**
 * Card component representing a single card in the memory game.
 * @param {Object} props
 * @param {string} props.id - Unique identifier for the card
 * @param {string} props.symbol - The symbol or image to display on the card face
 * @param {boolean} props.isFlipped - Whether the card is currently flipped up
 * @param {boolean} props.isMatched - Whether the card has been matched
 * @param {Function} props.onClick - Handler for when the card is clicked
 * @param {boolean} props.disabled - Whether the card interaction is disabled
 */
const Card = ({ id, symbol, isFlipped, isMatched, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !isFlipped && !isMatched) {
      onClick(id);
    }
  };

  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''} ${isMatched ? 'matched' : ''}`} 
      onClick={handleClick}
      role="button"
      aria-label={isFlipped || isMatched ? `Card with ${symbol}` : "Face down card"}
      aria-pressed={isFlipped || isMatched}
      tabIndex={disabled || isMatched ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="card-inner">
        <div className="card-front">
          {/* Back of the card (face down) */}
          <span className="card-pattern">?</span>
        </div>
        <div className="card-back">
          {/* Front of the card (face up) */}
          <span className="card-symbol">{symbol}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
