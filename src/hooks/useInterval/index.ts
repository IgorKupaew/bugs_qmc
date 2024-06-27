import { useEffect, useRef, useState } from "react";

interface IReturn {
  intervalId: NodeJS.Timer | null;
  reset: () => void;
}

export const useInterval = (callback: () => Promise<void>, interval: number = 5000): IReturn => {
  const [reset, setReset] = useState(false);
  const id = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    callback().catch();
  }, []);

  useEffect(() => {
    const currentId = setInterval(callback, interval);
    id.current = currentId;
    return () => {
      clearInterval(currentId);
    };
  }, [reset]);

  const resetHandler = () => setReset((prev) => !prev);

  return { intervalId: id.current, reset: resetHandler };
};
