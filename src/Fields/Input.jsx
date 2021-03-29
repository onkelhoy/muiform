import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

// local imports
import withForm from "../HOC";
import isEqual from "../equal";

const Input = withForm(
  React.memo(
    ({ 
      value, parentDisabled, error, 
      errorMessage, defaultValue, 
      setValue, required, 
      props: { label, nostar, ...props} 
    }) => {
      function handleChange(e) {
        if (props.type === "number") {
          if (e.target.value === "") {
            setValue(defaultValue);
          } else {
            const number = Number(e.target.value);
            setValue(isNaN(number) ? defaultValue : number);
          }
        } else setValue(e.target.value);
      }

      if (required && !nostar) label = `${label} *`;

      return (
        <TextField
          component={Box}
          disabled={parentDisabled}
          my={1}
          value={value || ""}
          {...props}
          label={label}
          onChange={handleChange}
          error={error}
          helperText={errorMessage}
        />
      );
    },
    isEqual
  )
);

export default Input;
