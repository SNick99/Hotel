import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import ButtonSubmit from "../../Layout/ButtonSubmit/ButtonSubmit";
//import Input from "../../Layout/Input/Input";
//import classnames from "classnames";
import { registerEmployee } from '../../redux/actions/authActions';
import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';
import { validatorEmployee } from '../../validation/validators';

class AddEmployee extends Component {
  constructor(props) { 
    super(props);

    this.headerForm = 'Регистрация';
    this.submitLabel = 'Зарегистрировать';
    this.dataInput = inputs.employeeInputs;
  }
  onSubmit = values =>{console.log(values); this.props.registerEmployee(values);}

  render() {
    return (
      <FormContainer
        onSubmit={this.onSubmit}
        dataInput={this.dataInput}
        headerForm={this.headerForm}
        submitLabel={this.submitLabel}
        validator={validatorEmployee}
      />
    );
  }
}

AddEmployee.propTypes = {
  registerEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { registerEmployee }
)(AddEmployee);
