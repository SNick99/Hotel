import React from "react";
import "./ButtonSubmit.css";

const Button = props => {
  return (
    <button onClick={props.onSubmit} className="btn-submit">
      {props.children}
    </button>
  );
};

export default Button;
