import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  // console.log("iLF", props);
  let interviewerClass = classNames("interviewers__item", {
    "interviewers--selected": props.selected,
  });
  // console.log(props);
  // is run when the InterviewerListItem is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.

  return (
    <li className={interviewerClass} onClick={props.setInterviewer} selected={props.selected}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
     {props.selected && props.name}
    </li>
   );
}

