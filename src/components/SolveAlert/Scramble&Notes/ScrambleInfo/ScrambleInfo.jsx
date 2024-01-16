import React from "react";
import "./ScrambleInfo.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ScrambleVisualizer from "../../../ScrambleVisualizer/ScrambleVisualizer";
const MySwal = withReactContent(Swal);

export default function ScrambleInfo({ solveInfo }) {
  return (
    <div>
      <center>
        <div className="scrambleVisuals">
          <ScrambleVisualizer
            currPuzzle={solveInfo.puzzle}
            currScramble={solveInfo.scramble}
            visualDimension={"2D"}
          ></ScrambleVisualizer>
          <button
            onClick={() => {
              MySwal.fire(
                <center>
                  <p style={{fontSize:"17px"}}>{solveInfo.scramble}</p>
                  <ScrambleVisualizer
                    currPuzzle={solveInfo.puzzle}
                    currScramble={solveInfo.scramble}
                    visualDimension={"3D"}
                  />
                </center>
              );
            }}
            className="threeDViewBtn"
          >
            view in 3D
          </button>
        </div>
      </center>
      <p className="scrambleText">{solveInfo.scramble}</p>
    </div>
  );
}
