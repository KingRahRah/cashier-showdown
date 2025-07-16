import React, { useState } from 'react';
import './App.css';

const scenarios = [
  {
    "question": "A customer pays $42.50 in cash and claims they gave you a $100 bill instead of a $50. What do you do?",
    "answer": {
      "ideal": "Recount the change and refer to the cash drawer if needed. Follow procedures for over/under cash claims.",
      "redFlag": "Customers who challenge cash amounts immediately may be trying to confuse the cashier.",
      "policy": "Cashiers must verify and confirm change amounts aloud at the time of transaction."
    }
  }
];

export default function App() {
  const [revealed, setRevealed] = useState(Array(scenarios.length).fill(false));
  const [currentIndex, setCurrentIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const selectScenario = (i) => {
    const r = [...revealed];
    r[i] = true;
    setRevealed(r);
    setCurrentIndex(i);
    setShowAnswer(false);
  };

  return (
    <div className="app">
      <h1>Cashier Training Challenge</h1>
      <button className="random-btn" onClick={() => selectScenario(Math.floor(Math.random()*scenarios.length))}>
        Random Scenario
      </button>
      <div className="grid">
        {scenarios.map((_, i) => (
          <button
            key={i}
            disabled={revealed[i]}
            className={revealed[i] ? 'btn-used' : 'btn'}
            onClick={() => selectScenario(i)}
          >
            {i+1}
          </button>
        ))}
      </div>
      {currentIndex !== null && (
        <div className="card">
          <h2>Scenario</h2>
          <p>{scenarios[currentIndex].question}</p>
          {!showAnswer ? (
            <button className="reveal-btn" onClick={() => setShowAnswer(true)}>Show Answer</button>
          ) : (
            <div className="answer">
              <p><strong>✅ Ideal Response:</strong> {scenarios[currentIndex].answer.ideal}</p>
              <p><strong>🚩 Red Flag:</strong> {scenarios[currentIndex].answer.redFlag}</p>
              <p><strong>📋 Policy:</strong> {scenarios[currentIndex].answer.policy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
