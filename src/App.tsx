
import { useEffect, useState } from 'react';
import './App.css';
import bug from './bug.png';
import hole from './hole.png';

function App() {

  const [playing,setPlaying] = useState(false);

  const [score, setScore] = useState(0);
  const [bugs, setBugs] = useState<boolean[]>(new Array(9).fill(false));


  function showBug(index: number) {
    const newbugs = [...bugs];
    newbugs[index] = true;
    setBugs(curBugs => {
      const newBugs = [...curBugs];
      newBugs[index] = true;
      return newBugs;
    });
  }

  function wackBug(index: number) {
    if(!bugs[index]) return;
    hideBug(index);
    setScore((score) => score + 1);
}

function hideBug(index: number) {
    setBugs(curBugs => {
      const newBugs = [...curBugs];
      newBugs[index] = false;
      return newBugs;
    });
}

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * bugs.length);
      showBug(randomIndex);
      setTimeout(()=> {
        hideBug(randomIndex);
      }, 700)

    }, 1000);
    return () => {
      clearInterval(interval)
    }
  }, [bugs])



  return (
    <div className='game'>
      <h1>Whac-A-Job</h1>
      {!playing && <div className="container"><p>You are living in an utopia. Suddenly, open junior software developer vacancies start to appear from nowhere.  You need to apply to as many jobs as possible. How many jobs can you apply to before they are gone?</p></div>}
      <button className={`game-button ${!playing ? "green" : "red"}`} onClick={() => setPlaying(!playing)}>
        {playing ? "Stop":"Start"}
      </button>
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
    </>
      )}
  </div>
  )
}

export default App;
