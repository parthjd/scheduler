export function getAppointmentsForDay(state, day) {
  const rightDay = state.days.find(d => d.name === day);

  if (!rightDay || state.days.length === 0) {
    return [];
  }
  const filteredAppointments = rightDay.appointments.map(
    id => state.appointments[id]
  );
  return filteredAppointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  const interviewObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };
  return interviewObj;
}

export function getInterviewersForDay(state, interview) {
  let interviewersArray = [];
  let stateDays = state.days;
  stateDays.forEach(element => {
    if (element.name === interview) {
      for (let i = 0; i < element.interviewers.length; i++)
        interviewersArray.push(state.interviewers[element.interviewers[i]]);
    }
  });
  return interviewersArray;
}
