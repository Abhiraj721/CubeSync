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
import ScrambleVisualizer from "../ScrambleVisualizer/ScrambleVisualizer";
import isAlertOpened from "../Data/CheckForAlert";
import eight_seconds_male from "../../utility/InspectionVoices/eight_seconds_male.wav";
import twelve_seconds_male from "../../utility/InspectionVoices/twelve_seconds_male.wav";
import eight_seconds_female from "../../utility/InspectionVoices/eight_seconds_female.wav";
import twelve_seconds_female from "../../utility/InspectionVoices/twelve_seconds_female.wav";
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
    setIsScramEditing,
    settings,
    stats,
    setStats,
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
  const [inspectionID, setInspectionID] = useState(null);
  const [inspection, setinspection] = useState(true);
  const [inspectionVoiceAlerts, setInspectionVoiceAlerts] = useState("male");
  const [inspectionElapsed, setInspectionElpased] = useState(false);
  const [freezeTime, setFreezeTime] = useState(0.4 * 1000);
  const [hideTimer, sethideTimer] = useState(false);
  function decrementInspectionTimer() {
    setInspectionTime((prev) => {
      return prev - 1;
    });
  }
  useEffect(() => {
    setinspection(settings.timerSettings.isInspectionEnabled);
    setFreezeTime(settings.timerSettings.freezeTime * 1000);
    sethideTimer(settings.timerSettings.hideTimer);
    setInspectionTime(settings.timerSettings.inspectionTime);
    setInspectionVoiceAlerts(settings.timerSettings.inspectionVoiceAlerts);
  }, [settings]);

  useEffect(() => {
    if (inspectionTime === 0) {
      setInspectionElpased("+2");
    } else if (inspectionTime === -2) {
      setInspectionElpased("DNF");
    }
  }, [inspectionTime]);

  useEffect(() => {
    ///playing alert sounds of 8 and 12 seconds
    let audioFile;
    let timeInSeconds;

    if (inspectionVoiceAlerts != "none") {
      if (inspectionTime === 8) {
        console.log(inspectionTime);
        audioFile =
          inspectionVoiceAlerts === "male"
            ? eight_seconds_male
            : eight_seconds_female;
        timeInSeconds = 8;
      } else if (inspectionTime === 3) {
        audioFile =
          inspectionVoiceAlerts === "male"
            ? twelve_seconds_male
            : twelve_seconds_female;
        timeInSeconds = 3;
      }

      if (audioFile && timeInSeconds) {
        playAudio(audioFile);
      }
    }
    function playAudio(audioFile) {
      let voiceAlert = new Audio(audioFile);
      voiceAlert.play();
    }
  }, [inspectionTime]);

  const inspectionKeydown = (event) => {
    if (
      (event.code === "Space" || event === "touch") &&
      inspectionCompleted === false &&
      !isInspectionPressed &&
      !isScramEditing &&
      !isAlertOpened()
    ) {
      if (event.code === "Space") event.preventDefault();
      setisInspectionPressed(true);
      setInspectionCompleted(false); // Reset the completion flag
    }
  };

  const inspectionKeyup = (event) => {
    if (
      (event.code === "Space" || event == "touch") &&
      inspectionCompleted === false &&
      !isScramEditing &&
      !isAlertOpened()
    ) {
      const intervalId = setInterval(decrementInspectionTimer, 1000);
      setIsInspectionRunning(true);
      setInspectionID(intervalId);
      if (event.code === "Space") event.preventDefault();

      setInspectionCompleted(true);
    }
  };

  function clearInspectionInterval() {
    setIsInspectionRunning(false);
    clearInterval(inspectionID);
  }
  const handleKeyDown = (event) => {
    // if (inspection && !inspectionCompleted && !isScramEditing) {
    if (
      event.code === "Space" &&
      inspection &&
      !inspectionCompleted &&
      isScramEditing &&
      !isAlertOpened()
    ) {
      // event.preventDefault();
      return;
    }
    if (event.code === "Space" && !isRunning && !isScramEditing) {
      if (timerTextRef.current) timerTextRef.current.style.color = "orange";
      console.log("56565");
      setHoldTimeStart(Date.now());
      event.preventDefault();
      setHandlePress(true);
    } else if (event.code === "Space") {
      setIsRunning(false);
      setTimeout(saveSolveTime, 20); ///saving time after 20 milliseconds so that the accurate time will saved
    }
    if (event.code === "Space" && !isScramEditing) event.preventDefault();
  };

  const handleKeyUp = (event) => {
    if (
      inspection &&
      event.code === "Space" &&
      !inspectionCompleted &&
      !isAlertOpened()
    ) {
      event.preventDefault();
      return;
    }
    if (event.code === "Space" && handlePress) {
      const holdtime = Date.now() - holdTimeStart;
      setHandlePress(false);
      console.log(holdtime);
      if (holdtime > 400) {
        if (isRunning) {
          setIsRunning(false);

          setElapsedTime(Date.now() - startTime);
        } else {
          clearInspectionInterval();
          if (timerTextRef.current) timerTextRef.current.style.color = "black";

          setStartTime(Date.now());
          // setElapsedTime(0);
          setIsRunning(true);
        }
      } else {
        if (timerTextRef.current) timerTextRef.current.style.color = "black";
      }
    } else if (event.code === "Space" && !handlePress) {
      console.log(inspectionCompleted);
      resetInspectionParams();
    }
  };
  function resetInspectionParams() {
    setInspectionCompleted(false);
    setInspectionTime(15);
    setisInspectionPressed(false);
    setIsInspectionRunning(false);
    setInspectionElpased(false);
  }
  const handleMouseDown = () => {
    if (inspection && !inspectionCompleted && !isScramEditing) {
      return;
    }
    if (!isRunning && !isScramEditing) {
      if (timerTextRef.current) timerTextRef.current.style.color = "orange";
      setHoldTimeStart(Date.now());

      setHandlePress(true);
    } else {
      setIsRunning(false);
      setTimeout(saveSolveTime, 20); ///saving time after 220 milliseconds so that the accurate time will saved
    }
  };

  const handleMouseUp = () => {
    if (inspection && !inspectionCompleted) {
      return;
    }
    if (handlePress) {
      const holdtime = Date.now() - holdTimeStart;
      setHandlePress(false);
      if (holdtime > freezeTime) {
        if (isRunning) {
          setIsRunning(false);

          setElapsedTime(Date.now() - startTime);
        } else {
          clearInspectionInterval();
          if (timerTextRef.current) timerTextRef.current.style.color = "black";

          setStartTime(Date.now());
          // setElapsedTime(0);
          setIsRunning(true);
        }
      } else {
        if (timerTextRef.current) timerTextRef.current.style.color = "black";
      }
    } else if (!handlePress) {
      console.log(inspectionCompleted);
      resetInspectionParams();
    }
  };

  useImperativeHandle(ref, () => ({
    handleTouchStart(event) {
      if (isScramEditing) return;
      else if (inspection) inspectionKeydown("touch");
      handleMouseDown();
    },
    handleTouchEnd(event) {
      if (isScramEditing) return;
      else if (inspection) inspectionKeyup("touch");
      handleMouseUp();
    },
  }));
  function  handleActivity ()  {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    let dateAlreadyExist=false
  stats.activeDays.forEach((data, index) => {
    if (data.date === formattedDate) {
      dateAlreadyExist = true;
      setStats((prevState) => {
        const updatedStats = [...prevState.activeDays]; // Create a copy of activeDays array
        updatedStats[index] = { ...updatedStats[index], count: updatedStats[index].count + 1 }; // Update the count
        return { ...prevState, activeDays: updatedStats }; // Update the state
      });
    }
  });
    if(!dateAlreadyExist){
      let prevState=stats
      setStats((prevStats)=>({
        ...prevStats,
       activeDays :[...prevStats.activeDays,{ date: formattedDate, count: 1 }]
      }))

    }
  
  };
  const saveSolveTime = () => {


    let solveTimeStr = timerTextRef.current.innerText;
    const solveTimeMilli = timeStrToInt(timerTextRef.current.innerText);
    handleActivity();
    const sessions = JSON.parse(localStorage.getItem("sessions"));

    if (inspectionElapsed == "+2")
      solveTimeStr = FormatTime(solveTimeMilli + 2000);

    const updatedSessions = sessions.map((session) => {
      if (session.id === currSession) {
        const newSolve = {
          sno: session.solves.length + 1,
          solveTime: solveTimeStr,
          solveTimeInt: solveTimeMilli,
          scramble: currScramble, // Assuming currScramble is a string
          puzzle: currPuzzle, // Assuming currPuzzle is a string
          date: new Date().toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          isPlus2: inspectionElapsed == "+2" ? true : false,
          isDNF: inspectionElapsed == "DNF" ? true : false,
          notes: "",
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

    if (inspection) {
      document.addEventListener("keydown", inspectionKeydown);
      document.addEventListener("keyup", inspectionKeyup);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    // document.addEventListener("mousedown", handleMouseDown);
    // document.addEventListener("mouseup", handleMouseUp);
    // document.addEventListener("touchstart", handleTouchStart);
    // document.addEventListener("touchend", handleTouchEnd);
    return () => {
      if (inspection) {
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
  }, [
    isRunning,
    startTime,
    handlePress,
    isScramEditing,
    inspectionCompleted,
    isInspectionPressed,
  ]);

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
        {isInspectionRunning
          ? inspectionTime > 0
            ? inspectionTime
            : inspectionTime <= 0 && inspectionTime > -2
            ? "+2"
            : "DNF"
          : hideTimer && isRunning
          ? "solve"
          : FormatTime(elapsedTime)}
      </p>
      {/* <div className="smDeviceScramblevisuals">
        <ScrambleVisualizer
          currPuzzle={currPuzzle}
          currScramble={currScramble}
          visualDimension={"2D"}
          styles={{ height: "200px", width: "200px" }}
        />
      </div> */}
    </div>
  );
}

export default forwardRef(Timer);
