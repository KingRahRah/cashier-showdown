
import React, { useState } from "react";
import trainerNotes from "./trainer-notes.json";
import "./App.css";

const scenarios = Object.keys(trainerNotes);

function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [revealed, setRevealed] = useState(Array(scenarios.length).fill(false));
  const [showTrainer, setShowTrainer] = useState(false);

  const handleSelect = (index) => {
    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);
    setSelectedIndex(index);
    setShowTrainer(false);
  };

  return (
    <div className="App">
      <h1>🎉 Cashier Showdown 🎉</h1>
      <div className="grid">
        {scenarios.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={revealed[i]}
            className={revealed[i] ? "used" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="scenario-box">
          <h2>Scenario:</h2>
          <p>{scenarios[selectedIndex]}</p>
          <button onClick={() => setShowTrainer(!showTrainer)}>
            {showTrainer ? "Hide" : "Reveal"} Answer
          </button>
          {showTrainer && (
            <div className="trainer-notes">
              <p><strong>✅ Ideal Response:</strong> {trainerNotes[scenarios[selectedIndex]].response}</p>
              <p><strong>🚩 Red Flags:</strong> {trainerNotes[scenarios[selectedIndex]].redFlags}</p>
              <p><strong>📋 Policy:</strong> {trainerNotes[scenarios[selectedIndex]].policy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
