// custom Hook owns the data management to be used in Appliction.js

import { useState, useEffect } from "react";
import axios from "axios";
import { updateSpots } from "helpers/selectors";

/////////////////////  CUSTOM HOOK  ///////////////////////
// useApplicationData will be responsible for loading the initial data from the API, and when any of the provided actions are called the state updates, causing the component to render.

export default function useApplicationData() {
  // default day state to "Monday"
  // initialized as an empty array.
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // setDay function updates the state with the new day
  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // Promise.all will run many promises concurrently and when all the Promises resolved, it updates the state
  // Axios retrieves data from db to populate Appointments, Interviewers and Days
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => {
        console.log("Encountered an error :", err);
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = updateSpots(state, appointments);

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  }

  //////////////// --- cancelInterview --- /////////////////

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
        days: newDays,
      });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
