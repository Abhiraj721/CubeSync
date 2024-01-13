import "./App.css";
import { useState,useRef, useEffect,useLayoutEffect
 } from "react";
import Timer from "./components/Timer";
import PuzzleSettings from "./components/PuzzleSettings";
import ScrambleVisualizer from "./components/ScrambleVisualizer";
import Navbar from "./components/Navbar";
import { isMobile, isTablet } from "mobile-device-detect";
import MobileNavbar from "./components/MobileNavbar";
import Solves from "./components/Solves";
function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [currScramble, setCurrScramble] = useState("");
  const [currPuzzle, setCurrPuzzle] = useState("3x3x3");
  const [currSession,setCurrsession]=useState("session_3")
  const [sessions,setSession]=useState([])
  const touchRef = useRef(null);
  
  useEffect(()=>{
const sessions=localStorage.getItem("sessions")
if(sessions==null){
  const sessions= [
 {
    id: 'session_1',
    puzzleType: '3x3x3',
    solves: [],
  }
]
  localStorage.setItem("sessions",JSON.stringify(sessions))
  localStorage.setItem("currSession","session_1")
  setCurrsession("session_1")
}else{
  setCurrsession(localStorage.getItem("currSession"))
  console.log("sjsj")
}
},[])
useLayoutEffect(() => {
  const sessions = JSON.parse(localStorage.getItem("sessions"));
  console.log(sessions)
  setSession(sessions);
}, []);

  return (
    <div className="App row">
      <div className="col col-lg-2 col-md-1 col-12" style={{ padding: 0 }}>
        { window.innerWidth <= 767 ? <MobileNavbar /> : <Navbar />}
      </div>

      <div className="col col-lg-8 col-md-8 col-12" style={{ padding: 0 }}>
        {/* Content of the middle column */}
        <div className="timerPlayGround" style={{ width: "100%" }}    onTouchStart={(event)=>touchRef.current.handleTouchStart(event)}
      onTouchEnd={(event)=>touchRef.current.handleTouchEnd(event)}>
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

      <div className="col col-lg-2 col-md-3 col-12" style={{ padding: 0 }}>
        <Solves sessions={sessions} currSession={currSession}></Solves>
      </div>

      <ScrambleVisualizer currPuzzle={currPuzzle} currScramble={currScramble} />
    </div>
  );
  }
export default App;
