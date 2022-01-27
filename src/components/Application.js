import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { all } from "micromatch";

// mock data for appointments
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 5,
    time: "4pm",
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday"); // default day state to "Monday"
  const [days, setDays] = useState([]);  //use useState to add a days state to the Application component; initialized as an empty array.
  
  console.log(day);
  const changeDay = (value) => {
    return setDay(value);
  //const setDay = day => setDay({...state, day})
  };

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get('http://localhost:8001/api/days')),
      Promise.resolve(axios.get('http://localhost:8001/api/')),
      Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
    ]).then((all) => {
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers:all[2].data}));
      })
  }, [])
  
  const appointmentList = appointments.map((appointment) => {
    return (

      // The Scheduler activity
      // <Appointment key={appointment.id} {...appointment} />

      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        {/* sidebar elements during the "Project Setup & Familiarity" activity. */}
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
      <section className="schedule ">
        {/* Replace this with the schedule elements during the "The Scheduler" activity:  map over the appointments array to create a list */}
        {appointmentList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}