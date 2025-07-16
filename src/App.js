
import React, { useState } from "react";
import trainerNotes from "./trainer-notes.json";
import "./App.css";

function App() {
  const [revealed, setRevealed] = useState(Array(trainerNotes.length).fill(false));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const revealScenario = (index) => {
    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);
    setCurrentIndex(index);
    setShowAnswer(false);
  };

  const current = trainerNotes[currentIndex];

  return (
    <div className="App">
      <h1>🎉 Cashier Showdown 🎉</h1>
      <button className="random" onClick={() => revealScenario(Math.floor(Math.random() * trainerNotes.length))}>
        🎲 Random Scenario
      </button>
      <div className="grid">
        {trainerNotes.map((_, i) => (
          <button
            key={i}
            disabled={revealed[i]}
            onClick={() => revealScenario(i)}
            className={revealed[i] ? "used" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {current && (
        <div className="scenario-box">
          <h2>Scenario:</h2>
          <p>{current.question}</p>
          {!showAnswer ? (
            <button className="reveal" onClick={() => setShowAnswer(true)}>
              Show Answer
            </button>
          ) : (
            <div className="answer">
              <p><strong>✅ Ideal Response:</strong> {current.ideal}</p>
              <p><strong>🚩 Red Flags:</strong> {current.red_flag}</p>
              <p><strong>📋 Policy:</strong> {current.policy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
