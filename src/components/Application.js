import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";

export default function Application(props) {
  // const [day, setDay] = useState("Monday"); // default day state to "Monday"
  // const [days, setDays] = useState([]);  //use useState to add a days state to the Application component; initialized as an empty array.

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
  });

  //const dailyAppointments = [];

  // setDay function updates the state with the new day
  const setDay = (day) => setState({ ...state, day });
  // };

  useEffect(() => {
    // Promise.all will run many promises concurrently and when all the Promises resolved, it updates the state
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    setState({
      ...state,
      appointments,
    });

    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      setState((prev) => ({ ...prev, appointments }));
    });
  }

  // calling getAppointmentsForDay until after both the days and the appointments are downloaded and set as state
  //dailyAppointments = getAppointmentsForDay(state, state.day);
  //console.log('state', state);
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);

  console.log(appointments, interviewers);

  const appointmentList = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        state={state}
        time={appointment.time}
        interview={appointment.interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
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
          {/* <DayList days={days} value={day} onChange={changeDay} /> */}
          <DayList days={state.days} day={state.day} setDay={setDay} />
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
