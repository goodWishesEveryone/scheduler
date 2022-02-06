// Form is where user selects the appointment-timeslot, inputs their name and interviewer.

import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  // useState hook gives back an array containing two variables: the currently stored value, and a function to set a new value. The appropriate default values are "" and null, when a new appointment is being created for the first time.
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // function used to reset the form student and interviewer fields, when the user clicks the Cancel button, it clears the form values
  const reset = () => {
    setStudent("");
    setError("");
    setInterviewer(null);
  };

  // function used to cancel a form submission when a user clicks the cancel button; it calls the reset function and onCancel function from props
  const cancel = () => {
    reset();
    props.onCancel();
  };


  // function used to validate a form to ensure there is a student name before calling the onSave function from props
  const validate = () => {
    if (!student || student === "") {
      setError("Student name cannot be blank");
      return;
    } 
    else if (!interviewer) {
      setError("Interviewer cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        {/* event.preventDefault() prevents the default behavior of pressing the Enter key (refresh the page) */}
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            student="student"
            type="text"
            value={student}
            placeholder="Enter Student Name"
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
} 
