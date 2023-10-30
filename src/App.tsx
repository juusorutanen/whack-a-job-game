
import { useEffect, useState } from 'react';
import './App.css';
import bug from './bug.png';
import hole from './hole.png';

function App() {

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
    <>
    <h1> Score {score}</h1>
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
  )
}

export default App;
