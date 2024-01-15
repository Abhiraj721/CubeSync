import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./SolveNotes.css";
function SolveNotes({ sessions, currSession, solve }, ref) {
  const [currSolveNote, setCurrSolveNote] = useState("");

  useImperativeHandle(ref, () => ({
    getSolveNote() {
      sessions.map((session) => {
        if (session.id === currSession) {
          session.solves.map((currSolve) => {
            if (currSolve.sno == solve.sno) {
              setCurrSolveNote(currSolve.notes);
            }
          });
        }
      });
    },
  }));
  return (
    <div>
      {currSolveNote==""? "No Notes for this Solve" : currSolveNote}
    </div>
  );
}
export default forwardRef(SolveNotes);
