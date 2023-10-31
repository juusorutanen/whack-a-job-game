import { useEffect, useState } from "react";
import "./App.css";
import job from "./hiringpopup.png";
import hole from "./monitorlinkedin.png";
import Timer from "./components/Timer";

function App() {
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [jobs, setJobs] = useState<boolean[]>(new Array(9).fill(false));

  const TIME_LIMIT: number = 20000;

  function setJobVisibility(index: number, isVisible: boolean) {
    setJobs((curJobs) => {
      // `curJobs` is the current state of the `jobs` array.
    // Create a copy of the current state to avoid mutating it directly.
      const newJobs = [...curJobs];
      // Update the visibility of the job at the specified `index`.
      newJobs[index] = isVisible;
      // Return the updated copy of the `jobs` array.
    // This updated array will be the new state for `jobs`.
      return newJobs;
    });
  }

  function wackJob(index: number) {
    if (!jobs[index]) return;
    setJobVisibility(index, false);
    setScore((score) => score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * jobs.length);
      setJobVisibility(randomIndex, true);
      setTimeout(() => {
        setJobVisibility(randomIndex, false);
      }, 700);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [jobs]);

  const startGame = () => {
    setScore(0);
    setPlaying(true);
    setFinished(false);
  };
  const endGame = () => {
    setPlaying(false);
    setFinished(true);
  };

  const backToMenu = () => {
    setPlaying(false);
    setFinished(false);
  };

  return (
    <div className="game">
      <h1>Whac-A-Job</h1>
      {!playing && !finished && (
        <div className="container">
          <p>
            You are living in an utopia. Suddenly, open junior software
            developer vacancies start to appear from nowhere. You need to apply
            to as many jobs as possible. How many jobs can you apply to before
            they are gone?
          </p>
          <button className="game-button green" onClick={startGame}>
            Start
          </button>
        </div>
      )}
      {playing && (
        <>
          <h2> Score {score}</h2>
          <div className="grid">
            {jobs.map((isJob, idx) => (
              <img
                key={idx}
                src={isJob ? job : hole}
                onClick={() => {
                  wackJob(idx);
                }}
              />
            ))}
          </div>
          <Timer time={TIME_LIMIT} onEnd={endGame} />
          <button className="game-button red" onClick={endGame}>
            End game
          </button>
        </>
      )}
      {finished && (
        <>
          <h2>Score {score}</h2>
          {score <= 5 ? (
            <p className="message">You need to increase your chances!</p>
          ) : (
            <p className="message">Nice! Your chances are pretty good!</p>
          )}
          <button className="game-button green" onClick={startGame}>
            Play Again
          </button>
          <button className="game-button" onClick={backToMenu}>
            Back to main menu
          </button>
        </>
      )}
    </div>
  );
}

export default App;
