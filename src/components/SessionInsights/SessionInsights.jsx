import React, { useEffect, useState } from "react";
import "./SessionInsights.css";
import { FormatTime } from "../Data/FormetTime";
export default function SessionInsights({ sessions, setSession, currSession }) {
  const [ao5, setAo5] = useState("--");
  const [ao12, setAo12] = useState("--");
  const [pb, setPb] = useState("--");
  const [ao5Pb, setAo5Pb] = useState("--");
  const [ao12Pb, setAo12Pb] = useState("--");
  function getCurrAvgSolves() {
    const tempSession = sessions;

    tempSession.forEach((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
console.log(solves)
        if (solves.length >= 5) {
          let sumAo5 = 0;
          let ao5Solves = [];
          const dnfCount = solves
            .slice(0, 5)
            .map((solve) => solve.solveTimeInt)
            .filter((time) => time === -1).length;
          for (let i = 0; i < 5; i++) {
            if (solves[i].solveTimeInt == -1 && dnfCount > 1) {
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
          const dnfCount = solves
            .slice(0, 12)
            .map((solve) => solve.solveTimeInt)
            .filter((time) => time === -1).length;
          console.log(dnfCount);
          for (let i = 0; i < 12; i++) {
            if (solves[i].solveTimeInt == -1 && dnfCount > 1) {
              sumAo12 = "DNF";
              console.log(dnfCount);

              setAo12(sumAo12);
              break;
            }
            sumAo12 += solves[i].solveTimeInt;
          }
          if (sumAo12 !== "DNF") {
            const avgAo12 = sumAo12 / 12;
            console.log(dnfCount);

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
        if (solves.length == 0) setPb("--");
        else if (solves.length > 0) {
          // Filter out DNF (solveTimeInt === -1) solve times
          const validSolveTimes = solves
            .map((solve) => solve.solveTimeInt)
            .filter((time) => time !== -1);

          if (validSolveTimes.length > 0) {
            const pbSingleTime = Math.min(...validSolveTimes);
            session.pb = pbSingleTime;
            setPb(FormatTime(pbSingleTime));
          } else {
            // All solves are DNF, handle this case (replace DNF with a default value or do something else)
            // For example, you can set a default value or leave the pb as undefined
            session.pb = undefined;
            setPb("No valid solves");
          }
        }
      }
      return session;
    });

    // localStorage.setItem("sessions", JSON.stringify(tempSession));
  }
  function getBestAo5() {
    sessions.map((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
          if (solves.length >= 5) {
          let bestAo5Time = Infinity;
          let bestAo5DnfCount = Infinity;

          for (let i = 0; i <= solves.length - 5; i++) {
            const ao5SolveTimes = solves
              .slice(i, i + 5)
              .map((solve) => solve.solveTimeInt);
            const dnfCount = ao5SolveTimes.filter((time) => time === -1).length;
            if (dnfCount <= 1) {
              if (
                dnfCount < bestAo5DnfCount ||
                (dnfCount === bestAo5DnfCount &&
                  ao5SolveTimes.reduce(
                    (acc, time) => acc + (time === -1 ? 0 : time),
                    0
                  ) /
                    5 <
                    bestAo5Time)
              ) {
                bestAo5Time =
                  ao5SolveTimes.reduce(
                    (acc, time) => acc + (time === -1 ? 0 : time),
                    0
                  ) / 5;
                bestAo5DnfCount = dnfCount;
              }
            }
          }
          if (bestAo5DnfCount === 0 || bestAo5DnfCount === 1) {
            setAo5Pb(FormatTime(bestAo5Time));
          } else {
            setAo5Pb("DNF");
          }
        }else{
          setAo5Pb("--")
        }
      }
      return session;
    });

    // localStorage.setItem("sessions", JSON.stringify(tempSession));
  }

  function getBestAo12() {
    sessions.map((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
     if (solves.length >= 12) {
          let bestAo12Time = Infinity;
          let bestAo12DnfCount = Infinity;

          for (let i = 0; i <= solves.length - 12; i++) {
            const ao12SolveTimes = solves
              .slice(i, i + 12)
              .map((solve) => solve.solveTimeInt);

            // Count the number of DNFs in the current Ao12 set
            const dnfCount = ao12SolveTimes.filter(
              (time) => time === -1
            ).length;

            // Only consider this Ao12 set if it has at most one DNF
            if (dnfCount <= 1) {
              // Update best Ao12 time and DNF count
              if (
                dnfCount < bestAo12DnfCount ||
                (dnfCount === bestAo12DnfCount &&
                  ao12SolveTimes.reduce(
                    (acc, time) => acc + (time === -1 ? 0 : time),
                    0
                  ) /
                    12 <
                    bestAo12Time)
              ) {
                bestAo12Time =
                  ao12SolveTimes.reduce(
                    (acc, time) => acc + (time === -1 ? 0 : time),
                    0
                  ) / 12;
                bestAo12DnfCount = dnfCount;
              }
            }
          }

          // Set Ao12 PB based on the best Ao12 set
          if (bestAo12DnfCount === 0 || bestAo12DnfCount === 1) {
            setAo12Pb(FormatTime(bestAo12Time));
          } else {
            setAo12Pb("DNF");
          }
        }else{
          setAo12Pb("--")
        }
      }
      return session;
    });

    // localStorage.setItem("sessions", JSON.stringify(tempSession));
  }

  useEffect(() => {
    getCurrAvgSolves();
    getPbSingle();
    getBestAo5();
    getBestAo12();
  }, [sessions, currSession]);

  return (
    <div className="angry-grid">
      <div id="item-0">{ao5} ao5</div>
      <div id="item-1">{ao12} ao12</div>
      <div id="item-2">{pb} pb</div>
      <div id="item-3">{ao5Pb} ao5Pb</div>
      <div id="item-4">{ao12Pb} ao12Pb</div>
      <button
        onClick={() =>
          localStorage.setItem(
            "sessions",
            JSON.stringify([
              {
                id: "session_1",
                puzzleType: "3x3x3",
                pb: 40,
                ao5Pb: "",
                ao5PbSolves: [],
                ao12Pb: "",
                ao12PbSolves: [],
                solves: [
                  {
                    sno: 5,
                    solveTime: "00.04",
                    solveTimeInt: 40,
                    scramble:
                      "F' U' R2 U2 L2 D2 F2 U2 F' U2 B R2 B' F L' B F2 L' D' F2 R'",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 4,
                    solveTime: "00.09",
                    solveTimeInt: 90,
                    scramble:
                      "B R F L2 F' R2 F U2 L2 F L2 B' L2 F D U' B2 F' L F' L",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 3,
                    solveTime: "00.05",
                    solveTimeInt: 50,
                    scramble:
                      "U2 F U B' D' R2 U' R2 F' L' F2 B2 R2 U' B2 D B2 D' B2 L2 U2",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 2,
                    solveTime: "00.05",
                    solveTimeInt: 50,
                    scramble:
                      "U F B R' F' L' U' R2 F R2 F2 U2 F2 D' L2 D R2 U' L2 F2 U'",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 1,
                    solveTime: "00.04",
                    solveTimeInt: 40,
                    scramble:
                      "B D R U R2 L U' D2 R2 F' L2 F2 R2 U2 B U2 B R2 L2",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                ],
              },
              {
                id: "session_2",
                puzzleType: "3x3x3",
                pb: "",
                ao5Pb: "",
                ao5PbSolves: [],
                ao12Pb: "",
                ao12PbSolves: [],
                solves: [
                  {
                    sno: 12,
                    solveTime: "00.07",
                    solveTimeInt: 70,
                    scramble:
                      "B2 U' F L' F D2 B' D' F2 R2 L2 D B2 L2 U' D2 R2 U2 L U B2",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 11,
                    solveTime: "00.08",
                    solveTimeInt: 80,
                    scramble:
                      "F2 U D' B' L D2 F' D' R F2 L2 F' U2 B2 R2 B L2 F' D2 F L2",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 10,
                    solveTime: "00.15",
                    solveTimeInt: 150,
                    scramble:
                      "U' R D' B2 U2 R' F2 R F D' F2 B2 U L2 D B2 L2 U2 F2",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 9,
                    solveTime: "00.05",
                    solveTimeInt: 50,
                    scramble:
                      "U2 R2 B L2 F' R2 L U L2 D' L2 D R2 U' B2 D2 L2 B2 F' R' D'",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 8,
                    solveTime: "00.04",
                    solveTimeInt: 40,
                    scramble:
                      "R D B2 R' D2 B' U' D R L2 U2 F L2 U2 F2 R2 D2 F2 R2 U",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 7,
                    solveTime: "00.07",
                    solveTimeInt: 70,
                    scramble:
                      "L2 R2 B2 R2 U2 F' D2 B2 F' D2 R2 F2 U B' D2 B' R D2 U F2 U'",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 6,
                    solveTime: "00.00",
                    solveTimeInt: 0,
                    scramble:
                      "R' B' D' B2 L B' U' R2 D F D2 R2 U2 B D2 F U2 F U2 B2 L2",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 5,
                    solveTime: "00.05",
                    solveTimeInt: 50,
                    scramble:
                      "R2 U' D' F2 D' R' B' F2 U F2 B2 U L2 U2 L2 D' B2 D2 B D'",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 4,
                    solveTime: "00.07",
                    solveTimeInt: 70,
                    scramble:
                      "B D' B2 L2 D F' L F2 B2 L2 U D2 F2 U' R2 F2 D' R D2 R'",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:48 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 3,
                    solveTime: "00.07",
                    solveTimeInt: 70,
                    scramble:
                      "D L2 D R U R L B R D L2 U F2 L2 D L2 F2 D' R2 U2 B",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 2,
                    solveTime: "00.00",
                    solveTimeInt: 0,
                    scramble:
                      "L F2 U2 L F2 D' F R' B' U' B2 U F2 U2 L2 U B2 U L2 F2 D",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                  {
                    sno: 1,
                    solveTime: "00.01",
                    solveTimeInt: 10,
                    scramble:
                      "L2 D2 U2 R B2 U2 R2 F2 R F2 R U2 D' F' U' B U' B' D2 L",
                    puzzle: "3x3x3",
                    date: "January 18, 2024 at 1:47 PM",
                    isPlus2: false,
                    isDNF: false,
                    notes: "",
                  },
                ],
              },
            ])
          )
        }
      >
        add
      </button>
      <button onClick={() => localStorage.removeItem("sessions")}>del</button>
      <div id="item-5"></div>
      <div id="item-6"></div>
    </div>
  );
}
