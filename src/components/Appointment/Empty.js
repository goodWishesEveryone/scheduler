import React from "react";

//////// --- Empty allows a user to choose which time slot to book --- ////////

export default function Empty(props) {
  const { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        // display the onAdd props we are passing to it
        onClick={onAdd}
      />
    </main>
  );
}
