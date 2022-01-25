// import React from "react";
import React, { useState } from "react";
import "components/Application.scss";

import DayList from "./DayList";

const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday"); // default day state to "Monday"
  console.log(day);

  const changeDay = (value) => {
    return setDay(value);
  };

  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* Incorporate the DayList component and Passing day and days to <DayList> */}
          <DayList days={days} value={day} onChange={changeDay} />
      
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements during the "The Scheduler" activity. */}
        <section className="schedule " />
      </section>
    </main>
  );
}
