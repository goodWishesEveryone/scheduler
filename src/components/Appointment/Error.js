import React from "react";

//////// --- Error informs the user when an error occurs --- ////////

export default function Error(props) {
  const { message, onClose} = props;
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{ message }</h3>

      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        // Function to be called when the user clicks the Close button
        onClick={ onClose }
      />
    </main>
  );
}
