import React, { useEffect, useLayoutEffect } from "react";
import "./PuzzleSettings.css";
import { randomScrambleForEvent } from "cubing/scramble";
import { puzzleOptions } from "../Data/PuzzleOptions";
export default function PuzzleSettings({
  currPuzzle,
  setCurrPuzzle,
  sessions,
  setSession,
  currSession,
  setCurrsession,
}) {
  function createNewSession() {
    const newSessionName= `session_${sessions.length+1}`
    const newlyCreatedSession= {
      id:newSessionName,
      puzzleType: currPuzzle,
      pb:"",
      ao5Pb:"",
      ao5PbSolves:[],
      ao12Pb:"",
      ao12PbSolves:[],
      solves: [],
    }
    setSession(prevSessions => {
      const updatedSessions = [...prevSessions, newlyCreatedSession];
      localStorage.setItem("sessions", JSON.stringify(updatedSessions));
      return updatedSessions;
    });
    console.log(newSessionName)
    setCurrsession(newSessionName)
    localStorage.setItem("currSession",newSessionName)

  }
  useEffect(()=>{

{sessions && sessions.map((session)=>{

  if(session.id==currSession){
    session.puzzleType=currPuzzle
    localStorage.setItem("sessions",JSON.stringify(sessions))
  }
  
})}
  },[currPuzzle])
  return (
    <div className="scrambleArea container-fluid">
      <select
        name=""
        id=""
        value={currPuzzle}
        className="puzzleSelect"
        onChange={(e) => setCurrPuzzle(e.target.value)}
      >
        <option value="3x3x3">3x3x3</option>
        <option value="custom">custom</option>
        <option value="2x2x2">2x2x2</option>
        <option value="4x4x4">4x4x4</option>
        <option value="5x5x5">5x5x5</option>
        <option value="6x6x6">6x6x6</option>
        <option value="7x7x7">7x7x7</option>
        <option value="megaminx">megaminx</option>
        <option value="pyraminx">pyraminx</option>
        <option value="square1">square1</option>
        <option value="clock">clock</option>
        <option value="skewb">skewb</option>
        <option value="gigaminx">gigaminx</option>
        <option value="master_tetraminx">master_tetraminx</option>
        <option value="kilominx">kilominx</option>
      </select>
      <select
        name=""
        value={currSession}
        className="sessionSelect "
        id=""
        onChange={(e) => {
          if(e.target.value=="newSession"){
            createNewSession()
          }else{
            setCurrsession(e.target.value);
            localStorage.setItem("currSession",e.target.value)
          }
          console.log(e.target.value)
        }}
      >
        {sessions && sessions.map((session) => {
          return <option value={session.id}>{session.id}</option>;
        })}
         <option value="newSession">New Session</option>
      </select>
    </div>
  );
}
