import React, { useEffect, useState } from "react";
import "./Solves.css";
export default function Solves({ sessions, currSession, setCurrPuzzle }) {
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  useEffect(() => {
    if (sessions != null) {
      sessions.map((session, index) => {
        if (session.id === currSession) {
          const solves=session.solves
          if(solves.length>0 && solves[0].sno==1)solves.reverse()
          setCurrSessionsSolves(solves);
          setCurrPuzzle(session.puzzleType);
        }
      });
    }
  }, [sessions, currSession]);
  return (
    <div className="solvesContainer">
       <div className="scrollableContainer">
      {currSessionsSolves &&
        currSessionsSolves.map((solve, index) => {
          return (
            <div className="solve">
              <div><p className="solveSno">{solve.sno}</p></div>
             <div className="solveTimeBtn"><p className="solveTime"> {solve.solveTime}</p></div>
              <div><p className="solveDNF">DNF</p></div>
              <div><p className="solvePlus2">+2</p></div>
              <div><p className="solveDelete">X</p></div>
            </div>

          );
        })}
    </div>
    </div>
  );
}
