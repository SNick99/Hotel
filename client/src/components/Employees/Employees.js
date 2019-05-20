import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allEmployees,
  deleteEmployee
} from '../../redux/actions/employeesActions';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

let test = [
  {
   'FirstName': '111',
    LastName: '111',
    Phone: '111',
    'Birthday': '111',
    Adress: '111',
    Должность: '111',
    'Ставка/день': '111'
  },
  {
    Имя: '222',
    Фамилия: '222',
    Phone: '222',
    'Дата рождения': '222',
    Адрес: '222',
    Должность: '222',
    'Ставка/день': '222'
  }
];

const rows = [
  'Имя',
  'Фамилия',
  'Телефон',
  'Дата рождения',
  'Адрес',
  'Должность',
  'Ставка/день'
];

class Employees extends Component {
  state = {
    selected: '',
    data: test //this.props.employees.employees
  };

  handleEdit = (e,item) => {
    console.log(item); // delete after dev
    this.setState({ selected: item });
  };

  handleDelete = item => {
    console.log(`Удален сотрудник с id ${item}`);
    return this.props.deleteEmployee(item);
  };

  componentDidMount() {
    this.props.allEmployees();
  }

  render() {
    console.log('Data', this.state.data);

    return (
      <TableContainer
        rows={rows}
        searchProp="Phone" 
        data={this.state.data}
        allData={allEmployees}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.employeeInputs} 
      />
    );
  }
}

Employees.propTypes = {
  auth: PropTypes.object.isRequired,
  employees: PropTypes.object.isRequired,
  allEmployees: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    employees: state.employees
  };
};

export default connect(
  mapStateToProps,
  { allEmployees, deleteEmployee }
)(Employees);
