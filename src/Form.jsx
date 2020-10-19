/* eslint-disable guard-for-in */
import React from "react";
import PropType from "prop-types";

import Grid from "@material-ui/core/Grid";

// local imports
import Context from "./context";

class ReactForm extends React.Component {
  state = {
    values: {},
    errors: {},
    submitted: 0,
    name: `${Date.now()}${Math.random()}`
  };

  componentDidMount() {
    const { name } = this.props;
    if (name) {
      this.setState({ name });
    }
  }

  submit = (e) => {
    if (e.srcElement && e.srcElement.name === this.name) {
      e.preventDefault();
      
      let errorCount = 0;
      for (const name in this.state.errors) {
        if (this.state.errors[name]) {
          errorCount++;
        }
      }
  
      if (errorCount === 0) {
        this.props.onSubmit(this.state.values, e);
      } else {
        this.setState((prev) => ({ submitted: prev.submitted + 1 }));
      }
    }
  };

  setValue = (name, value) => {
    this.setState((prev) => ({ values: { ...prev.values, [name]: value } }));
  };

  setError = (name, error) => {
    this.setState((prev) => ({ errors: { ...prev.errors, [name]: error } }));

    if (this.props.onValid && this.props.onInvalid) {
      let errorCount = 0;
      for (const e in this.state.errors) {
        if (e !== name && this.state.errors[e]) {
          errorCount++;
        }
      }

      if (errorCount === 0) {
        // only now theres a change
        if (error) this.props.onInvalid();
        else this.props.onValid();
      }
    }
  };

  render() {
    const { className = "", submit, onValid, onInvalid, ...props } = this.props;
    const provides = {
      submitted: this.state.submitted,
      values: this.state.values,
      errors: this.state.errors,
      setError: this.setError,
      setValue: this.setValue,
    };

    return (
      <form
        className={`muiform ${className}`}
        {...props}
        name={this.state.name}
        onSubmit={this.submit}
      >
        <Context.Provider value={provides}>
          <Grid container direction="column">
            {this.props.children}
          </Grid>
        </Context.Provider>
      </form>
    );
  }
}

ReactForm.propTypes = {
  onSubmit: PropType.func.isRequired,
};

export default ReactForm;
