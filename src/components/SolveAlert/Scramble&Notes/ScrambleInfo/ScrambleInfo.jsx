import React from "react";
import "./ScrambleInfo.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ScrambleVisualizer from "../../../ScrambleVisualizer/ScrambleVisualizer";
import isAlertOpened from "../../../Data/CheckForAlert";
const MySwal = withReactContent(Swal);
export default function ScrambleInfo({ solveInfo }) {
  return (
    <div>
            <p className="scrambleText">{solveInfo.scramble}</p>
      <center>
        <div className="scrambleVisuals">
          <ScrambleVisualizer
            currPuzzle={solveInfo.puzzle}
            currScramble={solveInfo.scramble}
            visualDimension={"2D"}
          ></ScrambleVisualizer>
          <button
            onClick={() => {
              console.log(isAlertOpened())
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
    </div>
  );
}
