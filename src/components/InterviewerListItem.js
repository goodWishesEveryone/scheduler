import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

// a component to render and handle behaviour of individual interviewer items
export default function InterviewerListItem(props) {
  let interviewerClass = classNames("interviewers__item", {
    "interviewers--selected": props.selected,
  });
  // is run when the InterviewerListItem is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
