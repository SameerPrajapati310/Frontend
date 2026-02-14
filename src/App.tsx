import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import Lottie from "lottie-react";
import roseAnimation from "./assets/rose.json";
import coupleDinnerAnimation from "./assets/couple-dinner.json";
import "./envelope.css";
import "./side-bar.css";
import proposeAnimation from "./assets/Proposal.json";
import "./p.css";
import choco from "./assets/Black Chocolate Ribbon Heart Valentine Qixi.json";
import "./choco.css";
import teddyAnimation from "./assets/Couple Bear Valentine.json";
import "./teddy.css";
import sameerImg from "./public/1.jpeg";
import mufasaImg from "./public/2.jpeg";
import jackImg from "./public/3.jpeg";
import valentineVideo from "./video_f.mp4";

import "./promis.css";
import "./hug.css";
import "./kiss.css";
import "./day.css";

type Page =
  | "HOME"
  | "VALENTINE"
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
    <div
      className={`page ${
        page === "HOME"
          ? "home-page-bg"
          : page === "VALENTINE"
          ? "valentine-premium-bg"
          : ""
      }`}

      

    >
      {/* ✨ PREMIUM BACKGROUND ORBS (VALENTINE ONLY) */}
      {page === "VALENTINE" && (
        <>
          <div className="love-orb one" />
          <div className="love-orb two" />
        </>
      )}
      


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
        {page === "HOME" && (
          <Home enterValentine={() => setPage("VALENTINE")} />
        )}
        {page === "VALENTINE" && <ValentineMode />}
        {page === "ROSE" && <RoseDay goBack={() => setPage("HOME")} />}
        {page === "PROPOSE" && <ProposeDay goBack={() => setPage("HOME")} />}
        {page === "CHOCOLATE" && <ChocolateDay goBack={() => setPage("HOME")} />}
        {page === "TEDDY" && <TeddyDay goBack={() => setPage("HOME")} />}
        {page === "PROMISE" && <PromiseDay goBack={() => setPage("HOME")} />}
        {page === "HUG" && <HugDay goBack={() => setPage("HOME")} />}
        {page === "KISS" && <KissDay goBack={() => setPage("HOME")} />}
      </div>

      {/* 💌 ENVELOPE */}
      {page === "HOME" && <Envelope />}
    </div>
  );
};

export default App;


/* ================= HOME ================= */

const Home = ({ enterValentine }: { enterValentine: () => void }) => {
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

        {/* ❤️ ENTER BUTTON */}
        <button className="enter-valentine-btn" onClick={enterValentine}>
          💌 Enter Valentine Mode
        </button>
      </div>
    </div>
  );
};



const messages = [
  "I hope this Valentine week brought a smile to your heart and warmth to your days. 💖",
  "I truly tried to make every moment special, just a small reflection of how special you are to me. 🌹",
  "If there is anything that didn’t feel perfect, I promise to learn, grow, and make every Valentine that follows even more meaningful. ✨",
  "Above all, I want you to know this — I love you. Your presence, your energy, and simply being you bring happiness and peace into my life. ❤️",
];


const ValentineMode: React.FC = () => {
  const [step, setStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [finalMessage, setFinalMessage] = useState(false);

  // 🔹 use transform-based position
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  /* ================= MESSAGE SEQUENCE ================= */
  useEffect(() => {
    if (step < messages.length) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 6000);

      return () => clearTimeout(timer);
    } else {
      setShowQuestion(true);
    }
  }, [step]);

  /* ================= MOVE NO BUTTON (SMOOTH) ================= */
  const moveNo = () => {
    const maxX = 220; // px
    const maxY = 140; // px

    setNoPos({
      x: (Math.random() - 0.5) * maxX,
      y: (Math.random() - 0.5) * maxY,
    });
  };

  return (
    <div className="valentine-mode-screen">
      {/* 💌 MESSAGE SEQUENCE */}
      {!showQuestion && (
        <div className="valentine-card">
          <p className="valentine-text">{messages[step]}</p>
        </div>
      )}

      {/* ❓ QUESTION */}
      {showQuestion && !playVideo && (
        <div className="valentine-card">
          <h2 className="valentine-question">
            Will you be my Valentine? 💘
          </h2>

          <div className="valentine-options">
            <button
              className="valentine-yes-btn"
              onClick={() => setPlayVideo(true)}
            >
              YES 💖
            </button>

            <button
              className="valentine-no-btn"
              style={{
                transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              }}
              onMouseEnter={moveNo}
              onTouchStart={moveNo}
            >
              NO 😜
            </button>
          </div>
        </div>
      )}

      {/* 🎥 VIDEO WITH OVERLAY MESSAGE */}
      {playVideo && !finalMessage && (
        <div className="valentine-video-section">
          <p className="valentine-video-text">
            I don’t know how to express my feelings exactly, but if I could,
            they might look something like this.
          </p>

          <video
            className="valentine-video"
            src={valentineVideo}
            autoPlay
            playsInline
            onEnded={() => setFinalMessage(true)}
          />
        </div>
      )}

      {/* ❤️ FINAL MESSAGE */}
      {finalMessage && (
        <div className="valentine-card">
          <p className="valentine-final-text">
            I love you, Rashmi ❤️
          </p>
        </div>
      )}
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
             Kyaa khoob lgti ho badi sundar lgti ho!!!
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


const TeddyDay = ({ goBack }: { goBack: () => void }) => {
  const [stage, setStage] = useState<Stage>("ANIMATION");
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStage("QUIZ");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const questions = [
    {
      q: "What is the date of birth of Mufasa?",
      options: ["08/02/2025", "09/02/2025"],
      correct: 0,
      points: 4,
    },
    {
      q: "What is the date of birth of Rose?",
      options: ["09/03/2019", "08/02/2020"],
      skipMessage: "Rose ka Bday toh mujhe bhee nahi pta!!! 😅",
    },
    {
      q: "Who is your favourite teddy bear?",
      options: ["Sameer", "Mufasa", "Jack"],
      correct: 0,
      points: 4,
    },
  ];

  const handleAnswer = (idx: number) => {
    const current = questions[qIndex];

    // Q2 → skip screen
    if ("skipMessage" in current) {
      setStage("SKIP_MESSAGE");
      return;
    }

    // scoring questions
    if (idx === current.correct) {
      setScore((prev) => prev + current.points!);
    }

    if (qIndex < questions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setStage("RESULT");
    }
  };

  const continueAfterSkip = () => {
    setQIndex(2); // move to Q3
    setStage("QUIZ");
  };

  const retryQuiz = () => {
    setScore(0);
    setQIndex(0);
    setStage("QUIZ");
  };

  return (
    <div className="teddy-day-container">
      {/* 🧸 INTRO */}
      {stage === "ANIMATION" && (
        <div className="teddy-animation-section">
          <h1 className="teddy-title">
            Happy Teddy Day my Pokkkkieeeee!!!
          </h1>

          <Lottie animationData={teddyAnimation} autoplay loop />

          <p className="teddy-animation-text">
            A teddy hug is coming for you 🧸💖
          </p>
        </div>
      )}

      {/* 🧠 QUIZ */}
      {stage === "QUIZ" && (
        <div className="teddy-quiz-section">
          <h1 className="teddy-title">🧸 Teddy Day Quiz</h1>

          <p className="teddy-score">Score: {score}</p>

          <p className="teddy-question">
            Q{qIndex + 1}. {questions[qIndex].q}
          </p>

          <div className="teddy-options">
            {questions[qIndex].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 😅 SKIP MESSAGE */}
      {stage === "SKIP_MESSAGE" && (
        <div className="teddy-skip-screen">
          <p className="teddy-skip-message">
            Rose ka Bday toh mujhe bhee nahi pta!!! 😅
          </p>

          <button
            className="teddy-skip-next-btn"
            onClick={continueAfterSkip}
          >
            Next ➡
          </button>
        </div>
      )}

      {/* 💖 SUCCESS RESULT */}
      {stage === "RESULT" && score >= 8 && (
        <div className="teddy-result-section">
          <h1 className="teddy-result-title">💖 Teddy Day Surprise 💖</h1>

          <div className="teddy-images">
            <img src={sameerImg} alt="Sameer" />
            <img src={mufasaImg} alt="Mufasa" />
            <img src={jackImg} alt="Jack" />
          </div>

          <p className="teddy-romantic-message">
            When you miss me, hug Mufasa…  
            <br />
            but remember, it’s just a practice hug  
            <br />
            for the real one coming soon 😉🧸❤️
          </p>
        </div>
      )}

      {/* 💔 FAIL RESULT */}
      {stage === "RESULT" && score < 8 && (
        <div className="teddy-result-section">
          <h1 className="teddy-result-title">😌 Oops!</h1>

          <p className="teddy-romantic-message">
            Retry baby 💕  Teddy thoda naraz ho gaya hai…  
            <br />
            
          </p>

          <button
            className="teddy-skip-next-btn"
            onClick={retryQuiz}
          >
            🔁 Retry
          </button>
        </div>
      )}

      <button className="teddy-back-btn" onClick={goBack}>
        ⬅ Back
      </button>
    </div>
  );
};


const PromiseDay = ({ goBack }: { goBack: () => void }) => {
  const promises = [
    {
      title: "Promise of Presence",
      text:
        "I promise to be present.\n" +
        "Not perfect. Not always right.\n" +
        "But always here."
    },
    {
      title: "Promise of Effort",
      text:
        "I don’t promise an easy life.\n" +
        "I promise to try, to learn,\n" +
        "and to fix what breaks."
    },
    {
      title: "Promise of Honesty",
      text:
        "I promise honesty,\n" +
        "even when it’s uncomfortable.\n" +
        "Because truth respects love."
    },
    {
      title: "Promise of Growth",
      text:
        "I promise to grow with you.\n" +
        "And when one of us slows down,\n" +
        "the other will wait."
    },
    {
      title: "Promise of Respect",
      text:
        "I promise to protect your dignity,\n" +
        "even in anger.\n" +
        "Especially then."
    }
  ];

  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (index < promises.length - 1) {
      setIndex(index + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="promise-day-container">
      <h1 className="promise-title">🤝 Promise Day</h1>

      {!completed ? (
        <div className="promise-card">
          <h2 className="promise-card-title">
            {promises[index].title}
          </h2>

          <p className="promise-card-text">
            {promises[index].text}
          </p>

          <p className="promise-step">
            Promise {index + 1} of {promises.length}
          </p>

          <button
            className="promise-next-btn"
            onClick={handleNext}
          >
            Next ➡
          </button>
        </div>
      ) : (
        <div className="promise-final-card">
          <p className="promise-final-text">
            These are the promises I can keep.
            <br /><br />
            In return, I ask for just one thing…
            <br /><br />
            <strong>Stay.</strong>
          </p>
        </div>
      )}

      <button className="promise-back-btn" onClick={goBack}>
        ⬅ Back
      </button>
    </div>
  );
};




type HugPrompt = {
  title: string;
  question: string;
  options: [string, string];
  task: string;
};

const HugDay = ({ goBack }: { goBack: () => void }) => {
  const prompts: HugPrompt[] = [
    {
      title: "🍵 Warm vs Refreshing Hug",
      question: "Which hug feels right right now?",
      options: ["Warm Tea / Coffee ", "Cold Drink or chilled water"],
      task:
        "Take a photo of the drink you choose — steam rising, warm cup, or cold condensation.\n" +
        "Capture the feeling of comfort or refreshment, not perfection."
    },
    {
      title: "☁️ Soft vs Playful Hug",
      question:
        "Do you want a relaxed hug…\n" +
        "or a light hug?",
      options: ["Soft Toy or Teddy", "Blanket"],
      task:
        "Take a photo of you holding your soft toy, or holding your Blanket the way you do when you’re relaxed or happy.\n" +
        "Let the photo reflect safety or joy."
    },
    {
      title: "📱 Study lecture Hug vs Web Series Hug",
      question: "What kind of vibe is your hug?",
      options: ["Study (book)", "Web Series (tablet / phone)"],
      task:
        "Take a photo of your Study setup (books)\n" +
        "or your tab/phone placed playfully like you’re enjoying something fun."
    },
    {
      title: "🧦 Sleepy Hug vs Adventure Hug",
      question:
        "Do you want a cozy resting hug…\n" +
        "or an energizing ‘let’s go’ hug?",
      options: ["Pillow", "Footware"],
      task:
        "Take a photo of your pillow for warmth,\n" +
        "or your footware ready for adventure."
    },
    {
      title: "📸 The Real Hug Photo (You Included)",
      question:
        "Now for the final real hug moment — with you in the frame.",
      options: ["Sending u with lots off love!💖", "Abhi Bhejti hun...🫂"],
      task:
        "Take a photo where you are in the frame.\n" +
        "You can hug yourself, a teddy, or a cushion — just you expressing a hug."
    }
  ];

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const nextStep = () => {
    setSelected(null);
    setStep((prev) => prev + 1);
  };

  return (
    <div className="hug-day-container">
      <h1 className="hug-title">🤗 Hug Day</h1>

      {step < prompts.length ? (
        <div className="hug-card">
          <h2 className="hug-card-title">
            {prompts[step].title}
          </h2>

          <p className="hug-question">
            {prompts[step].question}
          </p>

          <div className="hug-options">
            {prompts[step].options.map((opt, i) => (
              <button
                key={i}
                className={`hug-option-btn ${
                  selected === i ? "selected" : ""
                }`}
                onClick={() => setSelected(i)}
              >
                {opt}
              </button>
            ))}
          </div>

          {selected !== null && (
            <div className="hug-task">
              <p className="hug-task-text">
                📸 {prompts[step].task}
              </p>

              <button
                className="hug-next-btn"
                onClick={nextStep}
              >
                Next ➡
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="hug-final-card">
          <p className="hug-final-text">
            💖  
            <br />
            “I still remember our first hug.
            It’s the kind of memory I’ll never forget.”
            <br /><br />
            Love you babes.
          </p>
        </div>
      )}

      <button className="hug-back-btn" onClick={goBack}>
        ⬅ Back
      </button>
    </div>
  );
};




const SIZE = 3; // ✅ 3x3 grid
const TOTAL = SIZE * SIZE;

const shuffleArray = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const KissDay = ({ goBack }: { goBack: () => void }) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [empty, setEmpty] = useState<number>(TOTAL - 1);
  const [solved, setSolved] = useState(false);

  const initPuzzle = () => {
    const numbers = Array.from({ length: TOTAL }, (_, i) => i);
    const shuffled = shuffleArray(numbers);
    setTiles(shuffled);
    setEmpty(shuffled.indexOf(TOTAL - 1));
    setSolved(false);
  };

  useEffect(() => {
    initPuzzle();
  }, []);

  const canSwap = (index: number) => {
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;
    const emptyRow = Math.floor(empty / SIZE);
    const emptyCol = empty % SIZE;

    return (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
  };

  const handleTileClick = (idx: number) => {
    if (!canSwap(idx)) return;

    const newTiles = [...tiles];
    newTiles[empty] = newTiles[idx];
    newTiles[idx] = TOTAL - 1;

    setTiles(newTiles);
    setEmpty(idx);

    if (newTiles.every((v, i) => v === i)) {
      setSolved(true);
    }
  };

  return (
    <div className="kiss-puzzle-container">
      {!solved ? (
        <>
          <h1 className="kiss-title">💋 Kiss Day Puzzle</h1>
          <p className="kiss-instructions">
            Slide the pieces to reveal the kiss 💖
          </p>

          <div className="kiss-grid kiss-grid-3">
            {tiles.map((tile, i) => (
              <div
                key={i}
                className={`kiss-tile ${
                  tile === TOTAL - 1 ? "empty" : ""
                }`}
                onClick={() => handleTileClick(i)}
                style={{
                  backgroundImage:
                    tile !== TOTAL - 1
                      ? `url("/kiss-puzzle.jpeg")`
                      : "none",
                  backgroundPosition: `${
                    (tile % SIZE) * (100 / (SIZE - 1))
                  }% ${Math.floor(tile / SIZE) * (100 / (SIZE - 1))}%`,
                }}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="kiss-solved-screen">
          <h1 className="kiss-title">💋 You Solved It!</h1>
          <p className="kiss-message">
            Some puzzles end with answers…  
            this one ends with a kiss 😘
          </p>

          <img
            className="kiss-full-image"
            src="/kiss-puzzle.jpeg" 
            alt="Completed"
          />
        </div>
      )}

      <button className="kiss-back-btn" onClick={goBack}>
        ⬅ Back
      </button>
    </div>
  );
};


