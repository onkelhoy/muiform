import React from "react";
import Context from "./context";

export default function (name) {
  const { values, errors, setValue, setError } = React.useContext(Context);

  return {
    values,
    errors,
    setValue: (value, _name = name) => setValue(_name, value),
    setError: (value, _name = name) => setError(_name, value),
  };
}
