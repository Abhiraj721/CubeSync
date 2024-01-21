import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Solves.css";
import "animate.css";
import SolveAlert from "../SolveAlert/SolveAlert";
import { FormatTime, timeStrToInt } from "../Data/FormetTime";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
export default function Solves({
  sessions,
  setSession,
  currSession,
  setCurrPuzzle,
}) {
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  useEffect(() => {
    if (sessions != null) {
      console.log("4sa");
      sessions.map((session, index) => {
        if (session.id === currSession) {
          const solves = session.solves;
          if (solves.length > 0 && solves[0].sno == 1) solves.reverse();
          setCurrSessionsSolves(solves);
          setCurrPuzzle(session.puzzleType);
        }
      });
    }
  }, [sessions, currSession]);
  const fireAlert = (solve) => {
    MySwal.fire(
      <SolveAlert
        sessions={sessions}
        setSession={setSession}
        currSession={currSession}
        solve={solve}
      />
    );
  };
  function handlePlus2(solve) {
    setSession((prevSessions) => {
      const tempSession = prevSessions.map((session) => {
        if (session.id === currSession) {
          const updatedSolves = session.solves.map((currSolve) => {
            if (solve.sno === currSolve.sno) {
              const solveWithPlus2 =
                solve.solveTimeInt + (solve.isPlus2 ? -2000 : 2000);
              currSolve.solveTimeInt = solveWithPlus2;
              currSolve.solveTime = FormatTime(solveWithPlus2);
              currSolve.isPlus2 = !solve.isPlus2; // Toggle the isPlus2 property
              console.log(FormatTime(solveWithPlus2) + " " + solveWithPlus2);
            }
            return currSolve;
          });

          return {
            ...session,
            solves: updatedSolves,
          };
        }
        return session;
      });

      localStorage.setItem("sessions", JSON.stringify(tempSession));
      return tempSession; // Return the modified array to update state
    });
  }
  function handleDNF(solve) {
    setSession((prevSessions) => {
      const tempSession = [...prevSessions]; // Create a shallow copy of the sessions array
      tempSession.forEach((session) => {
        if (session.id === currSession) {
          session.solves.forEach((currSolve) => {
            if (solve.sno === currSolve.sno) {
              currSolve.isDNF = !currSolve.isDNF;
              // currSolve.solveTimeInt= currSolve.isDNF?-1 :timeStrToInt(currSolve.solveTime)
              console.log(currSolve.solveTimeInt);
            }
          });
        }
      });
      localStorage.setItem("sessions", JSON.stringify(tempSession));
      return tempSession; // Return the modified array to update state
    });
  }
  function handleDeleteSolve(solve) {
    setSession((prevSessions) => {
      const tempSession = [...prevSessions]; // Create a shallow copy of the sessions array
      tempSession.forEach((session) => {
        if (session.id === currSession) {
          session.solves.forEach((currSolve, index) => {
            if (solve.sno === currSolve.sno) {
              session.solves.splice(index, 1);
            }
          });
          session.ao5PbSolves.map((currSolve,index)=>{
              if(currSolve.sno==solve.sno){
                session.ao5PbSolves.splice(index, 1);
              }
          })
          session.ao12PbSolves.map((currSolve,index)=>{
            if(currSolve.sno==solve.sno){
              session.ao12PbSolves.splice(index, 1);
            }
        })
        }
      });
      setSession(tempSession);
      localStorage.setItem("sessions", JSON.stringify(tempSession));
      return tempSession; // Return the modified array to update state
    });

  }
  function rearrangeSno() {
    sessions.map((session) => {
      if (session.id == currSession) {
        let newSno = session.solves.length;
        session.solves.map((solve) => {
          solve.sno = newSno;
          newSno--;
        });
      }
    });
  }
  return (
    <div className="solvesContainer">
      <div className="scrollableContainer">
          {currSessionsSolves && currSessionsSolves.length != 0 ? (
          currSessionsSolves.map((solve, index) => {
            return (
              <div className="solve">
                <div>
                  <p className="solveSno">{solve.sno}</p>
                </div>
                <div onClick={() => fireAlert(solve)} className="solveTimeBtn">
                  <p className="solveTime">
                    {solve.isDNF ? "DNF" : solve.solveTime}
                  </p>
                </div>
                <div>
                  <p
                    style={solve.isPlus2 ? { color: "red" } : {}}
                    onClick={() => {
                      handlePlus2(solve);
                    }}
                    className="solvePlus2"
                  >
                    +2
                  </p>
                </div>
                <div>
                  <p
                    style={solve.isDNF ? { color: "purple" } : {}}
                    onClick={() => handleDNF(solve)}
                    className="solveDNF"
                  >
                    DNF
                  </p>
                </div>
                <div>
                  <p
                    className="solveDelete"
                    onClick={() => {
                      handleDeleteSolve(solve);
                      rearrangeSno();
                    }}
                  >
                    X
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="noSolvesTitle"><p>no solves</p></div>
        )}
      </div>
    </div>
  );
}
