import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  let listClassNames = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  // function that will format the props.spots & making all tests pass
  const formatSpots = function () {
    let spotsRemaining;
    if (props.spots === 0) {
      spotsRemaining = "no spots remaining";
    } else if (props.spots > 0) {
      spotsRemaining = `${props.spots}${
        props.spots === 1 ? " spot " : " spots "
      } remaining`;
    }
    return spotsRemaining;
  };

  return (
    <li className={listClassNames} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()} spots remaining</h3>
    </li>
  );
}
