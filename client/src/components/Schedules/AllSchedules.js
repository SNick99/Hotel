import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllSchedules,
  deleteCage
} from '../../redux/actions/schedulesActions';*/
import TableContainer from '../../services/TableContainer';

let test = [
  {
    Имя: '111',
    Фамилия: '111',
    Phone: '111',
  },
  {
    Имя: '222',
    Фамилия: '222',
    Phone: '222'
  }
];

const rows = [
  'Имя',
  'Фамилия',
  'Телефон'
];

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
        data={this.state.data}
        allData={e => console.log('ex')} // AllSchedules from actions
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

AllSchedules.propTypes = {
  auth: PropTypes.object.isRequired,
  //schedules: PropTypes.object.isRequired
  //AllSchedules: PropTypes.func.isRequired,
  //deleteClient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
   // schedules: state.schedules
  };
};

export default connect(
  mapStateToProps
  //{ AllSchedules, deleteCage }
)(AllSchedules);
