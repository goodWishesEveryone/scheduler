// selector, is a function that accepts state as an argument and returns data that is derived from that state.

import { object } from "prop-types";

//////////////////  ---  getAppointmentsForDay  ---  ///////////////////
// will return an array of appointments for the given day

export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days
    .filter((date) => date.name === day)
    .map((day) => day.appointments)
    .flat();

  let appointments = [];

  if (filteredAppointments.length) {
    filteredAppointments.forEach((appointmentId) => {
      if (state.appointments[appointmentId]) {
        const appointment = state.appointments[appointmentId];
        if (appointment.interview) {
          appointment.interview.interviewer =
            state.interviewers[appointment.interview.interviewer];
        }

        appointments.push(appointment);
      }
    });
  }
  return appointments;
}

//////////////////  ---  getInterview  ---  //////////////////
// will return a new object containing the interview data when we pass it an object that contains the interviewer; Otherwise, returns null.

export function getInterview(state, interview) {
  if (!interview || interview === null) {
    return null;
  }
let interviewObj = {};
    interviewObj = {
      student: interview.student,
      interviewer: interview.interviewer
    };
  
  return interviewObj;
  // return (
  //   interview && {
  //     ...interview,
  //     interviewer: state.interviewers[interview.interviewer],
  //   }
  // );
}

//////////////////  ---  getInterviewersForDay  ---  //////////////////
// to create an interviewers array that will first be passed to the Appointment component and then passed down to the Form component

export function getInterviewersForDay(state, day) {
  const filteredInterviewers = state.days
    .filter((date) => date.name === day)
    .map((day) => day.interviewers)
    .flat();

  let interviewer = [];

  if (filteredInterviewers.length) {
    filteredInterviewers.forEach((interviewerId) => {
      if (state.interviewers[interviewerId]) {
        interviewer.push(state.interviewers[interviewerId]);
      }
    });
  }
  return interviewer;
}
