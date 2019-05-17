import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  allEmployees,
  deleteEmployee
} from '../../redux/actions/employeesActions';
import './Employees.css';
import { Button } from '@material-ui/core';

const rows = [
  'Имя',
  'Фамилия',
  'Телефон',
  'Дата рождения',
  'Адрес',
  'Должность',
  'Ставка/день'
];

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '76vh'
  },
  rows: {
    marginLeft: theme.spacing.unit
  },
  pagination: {
    marginRight: '1em',
    fontSize: '.8em'
  },
  btn: {
    border: '1px solid black',
    marginTop: '15px'
  }
});

class Employees extends Component {
  state = {
    selected: '',
    data: this.props.employees.employees,
    page: 0,
    rowsPerPage: 5
  };
  // selected === {FirstName:'...', LastName:'...', ...}
  handleEdit = (event, item) => {
    console.log('to edit: ' + item.FirstName); // delete after dev
    this.setState({ selected: item });
  };
  // selected === {FirstName:'...', LastName:'...', ...}
  handleDelete = item => {
    console.log(`Удален сотрудник с id ${item}`);
    return this.props.deleteEmployee(item);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidMount() {
    this.props.allEmployees();
  }

  render() {
    const { classes } = this.props;
    const { rowsPerPage, page } = this.state;
    console.log('Data', this.props.employees.employees);
    const emptyRows =
      rowsPerPage -
      Math.min(
        rowsPerPage,
        this.props.employees.employees.length - page * rowsPerPage
      );

    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className={classes.rows}>
              <TableCell />
              {rows.map(label => (
                <TableCell key={`label${label}`}>{label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.employees.employees
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, i) => {
                return (
                  <TableRow hover key={i}>
                    <TableCell>
                      <Tooltip title="Редактировать">
                        <IconButton
                          aria-label="Edit"
                          onClick={e => this.handleEdit(e, n)}
                        >
                          <Icon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="left">{n.FirstName}</TableCell>
                    <TableCell align="left">{n.LastName}</TableCell>
                    <TableCell align="left">{n.Phone}</TableCell>
                    <TableCell align="left">{n.Birthday}</TableCell>
                    <TableCell align="left">{n.Adress}</TableCell>
                    <TableCell align="left">{n.Position}</TableCell>
                    <TableCell align="left">{n.SalaryChange}</TableCell>
                    <TableCell>
                      <Tooltip title="Удалить">
                        <IconButton
                          aria-label="Delete"
                          onClick={() => this.handleDelete(n.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell align="center" colSpan={12}>
                  Конец списка
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          className={classes.pagination}
          labelRowsPerPage="Записей на странице:"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.props.employees.employees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

Employees.propTypes = {
  auth: PropTypes.object.isRequired,
  employees: PropTypes.object.isRequired,
  allEmployees: PropTypes.func.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
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
)(withStyles(styles)(Employees));
