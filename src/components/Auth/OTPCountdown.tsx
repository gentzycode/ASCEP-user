import { useState, useEffect } from "react";

const Countdown = ({ seconds }: { seconds: number }) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const minutes = Math.floor(time / 60);
  const remainingSeconds = time % 60;

  return (
    <div className="text-sm font-bold text-dark">
      {time > 0 ? (
        <p>
          Countdown: {minutes} min {remainingSeconds} sec
        </p>
      ) : (
        <p>Countdown is complete!</p>
      )}
    </div>
  );
};

export default Countdown;
