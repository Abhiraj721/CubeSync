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
  const [avg,setAvg]=useState("--")
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
          setCurrAo5Solves(ao5Solves)
        } else {
          setAo5("--");
        }

        if (solves.length >= 12) {
          let sumAo12 = 0;
          let ao12Solves=[]
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
            ao12Solves.push(solves[i])
            sumAo12 += solves[i].solveTimeInt;
          }
          if (sumAo12 !== "DNF") {
            const avgAo12 = sumAo12 / 12;

            setAo12(FormatTime(avgAo12));
          }
          setCurrAo12Solves(ao12Solves)
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
          let ao5PbSolves=[]
          for (let i = 0; i <= solves.length - 5; i++) {
            let ao5Arr=[]
            const ao5SolveTimes = solves.slice(i, i + 5).map((solve) => {
              ao5Arr.push(solve)
              if(solve.isDNF)return -1
              else return solve.solveTimeInt

            });
            ao5PbSolves=ao5Arr
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
            session.ao5Pb = FormatTime(bestAo5Time);

          } else {
            setAo5Pb("DNF");
            session.ao5Pb = "DNF";

          }
          session.ao5PbSolves=ao5PbSolves
        } else {
          setAo5Pb("--");
        }
      }
      return session;
    });
    console.log(sessions)
  }
  
  
  function getBestAo12() {
    sessions.map((session) => {
      if (session.id === currSession) {
        const solves = session.solves;
        if (solves.length >= 12) {
          let bestAo12Time = Infinity;
          let bestAo12DnfCount = Infinity;
          let ao12PbSolves=[]
          
          for (let i = 0; i <= solves.length - 12; i++) {
            const ao12Solves = solves.slice(i, i + 12);
  
            // Count the number of DNFs in the current Ao12 set
            const dnfCount = ao12Solves.filter((solve) => solve.isDNF === true).length;
            
            // Only consider this Ao12 set if it has at most one DNF
            if (dnfCount <= 1) {
              // Update best Ao12 time and DNF count
              ao12PbSolves=ao12Solves
              const ao12TimeSum = ao12Solves.reduce((acc, solve) => acc + (solve.isDNF ? 0 : solve.solveTimeInt), 0);
              const avgAo12Time = ao12TimeSum / 12;
  
              if (dnfCount < bestAo12DnfCount || (dnfCount === bestAo12DnfCount && avgAo12Time < bestAo12Time)) {
                bestAo12Time = avgAo12Time;
                bestAo12DnfCount = dnfCount;
              }
            }
          }
            session.ao12PbSolves=ao12PbSolves
  
          // Set Ao12 PB based on the best Ao12 set
          if (bestAo12DnfCount === 0 || bestAo12DnfCount === 1) {
            setAo12Pb(FormatTime(bestAo12Time));
            session.ao12Pb = FormatTime(bestAo12Time);

          } else {
            setAo12Pb("DNF");
            session.ao12Pb = "DNF";

          }
        } else {
          setAo12Pb("--");
        }
      }
      return session;
    });
  }
  
function getAvgOfAllSolves(){
  let avgOfSolves=0
  let nofSolves=0
  sessions.map((session)=>{
    if(session.id==currSession){
      session.solves.map((solve)=>{
        
       if(solve.isDNF===false){ 
        avgOfSolves+=solve.solveTimeInt
        nofSolves++;
      }
      })
    }
  })
  avgOfSolves=avgOfSolves/nofSolves
  setAvg(FormatTime(avgOfSolves))

}
  useEffect(() => {
  if(sessions){    getCurrAvgSolves();
    getPbSingle();
    getBestAo5();
    getAvgOfAllSolves()
    getBestAo12();}
  }, [sessions, currSession]);
function getAo5PbSolves(){
  let ao5PbSolves=[]
  sessions.map((session)=>{
    if(session.id==currSession){
      ao5PbSolves=session.ao5PbSolves
    }
  })
  return ao5PbSolves
}
function getAo12PbSolves(){
  let ao12PbSolves=[]
  sessions.map((session)=>{
    if(session.id==currSession){
      ao12PbSolves=session.ao12PbSolves
    }
  })
  return ao12PbSolves
}
  function showSolveStats(solves){
    console.log(solves)
   MySwal.fire(<SolveStats solves={solves}/>)
  }
  return (
    <div className="angry-grid">
         <div id="item-0">
          <p onClick={() => showSolveStats()}>{pb} pb</p>
        </div>
        <div id="item-1-2" className="combined-item">
          <p onClick={() =>showSolveStats() }>{avg}</p>
        </div>
        <div id="item-3">
          <p onClick={() =>showSolveStats(currAo5Solves) }>{ao5} ao5</p>
        </div>
        <div id="item-4">
          <p onClick={() => showSolveStats(currao12Solves)}>{ao12} ao12</p>
        </div>
        <div id="item-5">
          <p onClick={() => showSolveStats(getAo5PbSolves())}>{ao5Pb} ao5Pb</p>
        </div>
        <div id="item-6">
          <p onClick={() => showSolveStats(getAo12PbSolves())}>{ao12Pb} ao12Pb</p>
        </div>
    </div>
  );
}
