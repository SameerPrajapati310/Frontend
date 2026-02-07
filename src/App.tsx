import React, { useState, useMemo } from "react";
import "./App.css";
import Lottie from "lottie-react";
import roseAnimation from "./assets/rose.json";
import coupleDinnerAnimation from "./assets/couple-dinner.json";

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
            Dear Dr Rashmi,
            <br /><br />
            Every smile of yours makes my world brighter.
            <br />
            You are deeply special to me.💖
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

const ProposeDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">💍 Propose Day</h1>
    <p className="subtitle">Coming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const ChocolateDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🍫 Chocolate Day</h1>
    <p className="subtitle">Coming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

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
