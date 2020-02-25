import React, { useEffect, useReducer } from "react";
import Axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

/****************** REDUCER FUNCTION *****************/

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.value
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    case SET_INTERVIEW: {
      return {
        ...state,
        appointments: action.value
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

/*****************************************************/

export default function useApplicationData(props) {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    interviewers: {},
    appointments: {}
  });
  const setDay = day => dispatch({ type: SET_DAY, value: day });

  /********************* USE EFFECT ********************** */

  useEffect(() => {
    Promise.all([
      Axios.get("http://localhost:8001/api/days"),
      Axios.get("http://localhost:8001/api/appointments"),
      Axios.get("http://localhost:8001/api/interviewers")
    ]).then(([days, appointments, interviewers]) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: days.data,
          appointments: appointments.data,
          interviewers: interviewers.data
        }
      });
    });
  }, [state.days]);

  /***************** BOOK INTERVIEW FUNCTION *************************/

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    dispatch({ type: SET_INTERVIEW, value: appointments });

    return Axios.put(
      `http://localhost:8001/api/appointments/${id}`,
      appointment
    );
  }

  /***************** DELETE INTERVIEW FUNCTION ********************/

  function deleteInterview(id) {
    return Axios.delete(`http://localhost:8001/api/appointments/${id}`).then(
      result => {
        const appointment = {
          ...state.appointments[id],
          interview: null
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment
        };
        dispatch({ type: SET_INTERVIEW, value: appointments });
      }
    );
  }
  return { state, setDay, bookInterview, deleteInterview };
}
/*********************************************************** */
