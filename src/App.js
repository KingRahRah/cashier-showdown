
import { useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

const scenarios = [
  "A customer wants to pay $425.75 by check, but the check is postdated by 3 days. What should you do?",
  "A customer is paying $31.25 by check but refuses to show any ID. How do you handle it?",
  "A customer hands you a handwritten check for $2675.00 with no printed name or address. Is it acceptable?",
  "A customer is paying $36.10 in cash but is talking on the phone and distracted. What would you do at the register?",
  "A customer presents a check for $239.89 made out to “Cash.” Can you accept it?",
  "You receive a $100 bill that looks faded and lacks a security strip as part of a $156.25 cash payment. What’s your next step?",
  "A customer pays $88.40 in cash and then insists they gave you a $100 bill, not a $20. What do you say?",
  "A customer gives you a check for $54.25. The written amount and numeric amount don’t match. What’s your response?",
  "A customer attempts to pay $1200.00 in cash for property taxes. Your policy requires an extra step for cash payments over $1000. What should you do?",
  "A customer pays $46.10 by check, but the check is missing a signature. What’s your move?",
  "A customer dumps thousands of coins on the counter to pay $2675.00 in cash. How do you respond?",
  "A customer pays $46.10 by check and asks for change back from it. How do you handle this request?",
  "A customer pays $31.25 using what appears to be novelty or fake money. What should you do?",
  "A customer hands you a check dated last month to pay $36.10. Is this check acceptable?",
  "A cheerful customer insists on skipping ID or verification when paying $425.75 by check. How should you proceed?",
  "A customer presents a check for $88.40 with the word “VOID” faintly visible across it. Can you accept it?",
  "A customer wants to split a $239.89 payment between cash and check. What steps do you take?",
  "A customer paying $1200.00 by check complains about a past short-change issue and watches you closely. How do you ensure accuracy and professionalism?",
  "A customer tries to pay $54.25 using a pile of small coins. What’s the correct way to process this?",
  "A rushed and distracted customer pays $156.25 by check. What do you need to double-check before accepting it?"
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
      <h1 className="text-5xl font-bold text-center mb-10 drop-shadow-2xl animate-bounce">Cashier Showdown</h1>

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
            className={`h-20 text-2xl font-extrabold rounded-xl transition-all duration-300 ${revealed[i] ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-300 text-black hover:bg-yellow-400"}`}
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
          <h2 className="text-3xl font-bold mb-4">Scenario:</h2>
          <p className="text-xl leading-relaxed">{currentScenario}</p>
        </motion.div>
      )}

      {showConfetti && typeof window !== "undefined" && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
}
