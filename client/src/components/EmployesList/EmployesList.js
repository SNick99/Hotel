import React from 'react';
import PropTypes from 'prop-types';
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
// delete after adaptive real db
import { employes } from './testbase';

const rows = [
  'Имя',
  'Фамилия',
  'Телефон',
  'Дата рождения',
  'Адрес',
  'Должность',
  'Прирост ЗП'
];

const styles = theme => ({
  root: {
    width: '100%',
    minHeight:'76vh'
  },
  rows: {
    marginLeft: theme.spacing.unit
  },
  pagination: {
    marginRight: '1em',
    fontSize: '.8em'
  }
});

class EmployesList extends React.Component {
  state = {
    selected: '',
    data: employes,
    page: 0,
    rowsPerPage: 5
  };
  // selected === {FirstName:'...', LastName:'...', ...}
  handleEdit = (event, item) => {
    console.log('to edit: ' + item.FirstName); // delete after dev
    this.setState({ selected: item });
  };
  // selected === {FirstName:'...', LastName:'...', ...}
  handleDelete = (event, item) => {
    console.log('to delete: ' + item.FirstName); // delete after dev
    this.setState({ selected: item });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { data, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
          <Typography variant="h6" align="center" >
            Сотрудники
          </Typography>
         
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
              {employes
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
                            onClick={e => this.handleDelete(e, n)}
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
            count={data.length}
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

EmployesList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmployesList);
