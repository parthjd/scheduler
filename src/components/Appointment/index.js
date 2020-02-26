import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

/******** VARIABLE DECLARATION *******/

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDITING = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
/************************************************ */

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  /********** SAVE FUNCTION *********/

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(result => {
        transition(SHOW);
      })
      .catch(() => transition(ERROR_SAVE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDITING)}
        />
      )}
      {mode === CREATE && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message="Saving.." />}
      {mode === DELETING && <Status message="Deleting.." />}
      {mode === CONFIRM && (
        <Confirm
          onCancel={() => transition(SHOW)}
          onConfirm={() => {
            transition(DELETING);
            props
              .deleteInterview(props.id)
              .then(() => transition(EMPTY))
              .catch(error => transition(ERROR_DELETE, true));
          }}
          message={"Are you sure you would like to delete?"}
        />
      )}

      {mode === EDITING && (
        <Form
          onSave={save}
          interviewers={props.interviewers}
          onCancel={() => back()}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="OOPS!!Error while trying to Save. Please try again! "
          onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message="OOPS!! Error while trying to Delete. Please try again"
          onClose={() => back()}
        />
      )}
    </article>
  );
}
