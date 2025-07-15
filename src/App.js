
import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

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
  const [showConfetti, setShowConfetti] = useState(false);

  const handleClick = (index) => {
    const updated = [...revealed];
    updated[index] = true;
    setRevealed(updated);
    setCurrentScenario(scenarios[index]);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleRandom = () => {
    let available = scenarios.map((_, i) => i).filter(i => !revealed[i]);
    if (available.length === 0) return;
    const randomIndex = available[Math.floor(Math.random() * available.length)];
    handleClick(randomIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-600 via-yellow-400 to-orange-400 p-6 text-white font-sans relative overflow-hidden">
      <h1 className="text-5xl font-bold text-center mb-10 drop-shadow-2xl animate-bounce">🎉 Cashier Showdown 🎉</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={handleRandom}
          className="bg-red-600 text-white px-6 py-3 rounded-full font-bold text-xl shadow-xl hover:bg-red-700 transition-transform transform hover:scale-110"
        >
          🎲 Random Scenario
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4 max-w-5xl mx-auto">
        {scenarios.map((_, i) => (
          <motion.button
            key={i}
            disabled={revealed[i]}
            onClick={() => handleClick(i)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={\`h-20 text-2xl font-extrabold rounded-xl transition-all duration-300 \${revealed[i] ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-300 text-black hover:bg-yellow-400"}\`}
          >
            {i + 1}
          </motion.button>
        ))}
      </div>

      {currentScenario && (
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
          className="bg-white text-black mt-10 max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">🧾 Scenario:</h2>
          <p className="text-xl leading-relaxed">{currentScenario}</p>
        </motion.div>
      )}

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </div>
  );
}
