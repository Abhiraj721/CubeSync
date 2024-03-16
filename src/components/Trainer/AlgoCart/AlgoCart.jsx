import React from "react";
import ScrambleVisualizer from "../../ScrambleVisualizer/ScrambleVisualizer";
import "./AlgoCart.css"
export default function AlgoCart({ algoInfo, methodInfo, algoIndex,puzzle,method }) {
  return (
    <div className="algo col col-lg-4 col-md-6 col-12 ">
      <div className="algoCart boardContainer">
      <div className="algoInfo">
      {console.log(puzzle+" "+method)}
      <p>{algoIndex } .{algoInfo.name}</p>
      <p>{algoInfo.a}</p>
      </div>
      <twisty-player
        style={{ width: "120px" }}
        puzzle={puzzle}
        alg={algoInfo.a}
        experimental-setup-anchor="end"
        experimental-stickering={methodInfo.experimentalStickering}
        visualization={methodInfo.visualization}
        control-panel="none"
        background="none"
      ></twisty-player>
      </div>
    </div>
  );
}
