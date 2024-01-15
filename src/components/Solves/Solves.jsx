import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "./Solves.css";
import 'animate.css';
import SolveAlert from "../SolveAlert/SolveAlert";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
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
  const fireAlert = (solve) => {
  MySwal.fire(<SolveAlert sessions={sessions} currSession={currSession} solve={solve}/>)

}
  return (
    <div className="solvesContainer">
       <div className="scrollableContainer">
      {currSessionsSolves &&
        currSessionsSolves.map((solve, index) => {
          return (
            <div className="solve">
              <div><p className="solveSno">{solve.sno}</p></div>
             <div onClick={()=>fireAlert(solve)} className="solveTimeBtn"><p className="solveTime"> {solve.solveTime}</p></div>
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
