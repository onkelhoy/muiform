import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

// local imports
import withField from "../HOC";
import isEqual from "../equal";

const Input = withField(
  React.memo(
    ({ value, error, errorMessage, defaultValue, setValue, props }) => {
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

      return (
        <TextField
          component={Box}
          my={1}
          value={value || ""}
          {...props}
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
