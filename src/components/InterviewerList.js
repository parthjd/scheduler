import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";
import PropTypes from "prop-types";

/************* InterviewList component ********/

export default function InterviewerList(props) {
  const ListOfInterviewers = props.interviewers
    ? props.interviewers.map(Interviewer => {
        return (
          <InterviewerListItem
            key={Interviewer.id}
            name={Interviewer.name}
            avatar={Interviewer.avatar}
            selected={Interviewer.id === props.value}
            onChange={event => props.onChange(Interviewer.id)}
          />
        );
      })
    : [];
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{ListOfInterviewers}</ul>
    </section>
  );
}
/*************** InterviewList props test *********/

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
};
