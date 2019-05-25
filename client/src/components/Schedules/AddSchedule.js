import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';
import { parseItem } from './scheduleSelection';
import { validatorSchedule } from '../../validation/validators';
import {
  addSchedule,
  allEmployeeSchedules
} from '../../redux/actions/schedulesActions';

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.headerForm = 'Добавить в график';
    this.submitLabel = 'Добавить';
    this.dataInput = inputs.scheduleInputs;
  }

  onSubmit = values => {
    const sendData = {
      DateChange: values.DateChange,
      employeeId: values.Employee[0]
    };

    this.props.addSchedule(sendData);
  };

  componentDidMount() {
    this.props.allEmployeeSchedules();
  }
  render() {
    return (
      <FormContainer
        onSubmit={this.onSubmit}
        dataInput={this.dataInput}
        headerForm={this.headerForm}
        submitLabel={this.submitLabel}
        validator={validatorSchedule}
        forSelectConfig={this.props.employees}
      />
    );
  }
}

AddSchedule.propTypes = {
  addSchedule: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  employees: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    auth: state.auth,
    employees: state.schedules.employees
  };
};

export default connect(
  mapStateToProps,
  { addSchedule, allEmployeeSchedules }
)(AddSchedule);
