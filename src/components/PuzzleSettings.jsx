import React, { useEffect } from "react";
import "./PuzzleSettings.css";
import { randomScrambleForEvent } from "https://cdn.cubing.net/js/cubing/scramble";
import {puzzleOptions} from "./PuzzleOptions";
export default function PuzzleSettings({
  currPuzzle,
  setCurrPuzzle
}) {

  return (
    <div className="scrambleArea container-fluid">
      <select name="" id="" value={currPuzzle} onChange={(e)=>
        setCurrPuzzle(e.target.value)
    }
        >
        <option value="3x3x3">3x3x3</option>
        {console.log(puzzleOptions[currPuzzle])}
        <option value="custom">custom</option>
        <option value="2x2x2">2x2x2</option>
        <option value="4x4x4">4x4x4</option>
        <option value="5x5x5">5x5x5</option>
        <option value="6x6x6">6x6x6</option>
        <option value="7x7x7">7x7x7</option>
        <option value="megaminx">megaminx</option>
        <option value="pyraminx">pyraminx</option>
        <option value="square1">square1</option>
        <option value="clock">clock</option>
        <option value="skewb">skewb</option>
        <option value="gigaminx">gigaminx</option>
        <option value="master_tetraminx">master_tetraminx</option>
        <option value="kilominx">kilominx</option>
      </select>
    </div>
  );
}
