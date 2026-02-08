import React, { useState, useMemo } from "react";
import "./App.css";
import Lottie from "lottie-react";
import roseAnimation from "./assets/rose.json";
import coupleDinnerAnimation from "./assets/couple-dinner.json";
import "./envelope.css"
import "./side-bar.css"
import proposeAnimation from "./assets/Proposal.json";
import "./p.css"
import choco from "./assets/Black Chocolate Ribbon Heart Valentine Qixi.json"
import "./choco.css"

type Page =
  | "HOME"
  | "ROSE"
  | "PROPOSE"
  | "CHOCOLATE"
  | "TEDDY"
  | "PROMISE"
  | "HUG"
  | "KISS";

const App: React.FC = () => {
  const [page, setPage] = useState<Page>("HOME");

  const petals = useMemo(
    () =>
      Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + "%",
        delay: Math.random() * 5 + "s",
        duration: Math.random() * 3 + 5 + "s",
        sway: Math.random() > 0.5 ? 1 : -1,
      })),
    []
  );

  return (
    <div className="page">
      {/* 🌹 Sidebar */}
      <div className="valentine-sidebar">
        <h3>Valentine Week</h3>
        <ul>
          <li onClick={() => setPage("ROSE")}>🌹 Rose Day</li>
          <li onClick={() => setPage("PROPOSE")}>💍 Propose Day</li>
          <li onClick={() => setPage("CHOCOLATE")}>🍫 Chocolate Day</li>
          <li onClick={() => setPage("TEDDY")}>🧸 Teddy Day</li>
          <li onClick={() => setPage("PROMISE")}>🤝 Promise Day</li>
          <li onClick={() => setPage("HUG")}>🤗 Hug Day</li>
          <li onClick={() => setPage("KISS")}>💋 Kiss Day</li>
        </ul>
      </div>

      {/* 🌸 Petals */}
      <div className="petals-container">
        {petals.map((p) => (
          <div
            key={p.id}
            className="petal"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              // @ts-ignore
              "--sway-dir": p.sway,
            }}
          />
        ))}
      </div>

      {/* 🧩 MAIN CONTENT */}
      <div className="glass-card">
        {page === "HOME" && <Home />}

        {page === "ROSE" && <RoseDay goBack={() => setPage("HOME")} />}
        {page === "PROPOSE" && <ProposeDay goBack={() => setPage("HOME")} />}
        {page === "CHOCOLATE" && <ChocolateDay goBack={() => setPage("HOME")} />}
        {page === "TEDDY" && <TeddyDay goBack={() => setPage("HOME")} />}
        {page === "PROMISE" && <PromiseDay goBack={() => setPage("HOME")} />}
        {page === "HUG" && <HugDay goBack={() => setPage("HOME")} />}
        {page === "KISS" && <KissDay goBack={() => setPage("HOME")} />}
      </div>

      {/* 💌 FLOATING ENVELOPE (OUTSIDE GLASS CARD) */}
      {page === "HOME" && <Envelope />}
    </div>
  );
};

export default App;

/* ================= HOME ================= */

const Home = () => {
  return (
    <div className="landing-container landing-grid">
      <div className="landing-center">
        <h1 className="landing-title">Happy Valentine Week 💖</h1>

        <div className="landing-glass">
          <div className="lottie-wrapper">
            <Lottie animationData={coupleDinnerAnimation} loop autoplay />
          </div>
        </div>

        <p className="landing-subtitle">
          A week full of love, surprises & beautiful moments ✨
        </p>
      </div>
    </div>
  );
};

/* ================= ENVELOPE ================= */

const Envelope = () => {
  const [openLetter, setOpenLetter] = useState(false);

  return (
    <div className="envelope-section">
      <div className={`envelope ${openLetter ? "open" : ""}`}>
        <div className="envelope-flap" />

        <div className="letter">
          <div className="heart">❤️</div>
          <p>
            Dear Dr.Rashmi,
            <br /><br />
            Tum ho toh mai Hu.
            <br />
            I love you so so much!!!💖
          </p>
        </div>
      </div>

      {!openLetter && (
        <div className="envelope-buttons">
          <button onClick={() => setOpenLetter(true)}>Open!!!</button>
        </div>
      )}
    </div>
  );
};

/* ================= ROSE DAY ================= */

const RoseDay = ({ goBack }: { goBack: () => void }) => (
  <div className="day-module">
    <div className="lottie-rose-wrapper">
      <Lottie animationData={roseAnimation} autoplay loop={false} />
    </div>

    <h1 className="title">🌹 Rose Day</h1>
    <p className="subtitle">
      Sending you a bunch of virtual roses.
      <br />
      <strong>Aur Mai bhula nahi tha!!! 💖</strong>
    </p>

    <button className="back-btn" onClick={goBack}>
      ⬅ Back
    </button>
  </div>
);

/* ================= PLACEHOLDERS ================= */

const ProposeDay = ({ goBack }: { goBack: () => void }) => {
  const questions = [
    "Do you believe some connections are destined? 💫",
    "Do I make you smile even on hard days? 😊",
    "Can I be the one who stands by you forever? 💖"
  ];

  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="day-module">
      <div className="day-card">
        {!completed ? (
          <>
            <h1 className="title">💍 Propose Day</h1>

            <p className="subtitle question-text">
              {questions[step]}
            </p>

            <div className="question-buttons">
              <button onClick={handleAnswer}>Yes</button>
              <button onClick={handleAnswer}>No</button>
            </div>

            <p className="question-step">
              Question {step + 1} of {questions.length}
            </p>
          </>
        ) : (
          <>
            <h1 className="title">💍 Propose Day</h1>

          <div className="lottie-propose-wrapper">
          <Lottie
            animationData={proposeAnimation}
            autoplay
            loop
          />
          </div>


            <p className="subtitle">
              Will you make my forever a little more beautiful? 💕
            </p>
          </>
        )}

        <button className="back-btn" onClick={goBack}>
          ⬅ Back
        </button>
      </div>
    </div>
  );
};


const ChocolateDay = ({ goBack }: { goBack: () => void }) => {
  const PASSING_SCORE = 20;

  const questions = [
    {
      q: "Which radiographic feature is seen in odontogenic keratocyst?",
      options: ["Multilocular radiolucency", "Ground glass appearance"],
      correct: 0,
    },
    {
      q: "Best imaging modality for TMJ soft tissue evaluation?",
      options: ["MRI", "OPG"],
      correct: 0,
    },
    {
      q: "Sunburst appearance is classically seen in?",
      options: ["Osteosarcoma", "Ameloblastoma"],
      correct: 0,
    },
    {
      q: "Which lesion shows cotton wool appearance?",
      options: ["Paget’s disease", "Fibrous dysplasia"],
      correct: 0,
    },
    {
      q: "Radiolucent lesion with scalloped margins between roots is?",
      options: ["Traumatic bone cyst", "Radicular cyst"],
      correct: 0,
    },
  ];

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (selected: number) => {
    const isCorrect = selected === questions[index].correct;
    setScore((prev) => prev + (isCorrect ? 4 : -3));

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      setCompleted(true);
    }
  };

  const restartTest = () => {
    setIndex(0);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div className="day-module">
      <h1 className="title">🍫 Suprise Radio Test!!!</h1>
  
      {!completed ? (
        <>
          <p className="subtitle">
            Score: <strong>{score}</strong>
          </p>
  
          <p className="subtitle question-text">
            Q{index + 1}. {questions[index].q}
          </p>
  
          <div className="choco-question-buttons">
            {questions[index].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)}>
                {opt}
              </button>
            ))}
          </div>
  
          <p className="question-step">
            Question {index + 1} of {questions.length}
          </p>
        </>
      ) : score >= PASSING_SCORE ? (
        <>
          <p className="subtitle">
            🎉 Score: <strong>{score}</strong>
            <br />
            You passed! Chocolate unlocked 🍫💖
          </p>
  
          {/* 💝 Romantic Chocolaty Message (PASS ONLY) */}
          <p className="subtitle chocolate-love">
            Like chocolate melts slowly and sweetly,  
            my love for you melts into every moment, Dr Rashmi 🍫💖  
            This chocolate is sweet… but you’re sweeter ❤️
          </p>
  
          <div className="lottie-choco-wrapper">
            <Lottie animationData={choco} autoplay loop={false} />
          </div>
        </>
      ) : (
        <>
          <p className="subtitle">
            ❌ Score: <strong>{score}</strong>
            <br />
            Passing score is {PASSING_SCORE}
          </p>
  
          {/* 💌 Romantic Retry Message (FAIL ONLY) */}
          <p className="subtitle chocolate-love">
            Don’t worry love… retry again 💕  
            Even chocolates take time to melt perfectly 😌
          </p>
  
          <button onClick={restartTest}>🔁 Retry Test</button>
        </>
      )}
  
      <button className="choco-back-btn" onClick={goBack}>
        ⬅ Back
      </button>
    </div>
  );
  
};


const TeddyDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🧸 Teddy Day</h1>
    <p className="subtitle">Coming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const PromiseDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🤝 Promise Day</h1>
    <p className="subtitle">Coming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const HugDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🤗 Hug Day</h1>
    <p className="subtitle">Coming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const KissDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">💋 Kiss Day</h1>
    <p className="subtitle">If you wish we can start now 😘</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);
