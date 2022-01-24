import React from "react";
import "./styles.scss";

import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Confirm from "./Confirm";
import Status from "./Status";
import Error from "./Error";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "SAVING_ERROR";
  const ERROR_MISSING_INFO = "MISSING INFO ERROR";



  return (
    <article className="appointment">
      <Header></Header>
    </article>
  )
};
