import React, { useState } from "react";
import "./Trainer.css"
import {algsInfo,puzzles,methodOptions} from "./utiliity/AlgoInfo";
export default function Trainer() {
  const [trainingPuzzle,setTrainingPuzzle]=useState("3x3x3")
  return (
    <div className="col col-lg-10 col-md-11 col-12">
      <div className="trainerPanel">
        <h1>Trainer</h1>
        <div className="algoChoices">
    <select className="algosChoiceSelect" name="puzzleSelect" id="" value={trainingPuzzle} onChange={(e)=>setTrainingPuzzle(e.target.value)}>
      {
        puzzles.map((puzzle)=>{
          return <option value={puzzle}>{puzzle}</option>
        })
      }
    </select>
    <select className="algosChoiceSelect" name="" id="">
      {
        methodOptions[trainingPuzzle].map((methodOption)=>{
          return <option value={methodOption}>{methodOption}</option>
        })
      }
    </select>
        </div>
      {
     console.log(puzzles)
      }

      </div>
    </div>
  );
}
