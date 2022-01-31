// hold all logic for each Appointment components 

import React, { useState, useEffect } from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
//import { getInterview } from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
//const DELETE = "DELETE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const DELETING = "DELETING";

export default function Appointment(props) {
  //const { id,time, interview, state, interviewers } = props;
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // const [interviewer, setInterviewer] = useState({});
  // const [student, setStudent] = useState("");

  // useEffect(() => {
  //   if (interview) {
  //     setInterviewer(interview.interviewer);
  //     setStudent(interview.student);
  //   }
  // }, [interview]);

  //////////////////  -- SAVE --  ///////////////
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    // props
    //   .bookInterview(props.id, interview)
    //   .then(() => {
    //     const intv = getInterview(state, interview);
    //     setStudent(intv.student);
    //     setInterviewer(intv.interviewer);

    //     transition(SHOW);
    //   })
    //   .catch((error) => transition(ERROR_SAVE, true));
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }

  //////////////////  -- cancelInterview --  ///////////////

  function cancelInterview() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  //////////////////  -- confirmRemove --  ///////////////
  function confirmRemove() {
    transition(CONFIRM);
  }
  //////////////////  -- onEdit --  ///////////////
  function onEdit() {
    transition(EDIT);
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === EMPTY && <Empty onAdd={() => {transition(CREATE)}} />}
      {mode === CREATE && <Form 
      interviewers={props.interviewers} 
      onCancel={back} 
      onSave={save} 
      />} 
      {mode === SAVING && <Status message={"Booking your interview"} />}
      {mode === DELETING && <Status message={"Cancelling your interview"} />}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete your booking?"}
          onCancel={back}
          onConfirm={cancelInterview}
        />
      )}
      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer && props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {(mode === ERROR_DELETE || mode === ERROR_SAVE) && (
        <Error
          message={"Please try again"}
          onClose={back}
        />
      )}
    </article>
  );
}
