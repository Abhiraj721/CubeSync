import {React,useRef} from "react";
import "./SolveAlert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import SolveNotes from "./Scramble&Notes/SolveNotes/SolveNotes";
import ScrambleInfo from "./Scramble&Notes/ScrambleInfo/ScrambleInfo";
export default function SolveAlert({sessions,currSession ,solve }) {
  const noteRef=useRef(null)
  return (
    <div className="solveInfo">
      <h3>Solve no.{solve.sno}</h3>
      <h4>{solve.solveTime}</h4>
      <p className="puzzleType">
        {solve.puzzle} <FontAwesomeIcon icon={faCube} />
      </p>
      <h6>{solve.date}</h6>
      <hr style={{ border: "1px solid grey", width: "100%" }} />
      <div className="scrambleNotesBtns">
        <button>Scramble</button>
        <button onClick={()=>noteRef.current.getSolveNote()}>Notes</button>
      </div>
      {/* <ScrambleInfo scramble={solve.scramble}></ScrambleInfo> */}
      <SolveNotes ref={noteRef} sessions={sessions} currSession={currSession} solve={solve}></SolveNotes>
    </div>
  );
}
