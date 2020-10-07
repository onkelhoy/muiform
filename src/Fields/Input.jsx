import React from "react";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

// local imports
import withField from "../HOC";
import isEqual from "../equal";

const Input = withField(
  React.memo(({ value, error, errorMessage, setValue, props }) => {
    function handleChange(e) {
      if (props.type === "number") {
        setValue(Number(e.target.value));
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
  }, isEqual)
);

export default Input;
