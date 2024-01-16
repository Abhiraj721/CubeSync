import "./App.css";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Timer from "./components/Timer/Timer";
import PuzzleSettings from "./components/PuzzleSettings/PuzzleSettings";
import ScrambleVisualizer from "./components/ScrambleVisualizer/ScrambleVisualizer";
import Navbar from "./components/Navbar/Navbar";
import { isMobile, isTablet } from "mobile-device-detect";
import MobileNavbar from "./components/MobileNavbar/MobileNavbar";
import Solves from "./components/Solves/Solves";
import SessionInsights from "./components/SessionInsights/SessionInsights";
function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [currScramble, setCurrScramble] = useState("");
  const [currPuzzle, setCurrPuzzle] = useState("");
  const [currSession, setCurrsession] = useState("");
  const [sessions, setSession] = useState([]);
  const touchRef = useRef(null);
  useEffect(() => {
    const sessions = localStorage.getItem("sessions");
    if (sessions == null) {
      const sessions = [
        {
          id: "session_1",
          puzzleType: "3x3x3",
          solves: [],
        },
      ];
      localStorage.setItem("sessions", JSON.stringify(sessions));
      localStorage.setItem("currSession", "session_1");
      setCurrsession("session_1");
    } else {
      setCurrsession(localStorage.getItem("currSession"));
    }
  }, []);
  useLayoutEffect(() => {
    const sessions = JSON.parse(localStorage.getItem("sessions"));
    console.log(sessions);
    setSession(sessions);
  }, []);

  return (
    <div className="App row">
      <div className="col col-lg-2 col-md-1 col-12" style={{ padding: 0 }}>
        {window.innerWidth <= 767 ? <MobileNavbar /> : <Navbar />}
      </div>

      <div className="col col-lg-7 col-md-7 col-12" style={{ padding: 0 }}>
        {/* Content of the middle column */}
        <div
          className="timerPlayGround"
          style={{ width: "100%" }}
          onTouchStart={(event) => touchRef.current.handleTouchStart(event)}
          onTouchEnd={(event) => touchRef.current.handleTouchEnd(event)}
        >
          <PuzzleSettings
            currScramble={currScramble}
            setCurrScramble={setCurrScramble}
            isRunning={isRunning}
            currPuzzle={currPuzzle}
            setCurrPuzzle={setCurrPuzzle}
            sessions={sessions}
            setSession={setSession}
            currSession={currSession}
            setCurrsession={setCurrsession}
          />
          <Timer
            currScramble={currScramble}
            setCurrScramble={setCurrScramble}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            currPuzzle={currPuzzle}
            setCurrPuzzle={setCurrPuzzle}
            currSession={currSession}
            setSession={setSession}
            ref={touchRef}
          />
        </div>
      </div>

      <div className="col col-lg-3 col-md-4 col-12" style={{ padding: 0 }}>
        <Solves
          sessions={sessions}
          setSession={setSession}
          currSession={currSession}
          setCurrPuzzle={setCurrPuzzle}
        ></Solves>
        <SessionInsights sessions={sessions} currSession={currSession}/>
         {/* <ScrambleVisualizer currPuzzle={currPuzzle} currScramble={currScramble} /> */}
      </div>

    </div>
  );
}
export default App;
