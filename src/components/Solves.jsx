import React, { useEffect, useState } from "react";

export default function Solves({sessions,currSession}) {
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  useEffect(() => {
    console.log(sessions)
    if (sessions != null) {
      sessions.map((session, index) => {
        if (session.id === currSession) {
          console.log("4444444")
          setCurrSessionsSolves(session.solves);
        }
      });
    }
  }, [sessions,currSession]);
  return (
    <div>
      {currSessionsSolves &&
        currSessionsSolves.map((solve, index) => {
          return <p style={{ color: "black" }}>{solve.solveTime}</p>;
        })}
    </div>
  );
}
