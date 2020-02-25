import React from "react";
import "components/DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {
  const dayClass = classnames("day-list", {
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}

function formatSpots(spots) {
  if (spots === 0) {
    return "no spots remaining";
  }
  if (spots === 1) {
    return `${spots} spot remaining`;
  }
  if (spots > 1) {
    return `${spots} spots remaining`;
  }
}
