import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  root: {
    width: '100%',
    minHeight: '100%',
    overflowX: 'auto'
  },
  search: {
    width: '20%',
    marginLeft: '40%'
  },
  rows: {
    marginLeft: theme.spacing.unit
  },
  pagination: {
    marginRight: '1em',
    fontSize: '.8em'
  }
});

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      changed: this.props.data,
      page: 0,
      rowsPerPage: 5
    };
  }
  handleSearch = e => {
    console.log(e.target.value);
    const searchedData = this.state.changed;
    this.setState({
      data: searchedData.filter(item => item.Phone.includes(e.target.value))
    });
    // todo
  };

  handleChangePage = page => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  componentDidMount() {
    //this.props.allData();                 // !!! uncomment if configrute actions
  }

  render() {
    const { classes, rows, handleEdit, handleDelete } = this.props;
    const { rowsPerPage, page, data } = this.state;
    console.log('Data', data);
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <TextField
          label="Поиск"
          type="search"
          className={classes.search}
          margin="normal"
          onChange={e => this.handleSearch(e)}
        />
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
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n, i) => {
                return (
                  <TableRow hover key={i}>
                    <TableCell>
                      <Tooltip title="Редактировать">
                        <IconButton
                          aria-label="Edit"
                          onClick={e => handleEdit(e, n)}
                        >
                          <Icon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    {Object.values(n).map((value, i) => (
                      <TableCell key={i} align="left">
                        {value}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Tooltip title="Удалить">
                        <IconButton
                          aria-label="Delete"
                          onClick={() => handleDelete(n.id)}
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

TableContainer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TableContainer);
