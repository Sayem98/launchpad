import React, { useEffect, useState } from "react";

function CounterComponent(props) {
  const [CounterValue, setCounterValue] = useState("");
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [day, setDay] = useState(0);
  const setTime = props.time;

  useEffect(() => {
    function counter() {
      timeBetweenDates(setTime);
      setCounterValue(CounterValue + 1);
    }

    function timeBetweenDates(toDate) {
      var now = new Date();

      var difference = setTime - parseInt(now.getTime() / 1000);
      if (difference <= 0) {
        // Timer done
        clearInterval();
      } else {
        var seconds = Math.floor(difference);
        var minutes = Math.floor(difference / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        setSecond(seconds);
        setMinute(minutes);
        setHour(hours);
        setDay(days);
      }
    }
    setTimeout(() => {
      counter();
    }, 1000);
  }, [CounterValue]);

  return (
    <>
      {!props.isEnded ? (
        <div className="has-text-centered field">
          <p className="mb-2">Private Sale {props.statusText} In</p>
          <div className="has-text-centered">
            <strong>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {day}
              </span>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {hour}
              </span>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {minute}
              </span>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {second}
              </span>
            </strong>
          </div>
        </div>
      ) : (
        <div className="has-text-centered field">
          <p className="mb-2">Private Sale {props.statusText} In</p>
          <div className="has-text-centered">
            <strong>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {0}
              </span>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {0}
              </span>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {0}
              </span>
              <span
                className="p-2 has-background-danger-light mr-2"
                style={{ borderRadius: 4 }}
              >
                {0}
              </span>
            </strong>
          </div>
        </div>
      )}
    </>
  );
}

export default CounterComponent;
