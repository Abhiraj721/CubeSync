import React, { useEffect, useState } from "react";
import "./SolveStats.css";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import copy from "copy-text-to-clipboard";

export default function SolveStats({ solves }) {
  const [isScrambleActive, setScrambleActive] = useState(true);
  const [isDateActive, setDateActive] = useState(false);
  const [isPuzzleTypeActive, setPuzzleTypeActive] = useState(false);
  const optionsArr = [
    { Name: "Scramble", isActive: isScrambleActive },
    { Name: "Date", isActive: isDateActive },
    { Name: "Puzzle Type", isActive: isPuzzleTypeActive },
  ];
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
        let formattedText = "";

        if (isScrambleActive) {
          const timePadding = " ".repeat(
            maxLengths.time - solve.solveTime.length + 2
          );
          formattedText += `${solve.solveTime}${timePadding}`;
        }

        if (isScrambleActive) {
          const scramblePadding = " ".repeat(
            maxLengths.scramble - solve.scramble.length + 2
          );
          formattedText += `${solve.scramble}${scramblePadding}`;
        }

        if (isDateActive) {
          const datePadding = " ".repeat(
            maxLengths.date - solve.date.length + 2
          );
          formattedText += `${solve.date}${datePadding}`;
        }
        if (isPuzzleTypeActive) {
          const datePadding = " ".repeat(
            maxLengths.date - solve.date.length + 2
          );
          formattedText += `${solve.puzzle}${datePadding}`;
        }

        return formattedText;
      })
      .join("\n");
  };

  const handleCheckboxChange = (option) => {
    switch (option) {
      case "Scramble":
        setScrambleActive(!isScrambleActive);
        break;
      case "Date":
        setDateActive(!isDateActive);
        break;
      case "Puzzle Type":
        setPuzzleTypeActive(!isPuzzleTypeActive);
        break;
      default:
        break;
    }
  };

  const handleCopyText = () => {
    const formattedText = formatSolvesForCopy();
    copy(formattedText);
  };

  return (
    <div className="solveStatscontainer">
      <div className="ChooseStatsFleids">
        {optionsArr.map((option, index) => (
          <div key={index} className="statsOptions">
            <input
              className="statsOptionInput"
              checked={option.isActive}
              onChange={() => handleCheckboxChange(option.Name)}
              id={`checkbox-${index}`}
              type="checkbox"
            />
            <label className="statsOptionLabel" htmlFor={`checkbox-${index}`}>
              {option.Name}
            </label>
          </div>
        ))}
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
                {<th>Time</th>}
                {isScrambleActive && <th>Scramble</th>}
                {isDateActive && <th>Date</th>}
                {isPuzzleTypeActive && <th>Puzzle Type</th>}
              </tr>
            </thead>
            <tbody>
              {solves.map((solve, index) => (
                <tr key={index} className="statsSolve">
                  <td>{solves.length - index}</td>
                  {
                    <td>
                      {solve.isDNF
                        ? " DNF(" + solve.solveTime + ") "
                        : solve.solveTime}
                    </td>
                  }
                  {isScrambleActive && <td>{solve.scramble}</td>}
                  {isDateActive && <td>{solve.date}</td>}
                  {isPuzzleTypeActive && <td>{solve.puzzle}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
