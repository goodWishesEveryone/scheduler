// selector, is a function that accepts state as an argument and returns data that is derived from that state.

import { object } from "prop-types";


//////////////////  ---  getAppointmentsForDay  ---  ///////////////////
// Gets all appointments for a given day and will return an array of appointments for the given day

export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((weekDay) => {
    return weekDay.name === day;
  });
  if (!foundDay) {
    return [];
  }
  const mapAppointmentForFoundDay = foundDay.appointments.map((appointment) => {
    return state.appointments[appointment];
  });
  return mapAppointmentForFoundDay;
}


//////////////////  ---  getInterview  ---  //////////////////
// Gets interview details for a given interview and will return a new object containing the interview data when we pass it an object that contains the interviewer; Otherwise, returns null.

export function getInterview(state, interview) {
  if (!interview || interview === null) {
    return null;
  }
  const newInterview = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };
  return newInterview;
}


//////////////////  ---  getInterviewersForDay  ---  //////////////////
// Gets all interviewers interviewing on a specific day
// create an interviewers array that will first be passed to the Appointment component and then passed down to the Form component

export function getInterviewersForDay(state, day) {
  let filteredInterviewers = state.days.find((date) => date.name === day);

  filteredInterviewers = filteredInterviewers.interviewers;

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


////////////    ---  getSpotsForDay  ---  ////////////
const getSpotsForDay = function (day, appointments) {
  let spots = 0;
  // iterate the day's appointment id's
  for (const id of day.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      spots++;
    }
  }
  return spots;
};

////////////    ---  updateSpots  ---  ////////////
/**
 * Update Spots for current day
 * @param {Object}   state           State Object.
 * @param {Object}   appointments    New Appointments array
 * @param {Object}   id              Optional appointment id
 * @return {Array}   A Days array we can save back into state.
 */

export function updateSpots(state, appointments, id) {
  // get the day object
  const dayObj = state.days.find((day) => day.name === state.day);
  const spots = getSpotsForDay(dayObj, appointments);
  const day = { ...dayObj, spots };

  // return an updated days array
  return state.days.map((d) => (d.name === state.day ? day : d));
}
