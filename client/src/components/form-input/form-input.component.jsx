import React from "react";

import "./form-input.style.scss";

const FormInput = ({ handleChange, label, className, ...otherProps }) => (
  <div className="input-field">
    <input
      {...otherProps}
      onChange={handleChange}
      className={`form-input ${className ? className : ""}`}
    />
    {label ? (
      <label
        className={`${
          otherProps.value.length ? "shrink" : ""
        } form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
