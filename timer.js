import React, { useState, useEffect, useCallback } from 'react';

function CountdownTimer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // Set the target date to December of the current year
  const targetDate = new Date(currentYear, 11, 31);

  const calculateTimeRemaining = useCallback(() => {
    const now = new Date();
    const timeRemaining = targetDate - now;

    const months = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((timeRemaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    return {
      months,
      days,
      hours,
      minutes,
      seconds,
    };
  }, [targetDate]);

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  return (
    <div>
      <h1>Ends In</h1>
      <div>
        {timeRemaining.months > 0 && <p>Months: {timeRemaining.months}</p>}
        {timeRemaining.days > 0 && <p>Days: {timeRemaining.days}</p>}
        <p>Hrs: {timeRemaining.hours}</p>
        <p>Mins: {timeRemaining.minutes}</p>
        <p>Secs: {timeRemaining.seconds}</p>
      </div>
    </div>
  );
}

export default CountdownTimer;
