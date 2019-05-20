import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { allClients, deleteClient } from '../../redux/actions/clientsAction';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

// let test = [
//   {
//     Имя: '111',
//     Фамилия: '111',
//     Phone: '111',
//     'Дата рождения': '111',
//     'Имя питомца': '111',
//     Вид: '111',
//     Код: '111'
//   },
//   {
//     Имя: '222',
//     Фамилия: '222',
//     Phone: '222',
//     'Дата рождения': '222',
//     'Имя питомца': '222',
//     Вид: '222',
//     Код: '222'
//   }
// ];

const rows = [
  'id',
  'Имя',
  'Фамилия',
  'Телефон',
  'Дата рождения',
  'Имя питомца',
  'Код',
  'Вид'
];

class AllClients extends Component {
  state = {
    selected: '',
    data: this.props.clients.clients
  };

  handleEdit = (e, item) => {
    console.log(item); // delete after dev
    this.setState({ selected: item });
  };

  handleDelete = item => {
    console.log(`Удален клиент с id ${item}`);
    return this.props.deleteClient(item);
  };

  componentDidMount() {
    this.props.allClients();
  }

  render() {
    return (
      <TableContainer
        rows={rows}
        searchProp="Phone"
        data={this.props.clients.clients}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
        modalInputs={inputs.clientInputs}
      />
    );
  }
}

AllClients.propTypes = {
  auth: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired,
  allClients: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    clients: state.clients
  };
};

export default connect(
  mapStateToProps,
  { allClients, deleteClient }
)(AllClients);
