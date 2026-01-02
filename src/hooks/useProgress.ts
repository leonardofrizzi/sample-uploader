import { useEffect, useState, useCallback } from "react";

interface UseProgressOptions {
  onComplete?: () => void;
  incrementBy?: number;
  intervalMs?: number;
}

interface UseProgressReturn {
  progress: number;
  seconds: number;
  isComplete: boolean;
}

export function useProgress({
  onComplete,
  incrementBy = 2,
  intervalMs = 100,
}: UseProgressOptions = {}): UseProgressReturn {
  const [progress, setProgress] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  useEffect(() => {
    if (isComplete) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleComplete();
          return 100;
        }
        return prev + incrementBy;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [incrementBy, intervalMs, isComplete, handleComplete]);

  return { progress, seconds, isComplete };
}
