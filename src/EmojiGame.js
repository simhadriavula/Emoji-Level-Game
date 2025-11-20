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
  const [available, setAvailable] = useState(allEmojis.slice(0, levels[0]));
  const [shuffled, setShuffled] = useState([...available]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false); 
  // "level" → normal level complete
  // "final" → all levels completed

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
    setShowCongrats(false);
  };

  const handleClick = (emoji) => {
    if (clicked.includes(emoji)) {
      // GAME OVER
      setGameOver(true);
      return;
    }

    const newClicks = [...clicked, emoji];
    setClicked(newClicks);
    setScore(score + 1);
    shuffleCards();

    // LEVEL COMPLETED
    if (newClicks.length === levels[level]) {
      if (level === levels.length - 1) {
        // FINAL LEVEL COMPLETED
        setShowCongrats("final");
        return;
      }

      // Normal level completed
      setShowCongrats("level");
    }
  };

  const goToNextLevel = () => {
    const next = level + 1;

    setLevel(next);
    const newSet = allEmojis.slice(0, levels[next]);
    setAvailable(newSet);
    setShuffled(newSet);
    setClicked([]);
    setScore(0);

    setShowCongrats(false);
  };

  // 🎉 NORMAL LEVEL CONGRATS SCREEN
  if (showCongrats === "level") {
    return (
      <div className="congrats-screen">
        <h1>🎉 Congratulations 🎉</h1>
        <p>You completed Level {level + 1}!</p>
        <p>Next Level: {level + 2}</p>

        <button className="next-btn" onClick={goToNextLevel}>
          Continue
        </button>
      </div>
    );
  }

  // 🎉 FINAL ALL LEVELS COMPLETED SCREEN
  if (showCongrats === "final") {
    return (
      <div className="congrats-screen">
        <h1>🏆 Congratulations 🏆</h1>
        <h2>You completed ALL levels!</h2>

        <button className="restart-btn" onClick={restartGame}>
          Play Again
        </button>
      </div>
    );
  }

  // GAME OVER SCREEN
  if (gameOver) {
    return (
      <div className="game-over-screen">
        <h1>Game Over</h1>
        <p>Your Score: {score}</p>
        <p>Your Level: {level + 1}</p>

        <button className="restart-btn" onClick={restartGame}>
          Restart Game
        </button>
      </div>
    );
  }

  // MAIN GAME UI
  return (
    <div className="game-container">
      <header className="header">
        <h1>Emoji Game</h1>

        <div className="score-box">
          <span>Level: {level + 1}</span>
          <span>Score: {score}</span>
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
