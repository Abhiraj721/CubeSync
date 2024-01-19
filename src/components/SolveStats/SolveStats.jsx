import React, { useEffect, useState } from "react";
import "./SolveStats.css";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copy from "copy-text-to-clipboard";

export default function SolveStats({ solves }) {
  // const [isDate,setIsDate]=useState(false)
  // const [isScramble,setIsScramble]=useState(true)
  // const [isPuzzleType,setIsPuzzleType]=useState(false)
  const [statsOptions,setStatsOptions]=useState([
  {
    Name:"Scramble",
    Active:"true"
  },
  {
   Name:"Date",
 Active:"false"
  },
  {
    Name:"Puzzle Type",
    Active:"false"
  },
])
 

  useEffect(() => {
    // Add any necessary logic inside useEffect
  }, []); // Empty dependency array to run the effect only once

  const formatSolvesForCopy = () => {
    const maxLengths = {
      time: solves.reduce(
        (max, solve) => Math.max(max, solve.solveTime.length),
        0
      ),
      scramble: solves.reduce(
        (max, solve) => Math.max(max, solve.scramble.length),
        0
      ),
      date: solves.reduce((max, solve) => Math.max(max, solve.date.length), 0),
    };

    return solves
      .map((solve) => {
        const timePadding = " ".repeat(
          maxLengths.time - solve.solveTime.length + 2
        );
        const scramblePadding = " ".repeat(
          maxLengths.scramble - solve.scramble.length + 2
        );
        const datePadding = " ".repeat(maxLengths.date - solve.date.length + 2);

        return `${solve.solveTime}${timePadding}${solve.scramble}${scramblePadding}${solve.date}${datePadding}`;
      })
      .join("\n");
  };

  const handleCopyText = () => {
    const formattedText = formatSolvesForCopy();
    copy(formattedText);
  };

  return (
    <div className="solveStatscontainer">
      <div className="ChooseStatsFleids">
   {   statsOptions.map((option)=>{
        return <div className="checkbox-wrapper-15  statsOptions">
        <input className="inp-cbx" id="cbx-15" type="checkbox" style={{ display: 'none' }} />
        <label className="cbx" htmlFor="cbx-15">
          <span>
            <svg width="12px" height="9px" viewBox="0 0 12 9">
              <polyline points="1 5 4 8 11 1"></polyline>
            </svg>
          </span>
          <span>{option.Name}</span>
        </label>
      </div>
      
      })}
      </div>
      <div className="text-slider">
        <button className="copySolveBtn" onClick={handleCopyText}>
          <FontAwesomeIcon icon={faCopy} />
        </button>
        <div className="solveStatsWrap">
          <table className="statsTable">
            <thead>
              <tr>
                <th>Sno</th>
                <th>Time</th>
                <th>Scramble</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {solves.map((solve, index) => (
                <tr key={index} className="statsSolve">
                  <td>{solves.length - index}</td>
                  <td>{solve.solveTime}</td>
                  <td>{solve.scramble}</td>
                  <td>{solve.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
