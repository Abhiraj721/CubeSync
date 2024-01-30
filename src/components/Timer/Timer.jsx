import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./Timer.css";
import Scramble from "../Scramble/Scramble";
import { FormatTime, timeStrToInt } from "../Data/FormetTime";

function Timer(
  {
    currScramble,
    setCurrScramble,
    isRunning,
    setIsRunning,
    currPuzzle,
    setCurrPuzzle,
    currSession,
    setSession,
    isScramEditing,
    setIsScramEditing
  },
  ref
) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [holdTimeStart, setHoldTimeStart] = useState(null);
  const [handlePress, setHandlePress] = useState(false);
  const timerTextRef = useRef(null);
  const [inspectionCompleted, setInspectionCompleted] = useState(false);
  const [isInspectionPressed, setisInspectionPressed] = useState(false);
  const [inspectionTime, setInspectionTime] = useState(15);
  const [isInspectionRunning, setIsInspectionRunning] = useState(false);
  const [inspectionID,setInspectionID]=useState(null)
  const[inspection,setinspection]=useState(true)

  function helper() {
    setInspectionTime((prev) => {
      return prev - 1;
    });
  }

  const inspectionKeydown = (event) => {
    if (event.code === "Space" && inspectionCompleted === false && !isInspectionPressed) {
      // Use setTimeout instead of setInterval
      // Save the intervalId in state to clear it later
      if (event.code === "Space") event.preventDefault();
      setisInspectionPressed(true);
      setInspectionCompleted(false); // Reset the completion flag
    }
  };

  const inspectionKeyup = (event) => {
    if (event.code === "Space" && inspectionCompleted === false  ) {
      const intervalId = setInterval(helper, 1000);
      setIsInspectionRunning(true)
      setInspectionID(intervalId)
      if (event.code === "Space") event.preventDefault();

      setInspectionCompleted(true);
    }
  };


function clearInspectionInterval(){
  setIsInspectionRunning(false)
  clearInterval(inspectionID);
}
  const handleKeyDown = (event) => {
    if( inspection && event.code === "Space" && !inspectionCompleted){   
      event.preventDefault();
      return
    }
    if (event.code === "Space" && !isRunning && !isScramEditing ) {
      if (timerTextRef.current) timerTextRef.current.style.color = "orange";
      setHoldTimeStart(Date.now());
      if (event.code === "Space") event.preventDefault();
      if (event.code === "Space") setHandlePress(true);
    } else if (event.code === "Space" && timeStrToInt(timerTextRef.current.innerText) > 10 ) {
      saveSolveTime();
      setIsRunning(false);
    }
    if (event.code === "Space" && !isScramEditing) event.preventDefault();
  };

  const handleKeyUp = (event) => {
    if( inspection && event.code === "Space" && !inspectionCompleted){   
      event.preventDefault();
      return
    }
    if (event.code === "Space" && handlePress) {
      const holdtime = Date.now() - holdTimeStart;
      setHandlePress(false);
      if (holdtime > 200) {
        if (isRunning) {
          setIsRunning(false);

          setElapsedTime(Date.now() - startTime);
        } else {
          clearInspectionInterval()
          if (timerTextRef.current) timerTextRef.current.style.color = "black";

          setStartTime(Date.now());
          // setElapsedTime(0);
          setIsRunning(true);
        }
      } else {
        if (timerTextRef.current) timerTextRef.current.style.color = "black";

      }
    }
    else if(event.code === "Space" && !handlePress){
      console.log(inspectionCompleted)
      resetInspectionParams();
    }


    function resetInspectionParams() {
      setInspectionCompleted(false);
      setInspectionTime(15);
      setisInspectionPressed(false);
      setIsInspectionRunning(false);
    }
  };

  const handleMouseDown = () => {
    if (!isScramEditing && isRunning) {
      setIsRunning(false);
      saveSolveTime();
    } else {
      setHoldTimeStart(Date.now());
      setHandlePress(true);
      timerTextRef.current.style.color = "pink";
    }
  };

  const handleMouseUp = () => {
    if (holdTimeStart && handlePress) {
      const holdtime = Date.now() - holdTimeStart;
      setHandlePress(false);
      if (holdtime > 200) {
        if (isRunning) {
          setIsRunning(false);
          setElapsedTime(Date.now() - startTime);
        } else {
          if (timerTextRef.current) timerTextRef.current.style.color = "black";
          setStartTime(Date.now());
          // setElapsedTime(0);
          setIsRunning(true);
        }
      } else {
        if (timerTextRef.current) timerTextRef.current.style.color = "black";
      }

      setHoldTimeStart(null);
    }
  };

  useImperativeHandle(ref, () => ({
    handleTouchStart(event) {
      handleMouseDown();
      if (event.code === "Space") event.preventDefault(); // Prevent default touch behavior
    },
    handleTouchEnd(event) {
      handleMouseUp();
      if (event.code === "Space") event.preventDefault(); // Prevent default touch behavior
    },
  }));

  const saveSolveTime = () => {
    const solveTimeMilli = timeStrToInt(timerTextRef.current.innerText);

    const sessions = JSON.parse(localStorage.getItem("sessions"));
    console.log(sessions);

    const updatedSessions = sessions.map((session) => {
      if (session.id === currSession) {
        const newSolve = {
          sno: session.solves.length + 1,
          solveTime: timerTextRef.current.innerText,
          solveTimeInt: solveTimeMilli,
          scramble: currScramble, // Assuming currScramble is a string
          puzzle: currPuzzle, // Assuming currPuzzle is a string
          date: new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }),
          isPlus2: false,
          isDNF: false,
          notes: ""
        };

        // Add the new solve to the front of the solves array
        const solvesArray = [newSolve, ...session.solves];

        // Update the session with the new solves array
        return { ...session, solves: solvesArray };
      }
      return session;
    });

    setSession(updatedSessions);
    localStorage.setItem("sessions", JSON.stringify(updatedSessions));
  };

  useEffect(() => {
  if(inspection){    document.addEventListener("keydown", inspectionKeydown);
    document.addEventListener("keyup", inspectionKeyup);
}
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    // document.addEventListener("mousedown", handleMouseDown);
    // document.addEventListener("mouseup", handleMouseUp);
    // document.addEventListener("touchstart", handleTouchStart);
    // document.addEventListener("touchend", handleTouchEnd);
    return () => {
      if(inspection){ 
      document.removeEventListener("keydown", inspectionKeydown);
      document.removeEventListener("keyup", inspectionKeyup);
      }
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      // document.removeEventListener("mousedown", handleMouseDown);
      // document.removeEventListener("mouseup", handleMouseUp);
      // document.removeEventListener("touchstart", handleTouchStart);
      // document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isRunning, startTime, handlePress, isScramEditing, inspectionCompleted, isInspectionPressed]);

  useEffect(() => {
    let requestId;

    if (isRunning) {
      const updateElapsedTime = () => {
        setElapsedTime(Date.now() - startTime);
        requestId = requestAnimationFrame(updateElapsedTime);
      };
      requestId = requestAnimationFrame(updateElapsedTime);
    }

    return () => cancelAnimationFrame(requestId);
  }, [isRunning, startTime]);

  // const reset = () => {
  //   setIsRunning(false);
  //   setElapsedTime(0);
  // };

  return (
    <div className="timer">
      <Scramble
        currScramble={currScramble}
        setCurrScramble={setCurrScramble}
        isRunning={isRunning}
        currPuzzle={currPuzzle}
        setCurrPuzzle={setCurrPuzzle}
        isScramEditing={isScramEditing}
        setIsScramEditing={setIsScramEditing}
      ></Scramble>
      <p ref={timerTextRef} className="timerText">
        {isInspectionRunning ? inspectionTime : FormatTime(elapsedTime)}
      </p>

      <br />
    </div>
  );
}

export default forwardRef(Timer);
