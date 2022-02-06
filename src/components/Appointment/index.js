// hold all logic for each Appointment components

import React from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const DELETING = "DELETING";

export default function Appointment(props) {
  const { id, time, interview, interviewers } = props;
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

  //////////////////  -- SAVE --  ///////////////
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    props
      .bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => transition(ERROR_SAVE, true));
  }

  //////////////////  -- cancelInterview --  ///////////////

  function cancelInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  return (
    <article className="appointment">
      <Header time={time} />
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          id={id}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === CREATE && (
        <Form interviewers={interviewers} onCancel={back} onSave={save} />
      )}
      {mode === SAVING && <Status message={"Booking your interview"} />}
      {mode === DELETING && <Status message={"Deleting your interview"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={back}
          onConfirm={cancelInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          student={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error 
          onClose={() => back()} 
          message={"Could not save appointment."} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          onClose={() => back()}
          message={"Could not delete appointment."}
        />
      )}
    </article>
  );
}
