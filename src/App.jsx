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
import DashboardSelect from "./components/DashboardSelect/DashboardSelect";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import { Routes, Route, Link, Router } from "react-router-dom";
import Settings from "./components/Settings/Settings";
import intialSettings from "./components/Data/DefaultSettings";
function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [currScramble, setCurrScramble] = useState("");
  const [currPuzzle, setCurrPuzzle] = useState("3x3x3");
  const [currSession, setCurrsession] = useState("");
  const [sessions, setSession] = useState([]);
  const [settings, setSettings] = useState(intialSettings);
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  const [isScramEditing, setIsScramEditing] = useState(false); ///for checking wheather scramble is curretly in edit mode or not
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [scrambleDimension, setScrambleDimension] = useState("2D");
  const [isFooterdashboardVisible, setisFooterdashboardVisible] =
    useState(false);
  const touchRef = useRef(null);
  const toogleFooterDashboard = () => {
    setisFooterdashboardVisible(!isFooterdashboardVisible);
  };
  const stats = (
    <SessionInsights
      sessions={sessions}
      setSession={setSession}
      currSession={currSession}
    />
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
  const scramble = (
    <>
      {" "}
      <ScrambleVisualizer
        visualDimension={scrambleDimension}
        currPuzzle={currPuzzle}
        currScramble={currScramble}
      />{" "}
      <button
        onClick={() => toggleScrambleDimension(scrambleDimension)}
        className="toggleScrambleDimension"
      >
        {scrambleDimension}
      </button>
    </>
  );
  function toggleScrambleDimension(currDimension) {
    if (currDimension == "2D") {
      setScrambleDimension("3D");
    } else setScrambleDimension("2D");
  }
  ///settings setup
  useEffect(() => {
    const currSettings = localStorage.getItem("settings");

    if (currSettings === null) {
      localStorage.setItem("settings", JSON.stringify(intialSettings));
    } else {
      console.log(currSettings);
      setSettings(JSON.parse(currSettings));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
//session setup
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

  useLayoutEffect(() => {
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
  };
  const toggleFooter = () => {
    setIsFooterVisible(!isFooterVisible);
  };
  return (
    <div className="App row">
      <div className="col col-lg-2 col-md-1 col-12" style={{ padding: 0 }}>
        {window.innerWidth <= 767 ? <MobileNavbar /> : <Navbar />}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                className="col col-lg-7 col-md-7 col-12"
                style={{ padding: 0 }}
              >
            
                <div
                  className="timerPlayGround"
                  style={{ width: "100%" }}
                  onTouchStart={(event) =>{
                    if(!event.target.closest('.alterScramBtn') && !event.target.closest('.scrambleArea') ){
                    touchRef.current.handleTouchStart(event)
                    }
                    
                  }}
                  onTouchEnd={(event) => {
                    if(!event.target.closest('.alterScramBtn') && !event.target.closest('.scrambleArea') ){
                    touchRef.current.handleTouchEnd(event)
                    }
                  }}
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
                    isScramEditing={isScramEditing}
                    setIsScramEditing={setIsScramEditing}
                    settings={settings}
                    ref={touchRef}
                  />
                </div>
              </div>

              <div
                className="col col-lg-3 col-md-4 col-12"
                style={{ padding: 0 }}
              >
                {window.innerWidth >= 767 ? (
                  <>
                    <DashboardSelect
                      dashboardComponent={dashboardComponent}
                      intialDashboard={"scramble"}
                    />
                    <DashboardSelect
                      dashboardComponent={dashboardComponent}
                      intialDashboard={"solves"}
                    />
                  </>
                ) : (
                  ""
                )}
                {window.innerWidth <= 767 && (
                  <div className="fixed-bottom bg-dark p-2">
                    <Button variant="secondary" onClick={toogleFooterDashboard}>
                      Toggle Content
                    </Button>
                    <Collapse in={isFooterdashboardVisible}>
                      <div>
                        <DashboardSelect
                          dashboardComponent={dashboardComponent}
                          intialDashboard={"solves"}
                          dashboardHeight="30vh"
                        />
                      </div>
                    </Collapse>
                  </div>
                )}
              </div>
            </>
          }
        />
        <Route
          path="/settings"
          element={<Settings settings={settings} setSettings={setSettings} />}
        />
      </Routes>
    </div>
  );
}

export default App;
