import React from "react";
import DayListItem from "components/DayListItem";

// serves as a container to hold all the <DayListItem> components
export default function DayList(props) {
  const dayList = props.days.map((day) => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        // sets the currently selected day and accepts the name of the day eg. "Monday", "Tuesday"
        setDay={props.setDay}
        // the currently selected day
        selected={day.name === props.day}
      />
    );
  });
  return <ul>{dayList}</ul>;
}
