import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllSchedules,
  deleteCage
} from '../../redux/actions/schedulesActions';*/
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

import { parseItem } from './scheduleSelection';

let test = [
  {
    WorkDate: '2019-05-16',
    FirstName: '111emp',
    LastName: '11lastname',
    Phone: '111-11-11'
  },
  {
    WorkDate: '2019-05-19',
    FirstName: '222emp',
    LastName: '22lastname',
    Phone: '222-22-22'
  }
];

const rows = ['Дата смены', 'Имя', 'Фамилия', 'Телефон'];

class AllSchedules extends Component {
  state = {
    selected: '',
    data: test //this.props.schedules
  };

  handleEdit = (e, item, old) => {
    console.log(item); // to-parse input data
    const changed = parseItem(item, old);
    console.log(changed); // after-parse data
    this.setState({ selected: changed });
  };

  handleDelete = item => {
    console.log(`Удалено задание с id ${item}`);
    // return this.props.deleteSchedule(item);
  };

  componentDidMount() {
    // this.props.AllSchedules();
  }

  render() {
    console.log('Data', this.state.data);

    return (
      <TableContainer
        rows={rows}
        searchProp="WorkDate"
        data={this.state.data}
        allData={e => console.log('ex')} // AllSchedules from actions
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.scheduleInputs}
      />
    );
  }
}

AllSchedules.propTypes = {
  auth: PropTypes.object.isRequired
  //schedules: PropTypes.object.isRequired
  //AllSchedules: PropTypes.func.isRequired,
  //deleteClient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth
    // schedules: state.schedules
  };
};

export default connect(
  mapStateToProps
  //{ AllSchedules, deleteCage }
)(AllSchedules);
