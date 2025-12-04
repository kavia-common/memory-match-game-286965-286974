import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Card from './components/Card';
import WinModal from './components/WinModal';

// Game configuration
const SYMBOLS = ['🚀', '🌟', '🎮', '🍕', '🐱', '🌺', '🎨', '🧩'];

// PUBLIC_INTERFACE
/**
 * Main Application Component
 * Manages the game state, deck generation, and interaction logic.
 */
function App() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Shuffle and initialize cards
  const initializeGame = useCallback(() => {
    // Duplicate symbols to create pairs
    const deckSymbols = [...SYMBOLS, ...SYMBOLS];
    
    // Fisher-Yates Shuffle
    for (let i = deckSymbols.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deckSymbols[i], deckSymbols[j]] = [deckSymbols[j], deckSymbols[i]];
    }

    const newCards = deckSymbols.map((symbol, index) => ({
      id: `card-${index}`,
      symbol,
      isFlipped: false,
      isMatched: false
    }));

    setCards(newCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setIsProcessing(false);
  }, []);

  // Initial load
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle card click
  const handleCardClick = (cardId) => {
    if (isProcessing) return;
    
    const clickedIndex = cards.findIndex(c => c.id === cardId);
    
    // Invalid click conditions
    if (
      clickedIndex === -1 || 
      cards[clickedIndex].isMatched || 
      flippedIndices.includes(clickedIndex)
    ) {
      return;
    }

    // Flip the card
    const newFlipped = [...flippedIndices, clickedIndex];
    setFlippedIndices(newFlipped);

    // If two cards are flipped, check match
    if (newFlipped.length === 2) {
      setIsProcessing(true);
      setMoves(m => m + 1);
      
      const [firstIndex, secondIndex] = newFlipped;
      
      if (cards[firstIndex].symbol === cards[secondIndex].symbol) {
        // Match found
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, cards[firstIndex].symbol]);
          setCards(prev => prev.map((card, index) => {
            if (index === firstIndex || index === secondIndex) {
              return { ...card, isMatched: true };
            }
            return card;
          }));
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setFlippedIndices([]);
          setIsProcessing(false);
        }, 1000);
      }
    }
  };

  const isGameWon = matchedPairs.length === SYMBOLS.length;

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1 className="game-title">Memory Match</h1>
          <div className="game-stats">
            <span className="move-counter">Moves: {moves}</span>
            <button className="reset-btn" onClick={initializeGame}>
              Restart Game
            </button>
          </div>
        </div>
      </header>

      <main className="game-board-container">
        <div className="game-grid">
          {cards.map((card, index) => (
            <Card
              key={card.id}
              id={card.id}
              symbol={card.symbol}
              isFlipped={flippedIndices.includes(index) || card.isMatched}
              isMatched={card.isMatched}
              onClick={handleCardClick}
              disabled={isProcessing}
            />
          ))}
        </div>
      </main>

      {isGameWon && (
        <WinModal 
          moves={moves} 
          onRestart={initializeGame} 
        />
      )}
    </div>
  );
}

export default App;
