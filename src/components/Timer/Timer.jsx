import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./Timer.css";
import Scramble from "../Scramble/Scramble";
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
  },
  ref
) {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [holdTimeStart, setHoldTimeStart] = useState(null);
  const [handlePress, setHandlePress] = useState(false);
  const timerTextRef = useRef(null);

  const handleKeyDown = (event) => {

    if (event.code === "Space" && !isRunning) {
      if (timerTextRef.current) timerTextRef.current.style.color = "orange";
      setHoldTimeStart(Date.now());
      if (event.code === "Space") event.preventDefault();
      if (event.code === "Space") setHandlePress(true);
    } else if(event.code === "Space") {
      saveSolveTime();
      setIsRunning(false);
      if (event.code === "Space") event.preventDefault();
    }
  };

  const handleKeyUp = (event) => {
    if (event.code === "Space" && handlePress) {
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
    }
  };

  const handleMouseDown = () => {
    if (isRunning) {
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
  const timeStrToInt = (formattedTime) => {
    const parts = formattedTime.split(":");
    let totalMilliseconds = 0;
  
    // Extract hours, minutes, seconds, and milliseconds from the formatted string
    if (parts.length === 4) {
      // Format: HH:MM:SS:SS
      totalMilliseconds +=
        parseInt(parts[0]) * 60 * 60 * 1000 + // hours
        parseInt(parts[1]) * 60 * 1000 + // minutes
        parseInt(parts[2]) * 1000 + // seconds
        parseInt(parts[3]) * 10; // milliseconds
    } else if (parts.length === 3) {
      // Format: MM:SS:SS
      totalMilliseconds +=
        parseInt(parts[0]) * 60 * 1000 + // minutes
        parseInt(parts[1]) * 1000 + // seconds
        parseInt(parts[2]) * 10; // milliseconds
    } else if (parts.length === 2) {
      // Format: SS:SS
      totalMilliseconds +=
        parseInt(parts[0]) * 1000 + // seconds
        parseInt(parts[1]) * 10; // milliseconds
    } else {
      // Invalid format
      throw new Error("Invalid time format");
    }
  
    return totalMilliseconds;
  };
  
  
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
          date: new Date().toISOString(),
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
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    // document.addEventListener("mousedown", handleMouseDown);
    // document.addEventListener("mouseup", handleMouseUp);
    // document.addEventListener("touchstart", handleTouchStart);
    // document.addEventListener("touchend", handleTouchEnd);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      // document.removeEventListener("mousedown", handleMouseDown);
      // document.removeEventListener("mouseup", handleMouseUp);
      // document.removeEventListener("touchstart", handleTouchStart);
      // document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isRunning, startTime, handlePress]);

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
  const formatTime = (time) => {
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const pad = (value) => (value < 10 ? `0${value}` : value);

    return `${hours !== 0 ? pad(hours) + ":" : ""}${
      minutes !== 0 ? pad(minutes) + ":" : ""
    }${pad(seconds)}:${pad(milliseconds)}`;
  };

  return (
    <div className="timer">
      <Scramble
        currScramble={currScramble}
        setCurrScramble={setCurrScramble}
        isRunning={isRunning}
        currPuzzle={currPuzzle}
        setCurrPuzzle={setCurrPuzzle}
      ></Scramble>
      {/* {console.log(elapsedTime)} */}
      <p ref={timerTextRef} className="timerText">
        {formatTime(elapsedTime)}
      </p>

      <br />
    </div>
  );
}

export default forwardRef(Timer);
