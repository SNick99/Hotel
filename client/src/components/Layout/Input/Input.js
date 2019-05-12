import React from "react";
import "./Input.css";
const Input = props => {
  const {
    type,
    placeholder,
    name,
    value,
    onChange,
    className,
    invalidFeedback,
    errors,
  } = props;
  return (
    <React.Fragment>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      />
      {invalidFeedback !== "" ? (
        <div className={invalidFeedback}>{errors[name]}</div>
      ) : null}
    </React.Fragment>
  );
};

export default Input;
