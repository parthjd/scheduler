export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DAY: {
      return {
        ...state,
        day: action.value
      };
    }
    case SET_APPLICATION_DATA: {
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      };
    }
    case SET_INTERVIEW: {
      let spotsChange;

      if (
        action.value.interview &&
        !state.appointments[action.value.id].interview
      ) {
        spotsChange = -1;
      }
      if (
        state.appointments[action.value.id].interview &&
        !action.value.interview
      ) {
        spotsChange = 1;
      }
      if (
        state.appointments[action.value.id].interview &&
        action.value.interview
      ) {
        spotsChange = 0;
      }

      let newDays = state.days.map(item => {
        if (item.name !== state.day) {
          return item;
        }
        return {
          ...item,
          spots: item.spots + spotsChange
        };
      });

      const appointment = {
        ...state.appointments[action.value.id],
        interview: action.value.interview
      };

      const appointments = {
        ...state.appointments,
        [action.value.id]: appointment
      };

      return {
        ...state,
        appointments,
        days: newDays
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}
