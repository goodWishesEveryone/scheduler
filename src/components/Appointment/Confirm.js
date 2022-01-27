import React from "react";
import Button from "components/Button";

//////// --- Confirm allows a user to confirm a destructive action --- ////////

export default function Confirm(props) {
  const { message, onConfirm, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      {/* <h1 className="text--semi-bold">Delete the appointment?</h1> */}
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">

        {/* Functions to be called when the user clicks the Confirm or Cancel button */}
        <Button danger>{onConfirm}</Button>
        <Button danger>{onCancel}</Button>
       
      </section>
    </main>
  );
}
