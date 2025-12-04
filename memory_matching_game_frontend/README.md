# Memory Matching Game

A React-based memory matching game where players flip cards to find matching pairs.

## Features

- **Responsive Grid**: Adapts to different screen sizes (desktop and mobile).
- **Game Logic**:
  - Shuffles cards on start/reset.
  - Tracks number of moves.
  - Detects matching pairs.
  - Win condition detection.
- **Theme**: Light theme with specific accent colors (#3b82f6 primary, #06b6d4 success).
- **Accessibility**: Keyboard navigable cards.

## How to Run

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner.

### `npm run build`

Builds the app for production to the `build` folder.

## Game Rules

1. Click on a card to flip it over.
2. Click on a second card to try and find a match.
3. If the symbols match, the cards stay face up.
4. If they don't match, they flip back over after a short delay.
5. Match all pairs to win!
