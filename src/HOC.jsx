/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import PropType from "prop-types";
import Context from "./context";

function HOC(FieldComponent, _defaultValue = null) {
  return ({
    value,
    hidden,
    required,
    validation,
    errorMessage,
    className = "",
    parent,
    defaultValue = _defaultValue,
    ...restProps
  }) => {
    const { name } = restProps;
    const { values, setValue, setError, errors, submitted, reset } = React.useContext(
      Context
    );
    const [isTouched, setTouched] = React.useState(false);
    const error = errors[name];

    let _default = defaultValue;
    if (defaultValue instanceof Function) {
      const v = defaultValue({ ...restProps });
      if (typeof v === "object") _default = { ...v };
      else _default = v;
    }

    React.useEffect(() => {
      // TODO set value if any
      _setValue(value);
      // _setError(false);
    }, []);

    React.useEffect(() => {
      if (submitted > 0 && !isTouched) setTouched(true);
    }, [submitted, isTouched]);

    React.useEffect(() => {
      if (values[name] && !isTouched) setTouched(true);
    }, [values[name], isTouched]);

    React.useEffect(() => {
      setTouched(false);
    }, [reset])

    function _setValue(value = _default, _name = name) {
      if (validation) {
        let isValid = true;
        if (validation instanceof Function) {
          isValid = validation(value, values);
        } else if (validation instanceof RegExp) {
          isValid = validation.test(value);
        }

        if (isValid && error) _setError(false);
        else if (!isValid && !error) _setError(true);
      } else if (required) {
        if (!value && value !== 0 && !error) _setError(true);
        else if (error) _setError(false);
      }
      
      setValue(_name, value);
    }

    function _setError(error, _name = name) {
      setError(_name, error);
    }

    function onFocus() {
      if (!isTouched) setTouched(true);
    }

    // inject to input
    restProps.onFocus = onFocus;
    restProps.className = `muiform-field ${className}`;

    if (hidden) {
      restProps.className = "muiform-field-hidden";
    }

    let parentDisabled = false;
    console.log(typeof values[parent]?.value, values[parent]?.value);
		if (parent && values[parent]?.value !== 'true') {
			disabled = true;
		}

    return (
      <FieldComponent
        setValue={_setValue}
        value={values[name] || _default}
        values={values}
        parentDisabled={parentDisabled}
        errorMessage={isTouched && error ? errorMessage : null}
        required={required}
        validation={validation}
        isTouched={isTouched}
        setError={_setError}
        errors={errors}
        error={isTouched && error}
        defaultValue={_default}
        props={restProps}
      />
    );
  };
}

HOC.propTypes = {
  name: PropType.string.isRequired,
};

export default HOC;
