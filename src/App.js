import { useState } from "react";

const scenarios = [
  "Customer is paying $425.75 by check. The check is postdated by 3 days.",
  "Customer is paying $31.25 by check. The customer refuses to show ID for the check.",
  "Customer is paying $2675.00 by check. The check is handwritten with no name or address printed.",
  "Customer is paying $36.10 by cash. The customer is on their phone and not paying attention.",
  "Customer is paying $239.89 by check. The check is written out to 'cash'.",
  "Customer is paying $156.25 by cash. The bill is suspiciously faded and lacks a security strip.",
  "Customer is paying $88.40 by cash. The customer argues they gave a $100 bill instead of a $20.",
  "Customer is paying $54.25 by check. The check has mismatched written and numeric amounts.",
  "Customer is paying $1200.00 by cash. The customer attempts to pay property taxes in cash over $1000.",
  "Customer is paying $46.10 by check. The check is missing a signature.",
  "Customer is paying $2675.00 by cash. The customer pays using only coins.",
  "Customer is paying $46.10 by check. The customer asks for change back from a check.",
  "Customer is paying $31.25 by cash. The bill appears to be novelty or play money.",
  "Customer is paying $36.10 by check. The check is dated from last month.",
  "Customer is paying $425.75 by cash. The customer is friendly but insists on skipping check verification.",
  "Customer is paying $88.40 by check. The check has 'VOID' faintly written across it.",
  "Customer is paying $239.89 by cash. The customer wants to split payment between cash and check.",
  "Customer is paying $1200.00 by check. The customer complains about being short-changed last visit and watches closely.",
  "Customer is paying $54.25 by cash. The customer pays using only small coins.",
  "Customer is paying $156.25 by check. The customer is in a rush and distracted."
];

export default function App() {
  const [revealed, setRevealed] = useState(Array(20).fill(false));
  const [currentScenario, setCurrentScenario] = useState(null);

  const handleClick = (index) => {
    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);
    setCurrentScenario(scenarios[index]);
  };

  return (
    <div>
      <h1>💰 Cashier Showdown 💰</h1>
      <div className="grid">
        {scenarios.map((_, i) => (
          <button
            key={i}
            disabled={revealed[i]}
            onClick={() => handleClick(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {currentScenario && (
        <div className="card">
          <p>{currentScenario}</p>
        </div>
      )}
    </div>
  );
}
