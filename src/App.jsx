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
import { intialSettings, styleInfo } from "./components/Data/DefaultSettings";
import { useLocation } from "react-router-dom";
import Trainer from "./components/Trainer/Trainer";
import { puzzles, methodOptions } from "./components/Trainer/utility/AlgoInfo";
import Stats from "./components/Stats/Stats";
import { defaultStats } from "./components/Stats/utility/StatsInfo";
import Chatbot from "./components/Chatbot/Chatbot";

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [currScramble, setCurrScramble] = useState("");
  const [currPuzzle, setCurrPuzzle] = useState("3x3x3");
  const [currSession, setCurrsession] = useState("");
  const [sessions, setSession] = useState([        {
    id: "session_1",
    puzzleType: currPuzzle,
    pb: "",
    ao5Pb: "",
    ao5PbSolves: [],
    ao12Pb: "",
    ao12PbSolves: [],
    solves: [],
  }]);
  const [settings, setSettings] = useState(getSettings());
  const [stats, setStats] = useState(getstats());
  const [currSessionsSolves, setCurrSessionsSolves] = useState([]);
  const [isScramEditing, setIsScramEditing] = useState(false); ///for checking wheather scramble is curretly in edit mode or not
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [scrambleDimension, setScrambleDimension] = useState("2D");

  const [isFooterdashboardVisible, setisFooterdashboardVisible] =
    useState(false);
  const touchRef = useRef(null);
  function getstats() {
    const currStats = JSON.parse(localStorage.getItem("stats"));
    if (currStats === null) return defaultStats;
    else return currStats;
  }
  function getSettings() {
    const currSettings = JSON.parse(localStorage.getItem("settings"));
    if (currSettings === null) return intialSettings;
    else return currSettings;
  }
  const toogleFooterDashboard = () => {
    setisFooterdashboardVisible(!isFooterdashboardVisible);
  };
  const insights = (
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
      settings={settings}
    />
  );
  const location = useLocation();
  useEffect(() => {
    applyCustomStyles();
  }, [location]);
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
    } else setScrambleDimension("3D");
  }
  ///settings setup
  useEffect(() => {
    //uptading theme
    styleInfo.forEach((style) => {
      applyCustomStyles();
    });
  }, [settings.themeSettings]);
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    localStorage.setItem("stats", JSON.stringify(stats));
  }, [stats]);
  useEffect(() => {
    settingsSetUp();
    sessionsSetUp();
    statsSetUp();
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
    if (dashboardType === "insights") return insights;
    if (dashboardType === "scramble") return scramble;
  };
  const toggleFooter = () => {
    setIsFooterVisible(!isFooterVisible);
  };
  function sessionsSetUp() {
    const currSessions = localStorage.getItem("sessions");
    if (currSessions == null) {
      localStorage.setItem("sessions", JSON.stringify(sessions));
      localStorage.setItem("currSession", "session_1");
      setCurrsession("session_1");
    } else {
      setCurrsession(localStorage.getItem("currSession"));
    }
  }
  function statsSetUp() {
    const currStats = localStorage.getItem("stats");
    if (currStats === null) {
      localStorage.setItem("stats", JSON.stringify(defaultStats));
    } else {
      setStats(JSON.parse(currStats));

    }
  }

  function settingsSetUp() {
    const currSettings = localStorage.getItem("settings");

    if (currSettings === null) {
      localStorage.setItem("settings", JSON.stringify(intialSettings));
    } else {
      console.log(currSettings);
      setSettings(JSON.parse(currSettings));
    }
  }

  function applyCustomStyles() {
    backgroundImageToNull();
    styleInfo.forEach((style) => {
      if (style.nameOfClass == "body") {
        document.body.style[style.styleName] =
          settings.themeSettings[style.settingName];
      } else {
        const test = document.querySelectorAll("." + style.nameOfClass);
        let styleValue = settings.themeSettings[style.settingName];
        if (style.styleName == "backgroundImage") {
          console.log(settings.themeSettings.backgroundType);
          if (settings.themeSettings.backgroundType != "image upload") {
            styleValue = "url(" + styleValue + ")";
          }
        }
        test.forEach((element) => {
          element.style[style.styleName] = styleValue;
        });
      }
    });
  }

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
                  onTouchStart={(event) => {
                    if (
                      !event.target.closest(".alterScramBtn") &&
                      !event.target.closest(".scrambleArea")
                    ) {
                      touchRef.current.handleTouchStart(event);
                    }
                  }}
                  onTouchEnd={(event) => {
                    if (
                      !event.target.closest(".alterScramBtn") &&
                      !event.target.closest(".scrambleArea")
                    ) {
                      touchRef.current.handleTouchEnd(event);
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
                    stats={stats}
                    setStats={setStats}
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
          element={<Settings settings={settings} setSettings={setSettings} sessions={sessions} setSessions={setSession} />}
        />
        <Route path="/stats" element={<Stats stats={stats} sessions={sessions} />} />

        <Route path="/assistant" element={<Chatbot />} />
        {/* <Route path="/trainer/3x3x3/OLL" element={<Trainer/>} /> */}
        {puzzles.map((puzzle) => {
          return methodOptions[puzzle].map((method) => {
            console.log(puzzle + " " + method);
            return (
              <Route
                path={`/trainer/${puzzle}/${method}`}
                element={<Trainer puzzle={puzzle} method={method} />}
              />
            );
          });
        })}
      </Routes>
    </div>
  );

  function backgroundImageToNull() {
    if (
      settings.themeSettings.backgroundType == "none" &&
      settings.themeSettings.backgroundImageUrl != ""
    ) {
      settings.themeSettings.backgroundImageUrl = "";
    }
  }
}

export default App;
