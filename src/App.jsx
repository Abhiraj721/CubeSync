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
  const [currPuzzle, setCurrPuzzle] = useState("3x3x3");
  const [currSession, setCurrsession] = useState("");
  const [sessions, setSession] = useState([]);
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  const [isScramEditing, setIsScramEditing] = useState(false); ///for checking wheather scramble is curretly in edit mode or not
  const [layout, setLayout] = useState({
    dashboard_1: "solves",
    dashboard_2: "stats",
  });
  const [scrambleDimension,setScrambleDimension]=useState("2D")

  const stats = (
    <SessionInsights sessions={sessions} setSession={setSession} currSession={currSession} />
  );

  const solves = (
    <Solves
      sessions={sessions}
      setSession={setSession}
      currSession={currSession}
      setCurrPuzzle={setCurrPuzzle}
      solvesArr={currSessionsSolves}
    />
  );
  const scramble =<> <ScrambleVisualizer visualDimension={scrambleDimension} currPuzzle={currPuzzle} currScramble={currScramble} /> <button onClick={()=>toggleScrambleDimension(scrambleDimension)} className="toggleScrambleDimension">{scrambleDimension}</button></>;
    function toggleScrambleDimension(currDimension){
      if(currDimension=="2D"){
      setScrambleDimension("3D")
      }
      else setScrambleDimension("2D")
    }
 

  const touchRef = useRef(null);

  useEffect(() => {
    const sessions = localStorage.getItem("sessions");
    if (sessions == null) {
      const sessions = [
        {
          id: "session_1",
          puzzleType: currPuzzle,
          pb: "",
          ao5Pb: "",
          ao5PbSolves: [],
          ao12Pb: "",
          ao12PbSolves: [],
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
    setSession(sessions);
  }, []);

  useEffect(() => {
    if (sessions != null) {
      sessions.forEach((session, index) => {
        if (session.id === currSession) {
          const solves = session.solves;
          if (solves.length > 0 && solves[0].sno === 1) solves.reverse();
          setCurrSessionsSolves(solves);
          setCurrPuzzle(session.puzzleType);
        }
      });
    }
  }, [sessions, currSession]);

  const dashboardComponent = (dashboardType) => {
    if (dashboardType === "solves") return solves;
    if (dashboardType === "stats") return stats;
    if (dashboardType === "scramble") return scramble;
    return stats;
  };

  return (
    <div className="App row">
      <div className="col col-lg-2 col-md-1 col-12" style={{ padding: 0 }}>
        {window.innerWidth <= 767 ? <MobileNavbar /> : <Navbar />}
      </div>

      <div className="col col-lg-7 col-md-7 col-12" style={{ padding: 0 }}>
        <div className="timerPlayGround" style={{ width: "100%" }}>
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
            isScramEditing={isScramEditing}
            setIsScramEditing={setIsScramEditing}
            ref={touchRef}
          />
        </div>
      </div>

      <div className="col col-lg-3 col-md-4 col-12" style={{ padding: 0 }}>
        <div className="dashboard_1">
          <div className="dashboardSelect">
          <select
            name=""
            id=""
            onChange={(e) =>
              setLayout((prevLayout) => {
                prevLayout.dashboard_1 = e.target.value;
                return { ...prevLayout };
              })
            }
          >
            <option value="stats">Stats</option>
            <option value="solves">Solves</option>
            <option value="scramble">Scramble</option>

          </select>
          </div>
          {dashboardComponent(layout.dashboard_1)}
        </div>

        <div className="dashboard_2">
        <div className="dashboardSelect">

          <select
            name=""
            id=""
            onChange={(e) =>
              setLayout((prevLayout) => {
                prevLayout.dashboard_2 = e.target.value;
                return { ...prevLayout };
              })
            }
          >
            <option value="stats">Stats</option>
            <option value="solves">Solves</option>
            <option value="scramble">Scramble</option>

          </select>
        </div>

          {dashboardComponent(layout.dashboard_2)}
        </div>
      </div>
    </div>
  );
}

export default App;
