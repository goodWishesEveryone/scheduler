import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {
  const { name, spots, setDay, selected } = props;
   // function that will format the props.spots & making all tests pass
  const formatSpots = function (spots) {
    let spotsRemaining;
    if (spots === 0) {
      spotsRemaining = "no spots remaining";
    } else if (spots > 0) {
      spotsRemaining = `${spots}${
        spots === 1 ? " spot" : " spots"
      } remaining`;
    }
    return spotsRemaining;
  };
  // const formatSpots = function(num) {
  //   if(num === 0) return "no spots remaining";
  //   if(num === 1) return `${num} spot remaining`;
  //   if(num > 1) return `${num} spots remaining`;
  // }

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0 || !spots
  });

  return (
    <li
      className={dayClass}
      onClick={() => setDay(name)}
      selected={selected}
      data-testid="day"
    >
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}
