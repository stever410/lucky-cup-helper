import { useEffect, useState } from "react";
import successSound from "../assets/sound/success.mp3";

const successAudio = new Audio(successSound);

const MAX_PLAY_TIME = 3;

const useSound = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter(0);
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const playSuccessSound = () => {
    if (counter < MAX_PLAY_TIME) {
      successAudio.play();
      setCounter((prev) => ++prev);
    }
  };
  return { playSuccessSound };
};

export default useSound;
