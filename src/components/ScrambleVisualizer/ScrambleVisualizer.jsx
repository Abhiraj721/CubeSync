import React from "react";
import "./ScrambleVisualizer.css";
import { TwistyPlayer } from "cubing/twisty";

export default function ScrambleVisualizer({
  currPuzzle,
  currScramble,
  visualDimension,
}) {
  const TwistyPlayer2 = new TwistyPlayer(
    (
      <twisty-player
        style={{ width: "280px", height: "280px" }}
        alg={currScramble}
        puzzle={currPuzzle}
        hint-facelets="none"
        visualization={visualDimension}
        back-view="top-right"
        control-panel="none"
        background="none"
      ></twisty-player>
    )
  );
  return <div className="scrambleContainer">{TwistyPlayer2}</div>;
}
