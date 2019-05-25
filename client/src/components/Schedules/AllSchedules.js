import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allSchedules,
  deleteSchedule,
  updateSchedule,
  allEmployeeSchedules
} from '../../redux/actions/schedulesActions';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

import { parseItem } from './scheduleSelection';

const rows = ['id', 'Имя', 'Фамилия', 'Телефон', 'Дата смены'];

class AllSchedules extends Component {
  state = {
    selected: '',
    data: this.props.schedules
  };

  handleEdit = (e, item, old) => {
    console.log(item); // to-parse input data
    const changed = parseItem(item, old);
    console.log(changed); // after-parse data
    this.setState({ selected: changed });
  };

  handleDelete = item => {
    console.log(`Удалено задание с id ${item}`);
    return this.props.deleteSchedule(item);
  };
  onSubmit = values => {
    const sendData = {
      DateChange: values.DateChange,
      employeeId: values.Employee[0]
    };

    this.props.updateSchedule(sendData);
  };
  componentDidMount() {
    this.props.allSchedules();
    this.props.allEmployeeSchedules();
  }

  render() {
    console.log('Data', this.props.schedules);

    return (
      <TableContainer
        rows={rows}
        searchProp="DateChange"
        data={this.props.schedules}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.scheduleInputs}
        forSelectConfig={this.props.employees}
        onSubmit={this.onSubmit}
      />
    );
  }
}

AllSchedules.propTypes = {
  auth: PropTypes.object.isRequired,
  schedules: PropTypes.array.isRequired,
  allSchedules: PropTypes.func.isRequired,
  deleteSchedule: PropTypes.func.isRequired,
  updateSchedule: PropTypes.func.isRequired,
  allEmployeeSchedules: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    schedules: state.schedules.schedules,
    employees: state.schedules.employees
  };
};

export default connect(
  mapStateToProps,
  { allSchedules, deleteSchedule, updateSchedule, allEmployeeSchedules }
)(AllSchedules);
