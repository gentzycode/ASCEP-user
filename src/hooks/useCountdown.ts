import { useEffect, useState } from "react";

const useCountdown = (seconds: number) => {
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

  return { minutes, remainingSeconds, time };
};

export default useCountdown;
