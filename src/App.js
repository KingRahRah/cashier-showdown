import { useState } from "react";

const scenarios = [
  {
    question: "A customer pays $42.50 in cash and claims they gave you a $100 bill instead of a $50. What do you do?",
    answer: {
      ideal: "Recount the change and refer to the cash drawer if needed. Follow procedures for over/under cash claims.",
      redFlag: "Customers who challenge cash amounts immediately may be trying to confuse the cashier.",
      policy: "Cashiers must verify and confirm change amounts aloud at the time of transaction."
    }
  },
  {
    question: "A customer attempts to pay $850.00 in cash using only $100 bills. What should you do?",
    answer: {
      ideal: "Inspect the bills for authenticity and follow high-cash-amount protocols if required.",
      redFlag: "Large amounts in big bills can be a tactic to pass counterfeits.",
      policy: "Cash over a certain threshold must be verified with counterfeit detection tools per policy."
    }
  },
  {
    question: "You receive a $10 bill that feels waxy and slightly off-color during a $31.25 cash transaction. What do you do?",
    answer: {
      ideal: "Hold the bill aside and use a counterfeit pen or light for verification.",
      redFlag: "Counterfeit bills are often passed in smaller denominations to avoid suspicion.",
      policy: "Cashiers must inspect all bills that feel suspicious using the appropriate tools."
    }
  },
  {
    question: "A customer pays $2675.00 in cash for property taxes. What do you do?",
    answer: {
      ideal: "Accept the cash, then complete the additional steps required by policy for payments over $1000.",
      redFlag: "Large cash payments may be legitimate but require extra steps to safeguard the transaction.",
      policy: "Cash over $1000 requires manager verification and additional documentation."
    }
  },
  {
    question: "A customer wants to split a $156.25 payment between cash and check. Is that allowed?",
    answer: {
      ideal: "Yes, split payments are allowed. Process each portion separately and issue a combined receipt.",
      redFlag: "Ensure no part of the payment is unverified.",
      policy: "Follow the correct process for accepting and documenting multiple payment types."
    }
  },
  {
    question: "A customer pays $36.10 in cash and seems distracted, talking on the phone. What do you do?",
    answer: {
      ideal: "Pause and ask them to confirm the amount and payment before proceeding.",
      redFlag: "Distractions can lead to disputes over how much was handed over.",
      policy: "Always get verbal confirmation before finalizing a transaction."
    }
  },
  {
    question: "You count a customer’s $54.25 payment in cash, and they claim you shorted them. What now?",
    answer: {
      ideal: "Recount the money in front of the customer and verify both amounts.",
      redFlag: "Claims of short-changing should be calmly verified to protect everyone involved.",
      policy: "Count cash aloud and confirm before placing it in the register."
    }
  },
  {
    question: "A $20 bill has 'FOR MOTION PICTURE USE ONLY' printed on it during a $46.10 payment. How do you respond?",
    answer: {
      ideal: "Politely inform the customer the bill is invalid and request a different payment method.",
      redFlag: "Fake money is often passed during busy or distracted moments.",
      policy: "Only legal tender is accepted. Fake or novelty bills must be reported."
    }
  },
  {
    question: "Customer presents a $1200.00 check. What do you look for?",
    answer: {
      ideal: "Ensure the check has the correct date, signature, and printed name/address. Follow large check policy.",
      redFlag: "Checks over a threshold may bounce if not verified carefully.",
      policy: "High-value checks must be verified per cashiering policy before acceptance."
    }
  },
  {
    question: "A customer pays $239.89 by check made out to 'cash'. What’s the proper action?",
    answer: {
      ideal: "Decline the check and explain that it must be made out to your organization.",
      redFlag: "Checks written to 'cash' can be cashed by anyone and are not secure.",
      policy: "Only accept checks properly made out to the organization."
    }
  }
];

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [revealedAnswers, setRevealedAnswers] = useState(Array(scenarios.length).fill(false));
  const [visibleAnswers, setVisibleAnswers] = useState(Array(scenarios.length).fill(false));

  const handleScenarioClick = (index) => {
    const updatedRevealed = [...revealedAnswers];
    updatedRevealed[index] = true;
    setRevealedAnswers(updatedRevealed);
    setVisibleAnswers(Array(scenarios.length).fill(false));
    setSelectedIndex(index);
  };

  const toggleAnswer = (index) => {
    const updatedVisibility = [...visibleAnswers];
    updatedVisibility[index] = !updatedVisibility[index];
    setVisibleAnswers(updatedVisibility);
  };

  return (
    <div style={{ fontFamily: "Segoe UI", padding: 20, backgroundColor: "#f4f6f9", minHeight: "100vh" }}>
      <h1 style={{ color: "#1a1a1a", textAlign: "center" }}>Cashier Training Challenge</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 30 }}>
        {scenarios.map((_, i) => (
          <button
            key={i}
            style={{
              width: 50,
              height: 50,
              fontSize: 16,
              backgroundColor: revealedAnswers[i] ? "#d1d1d1" : "#005f73",
              color: revealedAnswers[i] ? "#666" : "#fff",
              border: "none",
              borderRadius: 8
            }}
            onClick={() => handleScenarioClick(i)}
            disabled={revealedAnswers[i]}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {selectedIndex !== null && (
        <div style={{ background: "#fff", color: "#000", padding: 20, borderRadius: 10, maxWidth: 700, margin: "40px auto" }}>
          <h2>Scenario</h2>
          <p>{scenarios[selectedIndex].question}</p>
          <button
            onClick={() => toggleAnswer(selectedIndex)}
            style={{ marginTop: 10, padding: "10px 20px", backgroundColor: "#94d2bd", border: "none", borderRadius: 6 }}
          >
            {visibleAnswers[selectedIndex] ? "Hide Answer" : "Show Answer"}
          </button>
          {visibleAnswers[selectedIndex] && (
            <div style={{ marginTop: 20, textAlign: "left" }}>
              <p><strong>✅ Ideal Response:</strong> {scenarios[selectedIndex].answer.ideal}</p>
              <p><strong>🚩 Red Flag:</strong> {scenarios[selectedIndex].answer.redFlag}</p>
              <p><strong>📋 Policy:</strong> {scenarios[selectedIndex].answer.policy}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
