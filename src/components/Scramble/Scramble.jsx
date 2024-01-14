import React from "react";
import { useEffect } from "react";
import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";
import { puzzleOptions, scrambleFontSize } from "../Data/PuzzleOptions";
import { isBrowser, isMobile, isWindows } from "mobile-device-detect";
import "./Scramble.css";
export default function Scramble({
  currScramble,
  setCurrScramble,
  isRunning,
  currPuzzle,
  setCurrPuzzle,
}) {
  // const arr = [
  //   "333", "222", "444", "555", "666", "777", "minx", "pyram", "sq1", "clock", "skewb",
  // ];
  useEffect(() => {
    async function getScramble() {
      const scramble = await randomScrambleForEvent(puzzleOptions[currPuzzle]);
      setCurrScramble(scramble.toString());
    }
    if (!isRunning) getScramble();
  }, [isRunning, currPuzzle]);
  useEffect(() => {

    if (isMobile) {
        document.querySelector(".scrambleText").style.fontSize=`${scrambleFontSize[currPuzzle]}px`
    }
    if(isBrowser)
    {
        switch(currPuzzle){
            case '5x5x5':
            case '6x6x6':
            case '7x7x7':
            case 'megaminx':
                document.querySelector(".scrambleText").style.fontSize = '20px';
                break; 
            case '4x4x4': 
                document.querySelector(".scrambleText").style.fontSize = '24px';
                break;
            default:
                document.querySelector(".scrambleText").style.fontSize = '30px'; // Default font size
                break;     
        }
    }
  }, [currPuzzle]);

  return (
    <div className="scramblePlayround">
      <p className="scrambleText">{currScramble}</p>
    </div>
  );
}
