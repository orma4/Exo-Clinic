import React from "react";

const Input = ({
    name,
    label = name,
    type = "text",
    value = "",
    className = "",
    pending,
    onChange,
    errors = [],
    pattern,
    ...props
  }) => {
    const classes = [pending && "pending", className].filter(Boolean).join(" ");
  
    return (
      <label className={classes}>
        <div className="row">
          <strong className="col-xs-4">{label}:</strong>
          {!!errors.length && (
            <span className="col-xs-8 error-container">{errors[0]}</span>
          )}
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          pattern={pattern}
          {...props}
        />
      </label>
    );
  };
  export default Input;