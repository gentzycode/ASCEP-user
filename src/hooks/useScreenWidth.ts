/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = (e: UIEvent) => {
    // Handle the window resize event
    // @ts-ignore
    setScreenWidth(e?.target?.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", (e) => handleResize(e));

    return window.removeEventListener("resize", handleResize);
  }, []);

  return { screenWidth };
};

export default useScreenWidth;
