import React, { useState } from "react";
import "./App.css";

export default function EmojiGame() {
  const allEmojis = [
    "🫣","🥰","😂","😡","😃",
    "🫢","😍","🤣","🤬","😋",
    "🤫","😘","😅","🥵","😁",
    "🤭","🤩","😆","😠","😜",
    "😎","🤗","😄","😵","😥"
  ];

  const levels = [5, 10, 15, 20, 25];

  const [level, setLevel] = useState(0);
  const [available, setAvailable] = useState(
    allEmojis.slice(0, levels[0])
  );

  const [shuffled, setShuffled] = useState([...available]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [levelUp, setLevelUp] = useState(false);

  const shuffleCards = () => {
    setShuffled([...available].sort(() => Math.random() - 0.5));
  };

  const restartGame = () => {
    setScore(0);
    setClicked([]);
    setLevel(0);
    setAvailable(allEmojis.slice(0, levels[0]));
    setShuffled(allEmojis.slice(0, levels[0]));
    setGameOver(false);
  };

  const handleClick = (emoji) => {
    if (clicked.includes(emoji)) {
      // GAME OVER
      setTopScore(Math.max(topScore, score));
      setGameOver(true);
      return;
    }

    // NEW CLICK
    const newClicks = [...clicked, emoji];
    setClicked(newClicks);
    setScore(score + 1);
    shuffleCards();

    // LEVEL COMPLETED
    if (newClicks.length === levels[level]) {
      if (level === levels.length - 1) {
        // FINAL LEVEL FINISH → GAME OVER
        setTopScore(Math.max(topScore, score + 1));
        setGameOver(true);
        return;
      }

      // SHOW LEVEL UP ANIMATION
      setLevelUp(true);
      setTimeout(() => setLevelUp(false), 1200);

      // NEXT LEVEL
      const nextLevel = level + 1;
      setLevel(nextLevel);
      const newSet = allEmojis.slice(0, levels[nextLevel]);
      setAvailable(newSet);
      setShuffled(newSet);
      setClicked([]);
      setScore(0);
    }
  };

  // GAME OVER SCREEN
  if (gameOver) {
    return (
      <div className="game-over-screen">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <p>Top Score: {topScore}</p>
        <button className="restart-btn" onClick={restartGame}>
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* LEVEL UP POPUP */}
      {levelUp && <div className="level-popup">🎉 Level Up! 🎉</div>}

      <header className="header">
        <h1>Emoji Game</h1>
        <div className="score-box">
          <span>Level: {level + 1}</span>
          <span>Score: {score}</span>
          <span>Top Score: {topScore}</span>
        </div>
      </header>

      <div className="grid">
        {shuffled.map((emoji, index) => (
          <div
            key={index}
            className="card"
            onClick={() => handleClick(emoji)}
          >
            <span className="emoji">{emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}