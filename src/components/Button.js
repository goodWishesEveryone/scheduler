import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
  //let buttonClass = "button";
  // var buttonClass = classNames('button', this.props.className, {
  //    'button-pressed': this.state.isPressed,
  //    'button-hover': !this.state.isPressed && this.state.isHovered
  //  });

  // if (props.confirm) {
  //   buttonClass += " button--confirm";
  // }

  // if (props.danger) {
  //   buttonClass += " button--danger";
  // }

  // return (
  //   <button
  //     className={buttonClass}
  //     onClick={props.onClick}
  //     disabled={props.disabled}
  //   >
  //     {props.children}
  //   </button>
  // );
  var classNames = require("classnames");

  class Button extends React.Component {
    // ...
    render() {
      var buttonClass = classNames({
        button: true,
        "button-pressed": this.state.isPressed,
        "button-Hover": !this.state.isPressed && this.state.isHovered,
      });
      return <button className={buttonClass}>{this.props.label}</button>;
    }
  }
}
