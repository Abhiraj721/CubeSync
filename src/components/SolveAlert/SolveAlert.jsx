import React, { useEffect, useRef, useState } from "react";
import "./SolveAlert.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCube } from "@fortawesome/free-solid-svg-icons";
import SolveNotes from "./Scramble&Notes/SolveNotes/SolveNotes";
import ScrambleInfo from "./Scramble&Notes/ScrambleInfo/ScrambleInfo";

export default function SolveAlert({
  sessions,
  setSession,
  currSession,
  solve,
}) {
  const noteRef = useRef(null);
  const [clickedSection, setClickedSection] = useState("Scramble");

  // Use useEffect to call getSolveNote when the component mounts
  useEffect(() => {
    if (clickedSection === "Notes" && noteRef.current) {
      noteRef.current.getSolveNote();
    }
  }, [clickedSection]);

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
        <button
          onClick={() => {
            setClickedSection("Scramble");
          }}
        >
          Scramble
        </button>
        <button
          onClick={() => {
            setClickedSection("Notes");
          }}
        >
          Notes
        </button>
      </div>
      {clickedSection === "Scramble" ? (
        <ScrambleInfo solveInfo={solve}></ScrambleInfo>
      ) : (
        <SolveNotes
          ref={noteRef}
          sessions={sessions}
          setSession={setSession}
          currSession={currSession}
          solve={solve}
        ></SolveNotes>
      )}
    </div>
  );
}
