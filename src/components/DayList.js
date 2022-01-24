import React from "react";
import DayListItem from "components/DayListItem";

// serves as a container to hold all the <DayListItem> components
export default function DayList(props) {
  const days = props.days.map( day => {
    return (
      <DayListItem 
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day} // the currently selected day
        setDay={props.setDay}             // sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"
      />
    )
  });
  return days;
};