import { useRef, useEffect, useState } from "react";
import "../App.css";

const Timer: React.FC<{
  time: number;
  interval?: number;
  onEnd?: () => void;
}> = ({ time, interval = 1000, onEnd }) => {
  const [internalTime, setInternalTime] = useState<number>(time);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timeRef = useRef<number>(time);

  useEffect(() => {
    if (internalTime === 0 && onEnd) {
      onEnd();
    }
  }, [internalTime, onEnd]);
  useEffect(() => {
    timerRef.current = setInterval(
      () => setInternalTime((timeRef.current -= interval)),
      interval
    );

    return () => {
      clearInterval(timerRef.current!);
    };
  }, [interval]);

  return <div className="timer">{`Time: ${internalTime / 1000}s`}</div>;
};

export default Timer;
