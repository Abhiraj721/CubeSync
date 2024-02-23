import React, { useEffect, useState } from "react";
import "./SessionInsights.css";
import { FormatTime } from "../Data/FormetTime";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import handleAvgs from "../Data/HandleAvgsCriteria";
import SolveStats from "../SolveStats/SolveStats";
const MySwal = withReactContent(Swal);
export default function SessionInsights({ sessions, setSession, currSession }) {
  const [ao5, setAo5] = useState("--");
  const [ao12, setAo12] = useState("--");
  const [currAo5Solves, setCurrAo5Solves] = useState([]);
  const [currAo12Solves, setcurrAo12Solves] = useState([]);
  const [pb, setPb] = useState("--");
  const [ao5Pb, setAo5Pb] = useState("--");
  const [ao12Pb, setAo12Pb] = useState("--");
  const [avg, setAvg] = useState("--");
  function getCurrAvgSolves() {
    const tempSession = sessions;

    tempSession.forEach((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
        if (solves.length >= 5) {
          let sumAo5 = 0;
          let ao5Solves = [];
          const dnfCount = solves
            .slice(0, 5)
            .map((solve) => solve.isDNF)
            .filter((dnf) => dnf === true).length;
          for (let i = 0; i < 5; i++) {
            if (solves[i].isDNF === true && dnfCount > 1) {
              sumAo5 = "DNF";
              setAo5(sumAo5);
              break;
            }
            ao5Solves.push(solves[i]);
            sumAo5 += solves[i].solveTimeInt;
          }
          if (sumAo5 !== "DNF") {
            // const avgAo5 = sumAo5 / 5;
            setAo5(handleAvgs(ao5Solves));
          }
        } else {
          setAo5("--");
        }

        if (solves.length >= 12) {
          let sumAo12 = 0;
          let ao12Solves = [];
          const dnfCount = solves
            .slice(0, 12)
            .map((solve) => solve.isDNF)
            .filter((dnf) => dnf === true).length;
          for (let i = 0; i < 12; i++) {
            if (solves[i].isDNF === true && dnfCount > 1) {
              sumAo12 = "DNF";
              setAo12(sumAo12);
              break;
            }
            ao12Solves.push(solves[i]);
            sumAo12 += solves[i].solveTimeInt;
          }
          if (sumAo12 !== "DNF") {
            // const avgAo12 = sumAo12 / 12;

            setAo12(handleAvgs(ao12Solves));

          }
        } else {
          setAo12("--");
        }
      }
    });
  }

  function getPbSingle() {
    sessions.map((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
        if (solves.length === 0) setPb("--");
        else if (solves.length > 0) {
          // Filter out DNF (solveTimeInt === -1) solve times
          const validSolveTimes = solves
            .map((solve) => solve)
            .filter((solve) => solve.isDNF === false);
          if (validSolveTimes.length > 0) {
            const pbSingleTime = Math.min(
              ...validSolveTimes.map((solve) => {
                return solve.solveTimeInt;
              })
            );
            session.pb = pbSingleTime;
            setPb(FormatTime(pbSingleTime));
          } else {
            // All solves are DNF, handle this case (replace DNF with a default value or do something else)
            // For example, you can set a default value or leave the pb as undefined
            session.pb = "--";
            setPb("No valid solves");
          }
        }
      }
      return session;
    });
  }
  function getBestAo5() {
    let ao5_Pb_Solves = [];
    sessions.map((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
        if (solves.length >= 5) {
          let bestAo5Time = Infinity;
          let bestAo5DnfCount = Infinity;
          let ao5PbSolves = [];
  
          for (let i = 0; i <= solves.length - 5; i++) {
            let ao5Arr = [];
            const ao5SolveTimes = solves.slice(i, i + 5).map((solve) => {
              ao5Arr.push(solve);
              if (solve.isDNF) return -1;
              else return solve.solveTimeInt;
            });
  
            const dnfCount = ao5SolveTimes.filter((time) => time === -1).length;
            if (dnfCount <= 1) {
              const ao5TimeSum = ao5SolveTimes.reduce(
                (acc, time) => acc + (time === -1 ? 0 : time),
                0
              );
  
              if (
                (dnfCount === 0 && ao5TimeSum / 5 < bestAo5Time) ||
                (dnfCount === 1 &&
                  ao5TimeSum / (5 - dnfCount) < bestAo5Time)
              ) {
                bestAo5Time =
                  dnfCount === 0
                    ? ao5TimeSum / 5
                    : ao5TimeSum / (5 - dnfCount);
                bestAo5DnfCount = dnfCount;
                ao5PbSolves = [...ao5Arr];
              }
            }
          }
  
          if (bestAo5DnfCount <= 1) {
            setAo5Pb(FormatTime(bestAo5Time));
            session.ao5Pb = FormatTime(bestAo5Time);
          } else {
            setAo5Pb("DNF");
            session.ao5Pb = "DNF";
          }
          session.ao5PbSolves = ao5PbSolves;
          ao5_Pb_Solves = ao5PbSolves;
        } else {
          setAo5Pb("--");
        }
      }
      return session;
    });
    if (ao5_Pb_Solves.length !== 0) {
     setAo5Pb(handleAvgs(ao5_Pb_Solves));
    }
  }
  
  
 
  
  function getBestAo12() {
    let ao12_Pb_Solves = [];
    
    sessions.map((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
        if (solves.length >= 12) {
          let bestAo12Time = Infinity;
          let bestAo12DnfCount = Infinity;
          let ao12PbSolves = [];
  
          for (let i = 0; i <= solves.length - 12; i++) {
            let ao12Arr = [];
            const ao12SolveTimes = solves.slice(i, i + 12).map((solve) => {
              ao12Arr.push(solve);
              if (solve.isDNF) return -1;
              else return solve.solveTimeInt;
            });
  
            const dnfCount = ao12SolveTimes.filter((time) => time === -1).length;
            if (dnfCount <= 1) {
              const ao12TimeSum = ao12SolveTimes.reduce(
                (acc, time) => acc + (time === -1 ? 0 : time),
                0
              );
  
              if (
                (dnfCount === 0 && ao12TimeSum / 12 < bestAo12Time) ||
                (dnfCount === 1 &&
                  ao12TimeSum / (12 - dnfCount) < bestAo12Time)
              ) {
                bestAo12Time =
                  dnfCount === 0
                    ? ao12TimeSum / 12
                    : ao12TimeSum / (12 - dnfCount);
                bestAo12DnfCount = dnfCount;
                ao12PbSolves = [...ao12Arr];
              }
            }
          }
  
          if (bestAo12DnfCount <= 1) {
            setAo12Pb(FormatTime(bestAo12Time));
            session.ao12Pb = FormatTime(bestAo12Time);
          } else {
            setAo12Pb("DNF");
            session.ao12Pb = "DNF";
          }
  
          session.ao12PbSolves = ao12PbSolves;
          ao12_Pb_Solves = ao12PbSolves;
        } else {
          setAo12Pb("--");
        }
      }
      return session;
    });
  
    if (ao12_Pb_Solves.length !== 0) {
      setAo12Pb(handleAvgs(ao12_Pb_Solves));
    }
  }
  
  
  function getAvgOfAllSolves() {
    let avgOfSolves = 0;
    let nofSolves = 0;
    sessions.map((session) => {
      if (session.id == currSession) {
        session.solves.map((solve) => {
          if (solve.isDNF === false) {
            avgOfSolves += solve.solveTimeInt;
            nofSolves++;
          }
        });
      }
    });
    avgOfSolves = avgOfSolves / nofSolves;
    setAvg(FormatTime(avgOfSolves));
  }
  function NumOfSolves() {
    let numofSolves = 0;
    sessions.map((session) => {
      if (session.id == currSession) {
        numofSolves = session.solves.length;
      }
    });
    return numofSolves;
  }
  useEffect(() => {
    if (sessions) {
      getCurrAvgSolves();
      getPbSingle();
      getBestAo5();
      getAvgOfAllSolves();
      getBestAo12();
      getCurrAo5Solves();
      getcurrAo12Solves();
    }
  }, [sessions, currSession]);
  function getAo5PbSolves() {
    let ao5PbSolves = [];
    sessions.map((session) => {
      if (session.id == currSession) {
        ao5PbSolves = session.ao5PbSolves;
      }
    });
    return ao5PbSolves;
  }
  function getAo12PbSolves() {
    let ao12PbSolves = [];
    sessions.map((session) => {
      if (session.id == currSession) {
        ao12PbSolves = session.ao12PbSolves;
      }
    });
    return ao12PbSolves;
  }
  function getCurrAo5Solves() {
    sessions.map((session) => {
      if (session.id == currSession) {
        setCurrAo5Solves(session.solves.slice(0, 5));
      }
    });
  }
  function getcurrAo12Solves() {
    sessions.map((session) => {
      if (session.id == currSession) {
        setcurrAo12Solves(session.solves.slice(0, 12));
      }
    });
  }
  function getAllsolves(){
    let avgofAll=[]
    sessions.map((session) => {
      if (session.id == currSession) {
        avgofAll=session.solves;
      }
    });
    return avgofAll
  }
  function showSolveStats(solves,statsType) {
    console.log(sessions[0].ao5PbSolves);
    MySwal.fire(<SolveStats solves={solves} statsType={statsType} />);
  }
  return (
    <div className="angry-grid">
      <div id="item-0" className="combined-item">
        <h4>Best</h4>
        <p onClick={() => showSolveStats([pb],"pb")}>{pb}</p>
      </div>
      <div id="item-1" className="combined-item">
      <h4>Mean</h4>
        <p onClick={() => showSolveStats(getAllsolves(),"all")}>{avg}</p>
      </div>
      <div id="item-2" className="combined-item">
      <h4>Ao5</h4>
        <p
          onClick={() => {
            if (NumOfSolves() >= 5) showSolveStats(currAo5Solves,"ao5");
          }}
        >
   
         Current: {ao5} 
         <br />
         Best:{ao5Pb}
      
        </p>
      </div>
      <div id="item-3" className="combined-item">
      <h4>Ao12</h4>
        <p
          onClick={() => {
            if (NumOfSolves() >= 12) showSolveStats(currAo12Solves,"ao12");
          }}
        >
         Current: {ao12} 
         <br />
         Best:{ao12Pb}
        </p>
      </div>

      {/* <div id="item-5">
        {
          <p
            onClick={() => {
              if (NumOfSolves() >= 5) showSolveStats(getAo5PbSolves(),"ao5Pb");
            }}
          >
            {ao5Pb} ao5Pb
          </p>
        }
      </div>
      <div id="item-6">
        <p
          onClick={() => {
            if (NumOfSolves() >= 12) showSolveStats(getAo12PbSolves(),"ao12Pb");
          }}
        >
          {ao12Pb} ao12Pb
        </p>
      </div> */}
    </div>
  );
}
