import React, { useEffect, useState } from "react";
import "./SessionInsights.css";
import FormatTime from "../Data/FormetTime";
export default function SessionInsights({ sessions, currSession }) {
  const [ao5, setAo5] = useState("--");
  const [ao12, setAo12] = useState("--");

  function getAvgSolves() {
    const tempSession = sessions;
  
    tempSession.forEach((session) => {
      if (session.id === currSession) {
        console.log(session);
        const solves = session.solves;
  
        if (solves.length >= 5) {
          let sumAo5 = 0;
  
          for (let i = 0; i < 5; i++) {
            if(solves[i].solveTimeInt==-1)
            {
                sumAo5="DNF"
                setAo5(sumAo5)
                break
            }
            sumAo5 += solves[i].solveTimeInt;
          }
          if(sumAo5!=="DNF"){
          const avgAo5 = sumAo5 / 5;
          setAo5(FormatTime(avgAo5.toFixed(2)));
          }
        } else {
          setAo5("--");
        }
  
        if (solves.length >= 12) {
          let sumAo12 = 0;
  
          for (let i = 0; i < 12; i++) {
            if(solves[i].solveTimeInt==-1)
            {
                sumAo12="DNF"
                setAo12(sumAo12)

                break
            }
            sumAo12 += solves[i].solveTimeInt;
          }
          if(sumAo12!=="DNF"){
          const avgAo12 = sumAo12 / 12;
          setAo12(FormatTime(avgAo12.toFixed(2)));
          }
        } else {
          setAo12("--");
        }
      }
    });
  }
  // Call the function to calculate averages
  useEffect(() => {
    getAvgSolves();
    console.log("44")
  }, [sessions, currSession]);

  return (
    <div className="angry-grid">
      <div id="item-0">{ao5}</div>
      <div id="item-1">{ao12}</div>
      <div id="item-2"></div>
      <div id="item-3"></div>
      <div id="item-4"></div>
      <div id="item-5"></div>
      <div id="item-6"></div>
    </div>
  );
}
