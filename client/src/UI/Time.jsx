import { useEffect, useState } from "react";


function Format(number) {
  if (number < 10) return '0' + number;
  return number;
}

const second = 1000;
const minute = second * 60;
const hour = minute * 60;

export default function Time({ time, onEndExam }) {
  const [Timer, setTimer] = useState({
    hour: Format(Math.floor((+time) / 60)),
    minute: Format(Math.floor(((+time) % 60) / minute)),
    second: "00",
  });
  const countDownDate = new Date();
  countDownDate.setMinutes(countDownDate.getMinutes() + (+time));
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime(); 
      const distance = countDownDate.getTime() - now;
      setTimer({
        hour: Format(Math.floor(distance / hour)),
        minute: Format(Math.floor((distance % hour) / minute)),
        second: Format(Math.floor((distance % minute) / second)),
      })
      if (distance < 0) {
        clearInterval(interval);
        onEndExam();
      }
    }, 1000);
  },[])
  return (
    <>
      <div className="countdown" id="countdown">
        <ul>
          <li>
            <span id="hours">{Timer.hour}</span>
            Hours
          </li>
          <li className="separator">:</li>
          <li>
            <span id="minutes">{Timer.minute}</span>
            Minutes
          </li>
          <li className="separator">:</li>
          <li>
            <span id="seconds">{Timer.second}</span>
            Seconds
          </li>
        </ul>
      </div>
    </>
  );
}
