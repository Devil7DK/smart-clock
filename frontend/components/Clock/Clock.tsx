import "./Clock.scss";

import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export const Clock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock">
      <div className="time">{dayjs(time).format("hh:mm A")}</div>
      <div className="date">{dayjs(time).format("dddd, MMMM D")}</div>
    </div>
  );
};
