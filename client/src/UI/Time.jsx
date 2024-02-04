import { useState } from "react";

export default function Time({ time , onEndExam}) {
  const [clock, setClock] = useState({
    h: Math.floor(time / 60),
    m: Math.floor(time % 60),
    s: 0,
  });

  setTimeout(() => {
    const now = clock;
    now.s -= 1;
    if (now.s < 0) {
      now.s = 59;
      now.m -= 1;
    }
    if (now.m < 0) {
      now.m = 59;
      now.h -= 1;
    }
    if (now.h < 0) {
      onEndExam();
    }
    setClock((prev) => ({
      ...now,
    }));
  }, 900);

  return (
    <>
      <div id="clock" className="light">
        <div className="digits">
          <div className="hour">
            <span className="d1">{Math.floor(clock.h / 10)}</span>
            <span className="d2">{Math.floor(clock.h % 10)}</span>
          </div>
          <div className="dots">:</div>
          <div className="minute">
            <span className="d1">{Math.floor(clock.m / 10)}</span>
            <span className="d2">{Math.floor(clock.m % 10)}</span>
          </div>
          <div className="dots">:</div>
          <div className="second">
            <span className="d1">{Math.floor(clock.s / 10)}</span>
            <span className="d2">{Math.floor(clock.s % 10)}</span>
          </div>
        </div>
      </div>
    </>
  );
}
