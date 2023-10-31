import { useEffect, useState } from "react";
import "./App.css";
import bug from "./hiring1.png";
import hole from "./monitor8bit.png";
import Timer from "./components/Timer";

function App() {

  const [playing, setPlaying] = useState(false);
  const [finished,setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [bugs, setBugs] = useState<boolean[]>(new Array(9).fill(false));

  const TIME_LIMIT: number = 30000;

  function setBugVisibility(index: number, isVisible: boolean) {
    setBugs((curBugs) => {
      const newBugs = [...curBugs];
      newBugs[index] = isVisible;
      return newBugs;
    });
  }

  function wackBug(index: number) {
    if (!bugs[index]) return;
    setBugVisibility(index, false);
    setScore((score) => score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * bugs.length);
      setBugVisibility(randomIndex, true);
      setTimeout(() => {
        setBugVisibility(randomIndex, false);
      }, 700);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [bugs]);


  const startGame = () => {
    setScore(0);
    setPlaying(true);
    setFinished(false);
  }
  const endGame = () => {
    setPlaying(false)
    setFinished(true)
  }

  const backToMenu = () => {
    setPlaying(false);
    setFinished(false);
  }

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
          <button className="game-button green" onClick={startGame}>Start</button>
        </div>
      )}
      {playing && (
        <>
          <h2> Score {score}</h2>
          <div className="grid">
            {bugs.map((isBug, idx) => (
              <img
                key={idx}
                src={isBug ? bug : hole}
                onClick={() => {
                  wackBug(idx);
                }}
              />
            ))}
          </div>
          <Timer
        time={TIME_LIMIT}
        onEnd={endGame}
        />
        <button className="game-button red" onClick={endGame}>End game</button>
        </>
      )}
      {finished &&
      <>
      <h2>Score {score}</h2>
      <button className="game-button green"onClick={startGame}>Play Again</button>
      <button className="game-button" onClick={backToMenu}>Back to main menu</button>
      </>}
    </div>
  );
}

export default App;
