import { useEffect, useState } from 'react';

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLessThan24Hours: boolean;
  isFinished: boolean;
}

export const useCountdown = (targetDate?: string | Date | null): Countdown => {
  const calculate = (): Countdown => {
    if (!targetDate) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isLessThan24Hours: false,
        isFinished: true,
      };
    }

    const target =
      targetDate instanceof Date ? targetDate.getTime() : new Date(targetDate).getTime();

    const diff = target - Date.now();

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isLessThan24Hours: true,
        isFinished: true,
      };
    }

    const totalSeconds = Math.floor(diff / 1000);

    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
      isLessThan24Hours: diff < 24 * 60 * 60 * 1000,
      isFinished: false,
    };
  };

  const [countdown, setCountdown] = useState(calculate);

  useEffect(() => {
    setCountdown(calculate());

    const interval = setInterval(() => {
      setCountdown(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};
