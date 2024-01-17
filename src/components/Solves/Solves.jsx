import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "./Solves.css";
import 'animate.css';
import SolveAlert from "../SolveAlert/SolveAlert";
import FormetTime from "../Data/FormetTime";
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)
export default function Solves({ sessions,setSession, currSession, setCurrPuzzle }) {
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  useEffect(() => {
    if (sessions != null) {
      console.log("4sa")
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
  MySwal.fire(<SolveAlert sessions={sessions} setSession={setSession} currSession={currSession} solve={solve}/>)

}
function handlePlus2(solve) {
  if(!solve.isPlus2){
  setSession((prevSessions) => {
    const tempSession = [...prevSessions]; // Create a shallow copy of the sessions array
    tempSession.forEach((session) => {
      if (session.id === currSession) {
        session.solves.forEach((currSolve) => {
          if (solve.sno === currSolve.sno) {
            const solveWithPlus2 = currSolve.solveTimeInt + 2000;
            currSolve.solveTimeInt = solveWithPlus2;
            currSolve.solveTime = FormetTime(solveWithPlus2);
            console.log(FormetTime(solveWithPlus2) + " " + solveWithPlus2);
            currSolve.isPlus2=true;
          }
        });
      }
    });
    localStorage.setItem("sessions", JSON.stringify(tempSession));
    return tempSession; // Return the modified array to update state
  });
}
}
function handleDNF(solve)
{
  if(!solve.isDNF){
    setSession((prevSessions) => {
      const tempSession = [...prevSessions]; // Create a shallow copy of the sessions array
      tempSession.forEach((session) => {
        if (session.id === currSession) {
          session.solves.forEach((currSolve) => {
            if (solve.sno === currSolve.sno) {
              currSolve.isDNF=true;
              currSolve.solveTimeInt=-1
            }
          });
        }
      });
      localStorage.setItem("sessions", JSON.stringify(tempSession));
      return tempSession; // Return the modified array to update state
    });
  }
}
function checkIfPlus2IsPbSolve(solve){
  setSession((prevSessions) => {
    const tempSession = [...prevSessions]; // Create a shallow copy of the sessions array
    tempSession.forEach((session) => {
      if (session.id === currSession) {
        session.ao5PbSolves.forEach((currSolve) => {
          if (solve.sno === currSolve.sno) {
            session.ao5Pb+=400
            console.log(session)
          }
        });
      }
    });
    localStorage.setItem("sessions", JSON.stringify(tempSession));
    return tempSession; // Return the modified array to update state
  });
}
  return (
    <div className="solvesContainer">
       <div className="scrollableContainer">
      {currSessionsSolves &&
        currSessionsSolves.map((solve, index) => {
          return (
            <div className="solve">
              <div><p className="solveSno">{solve.sno}</p></div>
             <div onClick={()=>fireAlert(solve)} className="solveTimeBtn"><p className="solveTime">{solve.isDNF ? "DNF" :solve.solveTime}</p></div>
             <div><p style={solve.isPlus2 ?{color:"red"}:{}} onClick={()=>{
              handlePlus2(solve)
              checkIfPlus2IsPbSolve(solve)
            }
              } className="solvePlus2">+2</p></div>
              <div><p style={solve.isDNF ?{color:"purple"}:{}} onClick={(()=>handleDNF(solve))} className="solveDNF">DNF</p></div>
              <div><p className="solveDelete">X</p></div>
            </div>

          );
        })}
    </div>
    </div>
  );
}
