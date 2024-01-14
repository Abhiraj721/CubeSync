import React, { useEffect, useState } from "react";
import "./Solves.css"
export default function Solves({sessions,currSession,setCurrPuzzle}) {
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  useEffect(() => {
    if (sessions != null) {
      sessions.map((session, index) => {
        if (session.id === currSession) {
          console.log("4444444")
          setCurrSessionsSolves(session.solves.reverse());
          setCurrPuzzle(session.puzzleType)
        }
      });
    }
  }, [sessions,currSession]);
  return (
    <div className="solvesContainer">
      {currSessionsSolves &&
        currSessionsSolves.map((solve, index) => {
          return <div>{solve.sno+solve.solveTime}</div>;
        })}
    </div>
  );
}
