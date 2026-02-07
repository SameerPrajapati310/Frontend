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

  // 🌸 Falling petals (global background effect)
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
    </div>
  );
};

export default App;


const Home = () => {
  return (
    <div className="landing-container">

      <div className="landing-center">

        {/* 💖 TITLE */}
        <h1 className="landing-title">
          Happy Valentine Week 💖
        </h1>

        {/* 💎 GLASS + ANIMATION */}
        <div className="landing-glass">
          <div className="lottie-wrapper">
            <Lottie
              animationData={coupleDinnerAnimation}
              loop
              autoplay
            />
          </div>
        </div>

        {/* ✨ SUBTITLE */}
        <p className="landing-subtitle">
          A week full of love, surprises & beautiful moments ✨
        </p>

      </div>

    </div>
  );
};


const RoseDay = ({ goBack }: { goBack: () => void }) => {
  return (
    <div className="day-module">
      <div className="lottie-rose-wrapper">
        <Lottie
          animationData={roseAnimation}
          autoplay
          loop={false}
          style={{ width: 300, height: 300 }}
        />
      </div>

      <h1 className="title">🌹 Rose Day</h1>
      <p className="subtitle">
        Sending you a bunch of virtual roses.
        <br />
        <strong>Aur Mai bhoola nahi tha!!! 💖</strong>
      </p>

      <button className="back-btn" onClick={goBack}>
        ⬅ Back
      </button>
    </div>
  );
};


const ProposeDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">💍 Propose Day</h1>
    <p className="subtitle">Comming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const ChocolateDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🍫 Chocolate Day</h1>
    <p className="subtitle">Comming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const TeddyDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🧸 Teddy Day</h1>
    <p className="subtitle">Comming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const PromiseDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🤝 Promise Day</h1>
    <p className="subtitle">Comming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const HugDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">🤗 Hug Day</h1>
    <p className="subtitle">Comming Soon!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);

const KissDay = ({ goBack }: { goBack: () => void }) => (
  <>
    <h1 className="title">💋 Kiss Day</h1>
    <p className="subtitle">If you wish we can start Now!!!</p>
    <button onClick={goBack}>⬅ Back</button>
  </>
);
