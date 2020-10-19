import React from "react";

import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Box from "@material-ui/core/Box";

// local imports
import withForm from "../HOC";
import isEqual from "../equal";

const SelectField = withForm(
  React.memo(({ value, error, errorMessage, setValue, props }) => {
    const { children, label, ...rest } = props;

    function handleChange(e) {
      setValue(e.target.value);
    }

    return (
      <FormControl
        component={Box}
        my={1}
        {...rest}
        error={error}
      >
        {label && <InputLabel htmlFor={props.name}>{label}</InputLabel>}
        <Select label={label} value={value || ""} onChange={handleChange}>
          {children}
        </Select>
        {Boolean(errorMessage) && (
          <FormHelperText>{errorMessage}</FormHelperText>
        )}
      </FormControl>
    );
  }, isEqual)
);

export default SelectField;
