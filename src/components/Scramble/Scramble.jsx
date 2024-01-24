import React, { useState, useEffect, useRef } from "react";
import { puzzleOptions, scrambleFontSize } from "../Data/PuzzleOptions";
import { isMobile, isWindows } from "mobile-device-detect";
import { faEdit, faCopy, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copy from "copy-text-to-clipboard";
import "./Scramble.css";
import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";

export default function Scramble({
  currScramble,
  setCurrScramble,
  isRunning,
  currPuzzle,
  setCurrPuzzle,
  isScramEditing,
  setIsScramEditing,
}) {
  const scrambleTextRef = useRef(null);

  async function getScramble() {
    const scramble = await randomScrambleForEvent(puzzleOptions[currPuzzle]);
    setCurrScramble(scramble.toString());
  }
  useEffect(() => {
    if (!isRunning) getScramble();
  }, [isRunning, currPuzzle]);

  useEffect(() => {
    if (scrambleTextRef.current) {
      scrambleTextRef.current.style.fontSize = `${scrambleFontSize[currPuzzle]}px`;
    }
    if (isWindows && scrambleTextRef.current) {
      switch (currPuzzle) {
        case "5x5x5":
        case "6x6x6":
        case "7x7x7":
        case "megaminx":
          scrambleTextRef.current.style.fontSize = "20px";
          break;
        case "4x4x4":
          scrambleTextRef.current.style.fontSize = "24px";
          break;
        default:
          scrambleTextRef.current.style.fontSize = "30px"; // Default font size
          break;
      }
    }
  }, [currPuzzle,isScramEditing]);

  const handleScrambleChange = () => {
    const inputElement = scrambleTextRef.current;
    const userInput = inputElement.value.trim();
    setCurrScramble(userInput);
  };
useEffect(()=>{
  if(isScramEditing)scrambleTextRef.current.focus()
},[isScramEditing])
  return (
    <div className="scramblePlayround">
    { !isScramEditing ? <p ref={scrambleTextRef} className="scrambleText">
        {currScramble}
      </p>
      :
      <textarea
  
        ref={scrambleTextRef}
        value={currScramble}
        onChange={handleScrambleChange}
        readOnly={!isScramEditing}
        className="scrambleTextInput"
      />}
      <div className="alterScramble">
        <button className="alterScramBtn" onClick={() => copy(currScramble)}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <button
          className="alterScramBtn"
          onClick={() => setIsScramEditing(!isScramEditing)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="alterScramBtn" onClick={() => getScramble()}>
          <FontAwesomeIcon icon={faRefresh} />
        </button>
      </div>
      {console.log(isScramEditing)}
    </div>
  );
}
