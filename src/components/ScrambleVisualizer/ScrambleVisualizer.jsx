import React from "react";
import "./ScrambleVisualizer.css";
import { TwistyPlayer } from "cubing/twisty";

export default function ScrambleVisualizer({
  currPuzzle,
  currScramble,
  visualDimension,
}) {

  return <div className="scrambleContainer">      <twisty-player
  style={{ width: "280px", height: "280px" }}
  alg={currScramble}
  puzzle={currPuzzle}
  hint-facelets="none"
  visualization={visualDimension}
  back-view="top-right"
  control-panel="none"
  background="none"
></twisty-player></div>;
}
