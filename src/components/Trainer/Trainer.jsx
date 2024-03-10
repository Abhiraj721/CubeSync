import React, { useEffect, useState } from "react";
import "./Trainer.css";
import { algsInfo, puzzles, methodOptions } from "./utility/AlgoInfo";
import { useNavigate } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import AlgoCart from "./AlgoCart/AlgoCart";
export default function Trainer({ puzzle, method }) {
  const [trainingPuzzle, setTrainingPuzzle] = useState(puzzle);
  const [puzzleMethod, setPuzzleMethod] = useState(method);
  const navigate = useNavigate();
  function methodExistInPuzzle() {
    let methodFound = false;
    methodOptions[trainingPuzzle].map((method) => {
      if (method == puzzleMethod) {
        methodFound = true;
      }
    });
    return methodFound;
  }

  useEffect(() => {
    let currMethod;
    if (!methodExistInPuzzle()) {
      console.log("5");
      setPuzzleMethod(methodOptions[trainingPuzzle][0]);
      currMethod = methodOptions[trainingPuzzle][0];
    } else {
      currMethod = puzzleMethod;
    }
    navigate(`/trainer/${trainingPuzzle}/${currMethod}`);
  }, [puzzleMethod, trainingPuzzle]);
  return (
    <div className="col col-lg-10 col-md-11 col-12">
      <div className="trainerPanel">
        <h1>Trainer</h1>
        <div className="algoChoices">
          <select
            className="algosChoiceSelect"
            name="puzzleSelect"
            id=""
            value={trainingPuzzle}
            onChange={(e) => {
              setTrainingPuzzle(e.target.value);
            }}
          >
            {puzzles.map((puzzle) => {
              return <option value={puzzle}>{puzzle}</option>;
            })}
          </select>
          <select
            className="algosChoiceSelect"
            name=""
            id=""
            value={puzzleMethod}
            onChange={(e) => {
              setPuzzleMethod(e.target.value);
            }}
          >
            {methodOptions[trainingPuzzle].map((methodOption) => {
              return <option value={methodOption}> {methodOption} </option>;
            })}
          </select>
        </div>
      </div>
      <div className="algosArea">
        <div className="row">
          {algsInfo[trainingPuzzle][puzzleMethod] &&
            algsInfo[trainingPuzzle][puzzleMethod].algos &&
            algsInfo[trainingPuzzle][puzzleMethod].algos.map((algo, index) => {
              return (
                <AlgoCart
                  algoInfo={algo}
                  methodInfo={algsInfo[trainingPuzzle][puzzleMethod]}
                  algoIndex={index + 1}
                  puzzle={trainingPuzzle}
                  method={puzzleMethod}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
