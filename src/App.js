
import { useState } from 'react';
import data from './trainer-notes.json';

function App() {
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(true);

  const reveal = (index) => {
    setSelected(index);
    setShowAnswer(true);
  };

  return (
    <div className="App">
      <h1>🎉 Cashier Showdown 🎉</h1>
      <button onClick={() => reveal(Math.floor(Math.random() * data.length))} className="random-btn">🎲 Random Scenario</button>
      <div className="grid">
        {data.map((_, i) => (
          <button key={i} onClick={() => reveal(i)} className={selected === i ? 'selected' : ''}>{i + 1}</button>
        ))}
      </div>
      {selected !== null && (
        <div className="card">
          <h2>Scenario:</h2>
          <p>{data[selected].question}</p>
          {showAnswer ? (
            <>
              <button onClick={() => setShowAnswer(false)}>Hide Answer</button>
              <p><strong>✅ Ideal Response:</strong> {data[selected].ideal}</p>
              <p><strong>🚩 Red Flags:</strong> {data[selected].flag}</p>
              <p><strong>📋 Policy:</strong> {data[selected].policy}</p>
            </>
          ) : (
            <button onClick={() => setShowAnswer(true)}>Reveal Answer</button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
