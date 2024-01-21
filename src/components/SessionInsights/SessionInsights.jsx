import React, { useEffect, useState } from "react";
import "./SessionInsights.css";
import { FormatTime } from "../Data/FormetTime";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import SolveStats from "../SolveStats/SolveStats";
const MySwal = withReactContent(Swal);
export default function SessionInsights({ sessions, setSession, currSession }) {
  const [ao5, setAo5] = useState("--");
  const [ao12, setAo12] = useState("--");
  const [currAo5Solves, setCurrAo5Solves] = useState([]);
  const [currao12Solves, setCurrAo12Solves] = useState([]);
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
            const avgAo5 = sumAo5 / 5;
            setAo5(FormatTime(avgAo5));
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
            const avgAo12 = sumAo12 / 12;

            setAo12(FormatTime(avgAo12));
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
              if (
                dnfCount < bestAo5DnfCount ||
                (dnfCount === bestAo5DnfCount &&
                  ao5SolveTimes.reduce(
                    (acc, time) => acc + (time === -1 ? 0 : time),
                    0
                  ) / 5 < bestAo5Time)
              ) {
                bestAo5Time =
                  ao5SolveTimes.reduce(
                    (acc, time) => acc + (time === -1 ? 0 : time),
                    0
                  ) / 5;
                bestAo5DnfCount = dnfCount;
                ao5PbSolves = [...ao5Arr]; // Move this line here
              }
            }
          }
  
          if (bestAo5DnfCount === 0 || bestAo5DnfCount === 1) {
            setAo5Pb(FormatTime(bestAo5Time));
            session.ao5Pb = FormatTime(bestAo5Time);
          } else {
            setAo5Pb("DNF");
            session.ao5Pb = "DNF";
          }
          session.ao5PbSolves = ao5PbSolves;
        } else {
          setAo5Pb("--");
        }
      }
      return session;
    });
    console.log(sessions);
  }
  
  function getBestAo12() {
    sessions.map((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
        if (solves.length >= 12) {
          let bestAo12Time = Infinity;
          let bestAo12DnfCount = Infinity;
          let ao12PbSolves = [];

          for (let i = 0; i <= solves.length - 12; i++) {
            const ao12Solves = solves.slice(i, i + 12);

            // Count the number of DNFs in the current Ao12 set
            const dnfCount = ao12Solves.filter(
              (solve) => solve.isDNF === true
            ).length;

            // Update best Ao12 time and DNF count
            const ao12TimeSum = ao12Solves.reduce(
              (acc, solve) => acc + solve.solveTimeInt,
              0
            );

            if (
              dnfCount <= bestAo12DnfCount ||
              (dnfCount === bestAo12DnfCount && ao12TimeSum < bestAo12Time)
            ) {
              bestAo12Time = ao12TimeSum;
              bestAo12DnfCount = dnfCount;
              ao12PbSolves = ao12Solves.slice(); // Copy the solves for the best Ao12 set
            }
          }

          // Set Ao12 PB based on the best Ao12 set
          if (bestAo12DnfCount < 12) {
            setAo12Pb(FormatTime(bestAo12Time / (12 - bestAo12DnfCount)));
            session.ao12Pb = FormatTime(bestAo12Time / (12 - bestAo12DnfCount));
          } else {
            setAo12Pb("DNF");
            session.ao12Pb = "DNF";
          }

          session.ao12PbSolves = ao12PbSolves;
        } else {
          setAo12Pb("--");
        }
      }
      return session;
    });
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
      getCurrAo12Solves();
    }
  }, [sessions, currSession]);
  function getAo5PbSolves() {
    console.log("gajab");
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
  function getCurrAo12Solves() {
    sessions.map((session) => {
      if (session.id == currSession) {
        setCurrAo12Solves(session.solves.slice(0, 12));
      }
    });
  }
  function showSolveStats(solves) {
    console.log(sessions[0].ao5PbSolves);
    MySwal.fire(<SolveStats solves={solves} />);
  }
  return (
    <div className="angry-grid">
      <div id="item-0">
        <p onClick={() => showSolveStats()}>{pb} pb</p>
      </div>
      <div id="item-1-2" className="combined-item">
        <p onClick={() => showSolveStats()}>{avg}</p>
      </div>
      <div id="item-3">
        <p
          onClick={() => {
            if (NumOfSolves() >= 5) showSolveStats(currAo5Solves);
          }}
        >
          {ao5} ao5
        </p>
      </div>
      <div id="item-4">
        <p
          onClick={() => {
            if (NumOfSolves() >= 12) showSolveStats(currao12Solves);
          }}
        >
          {ao12} ao12
        </p>
      </div>
      <div id="item-5">
        {
          <p
            onClick={() => {
              if (NumOfSolves() >= 5) showSolveStats(getAo5PbSolves());
            }}
          >
            {ao5Pb} ao5Pb
          </p>
        }
      </div>
      <div id="item-6">
        <p
          onClick={() => {
            if (NumOfSolves() >= 12) showSolveStats(getAo12PbSolves());
          }}
        >
          {ao12Pb} ao12Pb
        </p>
      </div>
    </div>
  );
}
