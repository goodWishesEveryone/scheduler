// selector, is a function that accepts state as an argument and returns data that is derived from that state.

//////////////////  ---  getAppointmentsForDay  ---  ///////////////////
// will return an array of appointments for the given day

export function getAppointmentsForDay(state, day) {
  const filteredAppointments = state.days.filter(date => date.name === day);

  let appointments = [];

  if (filteredAppointments.length){
    appointments = filteredAppointments[0].appointments.map(x => state.appointments[x]);
  }
  return appointments;
}


//////////////////  ---  getInterview  ---  //////////////////
// will return a new object containing the interview data when we pass it an object that contains the interviewer; Otherwise, returns null.

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }

  const interviewObj = { 
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
  
  return interviewObj;
}