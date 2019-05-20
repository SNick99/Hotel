import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allEmployees,
  deleteEmployee
} from '../../redux/actions/employeesActions';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

// let test = [
//   {
//     Имя: '111',
//     Фамилия: '111',
//     Phone: '111',
//     'Дата рождения': '111',
//     Адрес: '111',
//     Должность: '111',
//     'Ставка/день': '111'
//   },
//   {
//     Имя: '222',
//     Фамилия: '222',
//     Phone: '222',
//     'Дата рождения': '222',
//     Адрес: '222',
//     Должность: '222',
//     'Ставка/день': '222'
//   }
// ];

const rows = [
  'id',
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
    data: this.props.employees.employees
  };

  handleEdit = (e, item) => {
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
    const sendData = [];
    this.props.employees.employees.map(item => {
      sendData.push({
        id: item.id,
        FirstName: item.FirstName,
        LastName: item.LastName,
        Phone: item.Phone,
        Birthday: item.Birthday,
        Adress: item.Adress,
        Position: item.Position,
        SalaryChange: item.SalaryChange
      });
      return null;
    });

    return (
      <TableContainer
        rows={rows}
        data={sendData}
        searchProp="Phone"
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
