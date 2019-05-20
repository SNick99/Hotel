import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllSchedules,
  deleteCage
} from '../../redux/actions/schedulesActions';*/
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

let test = [
  {
    Датасмены: '111',
    Имя: '111',
    Фамилия: '111',
    Phone: '111'
  },
  {
    Датасмены: '111',
    Имя: '222',
    Фамилия: '222',
    Phone: '222'
  }
];

const rows = ['Дата смены', 'Имя', 'Фамилия', 'Телефон'];

class AllSchedules extends Component {
  state = {
    selected: '',
    data: test //this.props.schedules
  };

  handleEdit = item => {
    console.log('to edit: ' + item.FirstName);
    this.setState({ selected: item });
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
        searchProp="Phone"
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
