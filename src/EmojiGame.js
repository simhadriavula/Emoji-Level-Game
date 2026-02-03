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
  const [showRules, setShowRules] = useState(false);

  const shuffleCards = () => {
    setShuffled([...available].sort(() => Math.random() - 0.5));
  };

  const restartGame = () => {
    setScore(0);
    setClicked([]);
    setLevel(0);
    const firstSet = allEmojis.slice(0, levels[0]);
    setAvailable(firstSet);
    setShuffled(firstSet);
    setGameOver(false);
    setShowCongrats(false);
  };

  const handleClick = (emoji) => {
    if (clicked.includes(emoji)) {
      setGameOver(true);
      return;
    }

    const newClicks = [...clicked, emoji];
    setClicked(newClicks);
    setScore(score + 1);
    shuffleCards();

    if (newClicks.length === levels[level]) {
      if (level === levels.length - 1) {
        setShowCongrats("final");
        return;
      }
      setShowCongrats("level");
    }
  };

  const goToNextLevel = () => {
    const next = level + 1;
    const newSet = allEmojis.slice(0, levels[next]);
    setLevel(next);
    setAvailable(newSet);
    setShuffled(newSet);
    setClicked([]);
    setScore(0);
    setShowCongrats(false);
  };

  if (showCongrats === "level") {
    return (
      <div className="congrats-screen">
        <h1>🎉 Congratulations 🎉</h1>
        <p>You completed Level {level + 1}</p>
        <button className="next-btn" onClick={goToNextLevel}>Continue</button>
      </div>
    );
  }

  if (showCongrats === "final") {
    return (
      <div className="congrats-screen">
        <h1>🏆 You Won 🏆</h1>
        <button className="restart-btn" onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="game-over-screen">
        <h1>Game Over</h1>
        <p>Score: {score}</p>
        <p>Level: {level + 1}</p>
        <button className="restart-btn" onClick={restartGame}>Restart</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <header className="header">
        <div className="header-top">
          <button className="rules-btn" onClick={() => setShowRules(true)}>
            Rules
          </button>

          <h1>Emoji Game</h1>
        </div>

        <div className="score-box">
          <span>Level: {level + 1}</span>
          <span>Score: {score}</span>
        </div>
      </header>

      <div className="grid">
        {shuffled.map((emoji, index) => (
          <div key={index} className="card" onClick={() => handleClick(emoji)}>
            <span className="emoji">{emoji}</span>
          </div>
        ))}
      </div>

      {showRules && (
        <div className="rules-overlay">
          <div className="rules-box">
            <h2>🎮 Game Rules</h2>
            <ul>
              <li>▪️ Click each emoji only once</li>
              <li>▪️ Emojis shuffle after every click</li>
              <li>▪️ Repeat click ends the game</li>
              <li>▪️ Complete all emojis to level up</li>
              <li>▪️ 5 Levels total</li>
            </ul>
            <button className="close-btn" onClick={() => setShowRules(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
