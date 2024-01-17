import React, { useEffect, useState } from "react";
import "./SessionInsights.css";
import FormatTime from "../Data/FormetTime";
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

        if (solves.length >= 5) {
          let sumAo5 = 0;
          let ao5Solves=[]
          for (let i = 0; i < 5; i++) {
            if (solves[i].solveTimeInt == -1) {
              sumAo5 = "DNF";
              setAo5(sumAo5);
              break;
            }
            ao5Solves.push(solves[i])
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

          for (let i = 0; i < 12; i++) {
            if (solves[i].solveTimeInt == -1) {
              sumAo12 = "DNF";
              setAo12(FormatTime(sumAo12));
              break;
            }
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
  const tempSession=sessions
  sessions.map((session)=>{
    if(session.id==currSession){
      {
        const solves = session.solves;

        if (solves.length > 0) {
          const pbSingleTime = Math.min(...solves.map((solve) => solve.solveTimeInt));
          session.pb = pbSingleTime;
          setPb(FormatTime(pbSingleTime));
        }
      }
    }
  })
  setSession(tempSession)
  localStorage.setItem("sessions",JSON.stringify(tempSession))
  }
  function getBestAo5() {
    const tempSession=sessions
    tempSession.map((session)=>{
      if(session.id==currSession){
        const solves = session.solves;
  
        if (solves.length >= 5) {
          let bestAo5Time = Infinity;

          for (let i = 0; i <= solves.length - 5; i++) {
            const ao5SolveTimes = solves.slice(i, i + 5).map((solve) => solve.solveTimeInt);
            const avgAo5 = ao5SolveTimes.reduce((acc, time) => acc + time, 0) / 5;

            if (avgAo5 < bestAo5Time) {
              bestAo5Time = avgAo5;
            }
          }

          setAo5Pb(FormatTime(bestAo5Time));
        }
      }
    })
  }
  function getBestAo12() {
    const tempSession=sessions
    tempSession.map((session)=>{
      if(session.id==currSession){
        const solves = session.solves;
  
        if (solves.length >= 12) {
          let bestAo12Time = Infinity;

          for (let i = 0; i <= solves.length - 12; i++) {
            const ao5SolveTimes = solves.slice(i, i + 12).map((solve) => solve.solveTimeInt);
            const avgAo5 = ao5SolveTimes.reduce((acc, time) => acc + time, 0) / 12;

            if (avgAo5 < bestAo12Time) {
              bestAo12Time = avgAo5;
            }
          }

          setAo12Pb(FormatTime(bestAo12Time));
        }
      }
    })
  }
  
  
useEffect(()=>{
  getCurrAvgSolves()
  getPbSingle()
  getBestAo5()
  getBestAo12()
},[sessions,currSession])
  
  // Call the function to calculate averages

  return (
    <div className="angry-grid">
      <div id="item-0">{ao5} ao5</div>
      <div id="item-1">{ao12} ao12</div>
      <div id="item-2">{pb} pb</div>
      <div id="item-3">{ao5Pb} ao5Pb</div>
      <div id="item-4">{ao12Pb} ao12Pb</div>
      <div id="item-5"></div>
      <div id="item-6"></div>
    </div>
  );
}
