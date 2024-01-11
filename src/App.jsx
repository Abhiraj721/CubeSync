import "./App.css";
import { useState } from "react";
import Timer from "./components/Timer";
import PuzzleSettings from "./components/PuzzleSettings";
import ScrambleVisualizer from "./components/ScrambleVisualizer";
import Navbar from "./components/Navbar";
import { isMobile, isTablet } from "mobile-device-detect";
import MobileNavbar from "./components/MobileNavbar";
function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [currScramble, setCurrScramble] = useState("");
  const [currPuzzle, setCurrPuzzle] = useState("3x3x3");

  return (
    <div className="App row">
      {console.log(isMobile)}
      <div className="col col-lg-2 col-md-1 col-sm-12" style={{padding: 0 }}>
   {   isMobile ?<MobileNavbar/>:<Navbar />}
      </div>
      {console.log(isTablet)}
      <div className="col col-lg-8 col-md-8 col-12" style={{ padding: 0 }}>
        {/* Content of the middle column */}
        <div className="timerPlayGround" style={{ width: "100%" }}>
          <PuzzleSettings
            currScramble={currScramble}
            setCurrScramble={setCurrScramble}
            isRunning={isRunning}
            currPuzzle={currPuzzle}
            setCurrPuzzle={setCurrPuzzle}
          />
          <Timer
            currScramble={currScramble}
            setCurrScramble={setCurrScramble}
            isRunning={isRunning}
            setIsRunning={setIsRunning}
            currPuzzle={currPuzzle}
            setCurrPuzzle={setCurrPuzzle}
          />
        </div>
      </div>
      <div className="col col-lg-2 col-md-3 col-sm-12" style={{ padding: 0 }}></div>

      <ScrambleVisualizer currPuzzle={currPuzzle} currScramble={currScramble} />
    </div>
  );
}

export default App;
