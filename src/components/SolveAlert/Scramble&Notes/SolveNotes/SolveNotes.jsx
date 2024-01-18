import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import "./SolveNotes.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function SolveNotes({ sessions, setSession, currSession, solve }, ref) {
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
  function uptadeSolveNote(noteText) {
    const tempSession = sessions;
    tempSession.map((session) => {
      if (session.id === currSession) {
        session.solves.map((currSolve) => {
          if (currSolve.sno == solve.sno) {
            currSolve.notes = noteText;
            console.log(session.notes);
          }
        });
      }
    });
    setSession(tempSession);
    localStorage.setItem("sessions", JSON.stringify(tempSession));
    console.log("4sa");
  }
  async function editNoteAlert() {
    const { value: noteText } = await Swal.fire({
      input: "textarea",
      inputLabel: "Notes",
      confirmButtonText: "Save",
      inputPlaceholder: "Type your Notes here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
    });

    if (noteText) {
      uptadeSolveNote(noteText);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Note has been saved",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  }

  return (
    <div>
      <div className="notesTextWrap">
        <p className="notesText">
          {currSolveNote === "" ? "No Notes for this Solve" : currSolveNote}
        </p>
      </div>
      <p style={{fontSize:"18px"}} onClick={() => editNoteAlert()}>
       Edit Notes <FontAwesomeIcon icon={faEdit} />
      </p>
    </div>
  );
}

export default forwardRef(SolveNotes);
