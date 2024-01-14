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
    setSession
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
    } else {
      console.log(Date.now()-startTime)
      setIsRunning(false);
      saveSolveTime()
      if (event.code === "Space") event.preventDefault();
    }
  };

  const handleKeyUp = (event) => {
    if (event.code === "Space" && handlePress) {
      const holdtime = Date.now() - holdTimeStart;
      setHandlePress(false);

      if (holdtime > 400) {
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
      console.log(elapsedTime)
      setIsRunning(false);
      saveSolveTime()
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
const saveSolveTime=()=>{
  console.log(elapsedTime)
  // { solveTime: 12000, scramble: 'R U' ,puzzle:'3x3x3',  date: new Date().toISOString()},
  const sessions=JSON.parse(localStorage.getItem("sessions"))
  console.log(sessions)
  sessions.map((session,index)=>{
    if(session.id===currSession){
      session.solves.push({sno:session.solves.length+1, solveTime: timerTextRef.current.innerText, scramble: {currScramble} ,puzzle:{currPuzzle},  date: new Date().toISOString()})
      setSession(sessions)
      localStorage.setItem("sessions",JSON.stringify(sessions))
    }
  })

}
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

    return `${(hours !== 0) ? pad(hours) + ":" : ""}${(minutes !== 0) ? pad(minutes) + ":" : ""}${pad(seconds)}:${pad(milliseconds)}`;
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
      <p ref={timerTextRef} className="timerText">
        {formatTime(elapsedTime)}
      </p>
     
      <br />
    </div>
  );
}

export default forwardRef(Timer);
