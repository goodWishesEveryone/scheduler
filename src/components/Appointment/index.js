import React, { useState, useEffect } from "react";
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import { getInterview } from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETE = "DELETE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { time, interview, state, interviewers } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  const [interviewer, setInterviewer] = useState({});
  const [student, setStudent] = useState("");

  useEffect(() => {
    if (interview) {
      setInterviewer(interview.interviewer);
      setStudent(interview.student);
    }
  }, [interview]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        const intv = getInterview(state, interview);
        setStudent(intv.student);
        setInterviewer(intv.interviewer);

        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer}
          onDelete={() => transition(DELETE)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Booking your interview"} />}
      {mode === DELETING && <Status message={"Cancelling your interview"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Delete your booking?"}
          onCancel={back}
          ///onConfirm={cancelInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewer={interview.interviewer && interview.interviewer.id}
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {(mode === ERROR_DELETE || mode === ERROR_SAVE) && (
        <Error
          onClose={() => {
            back();
          }}
          message={"Please try again"}
        />
      )}
    </article>
  );
}
