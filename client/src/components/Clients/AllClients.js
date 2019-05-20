import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
/*import {
  AllClients,
  deleteCage
} from '../../redux/actions/clientsActions';*/
import TableContainer from '../../services/TableContainer';

let test = [
  {
    Имя: '111',
    Фамилия: '111',
    Phone: '111',
    'Дата рождения': '111',
    'Имя питомца': '111',
    Вид: '111',
    Код: '111'
  },
  {
    Имя: '222',
    Фамилия: '222',
    Phone: '222',
    'Дата рождения': '222',
    'Имя питомца': '222',
    Вид: '222',
    Код: '222'
  }
];

const rows = [
  'Имя',
  'Фамилия',
  'Телефон',
  'Дата рождения',
  'Имя питомца',
  'Вид',
  'Код'
];

class AllClients extends Component {
  state = {
    selected: '',
    data: test //this.props.clients
  };

  handleEdit = item => {
    console.log('to edit: ' + item.FirstName);
    this.setState({ selected: item });
  };

  handleDelete = item => {
    console.log(`Удален клиент с id ${item}`);
    // return this.props.deleteClient(item);
  };

  componentDidMount() {
    // this.props.AllClients();
  }

  render() {
    console.log('Data', this.state.data);

    return (
      <TableContainer
        rows={rows}
        data={this.state.data}
        allData={e => console.log('ex')} // AllClients from actions
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

AllClients.propTypes = {
  auth: PropTypes.object.isRequired,
  //clients: PropTypes.object.isRequired
  //AllClients: PropTypes.func.isRequired,
  //deleteClient: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
   // clients: state.clients
  };
};

export default connect(
  mapStateToProps
  //{ AllClients, deleteCage }
)(AllClients);
