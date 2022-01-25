import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //function used to reset the form name and interviewer fields
  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  //function used to cancel a form submission, calls the reset function and the onCancel function from props
  const cancel = () => {
    reset();
    props.onCancel();
  };

  //function used to validate a form to ensure there is a student name before calling the onSave function from props
  const validate = () => {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  };

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off">
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
      /* your code goes here */
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger {/* your code goes here */}>Cancel</Button>
      <Button confirm {/* your code goes here */}>Save</Button>
    </section>
  </section>
</main>

  );
};