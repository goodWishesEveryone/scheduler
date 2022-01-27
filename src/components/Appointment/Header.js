import React from "react";

//////// --- Header displays the time for the appointment ---  ////////

export default function Header(props) {
  const { time } = props;

  return (
    <header className="appointment__time">

      {/* to display the time props we are passing to it */}
      <h4 className="text--semi-bold">{time}</h4>  
      <hr className="appointment__separator" />
    </header>
  );
}
