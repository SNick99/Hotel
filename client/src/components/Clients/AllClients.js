import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  allClients,
  deleteClient,
  updateClient
} from '../../redux/actions/clientsAction';
import TableContainer from '../../services/TableContainer';
import { inputs } from '../../services/dataInputs';

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
    idClient: '',
    data: this.props.clients.clients
  };

  handleEdit = (e, item) => {
    console.log(item); // delete after dev
    this.setState({ idClient: item });
  };

  handleDelete = item => {
    console.log(`Удален клиент с id ${item}`);
    return this.props.deleteClient(item);
  };

  onSubmit = values => {
    values.id = this.state.idClient.id;
    this.props.updateClient(values);
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
        modalInputs={[
          {
            type: 'text',
            label: 'Имя',
            name: 'FirstName',
            helperText: ''
          },
          {
            type: 'text',
            label: 'Фамилия',
            name: 'LastName',
            helperText: ''
          }
        ]}
        onSubmit={this.onSubmit}
        edit={true}
        delete={false}
      />
    );
  }
}

AllClients.propTypes = {
  auth: PropTypes.object.isRequired,
  clients: PropTypes.object.isRequired,
  allClients: PropTypes.func.isRequired,
  deleteClient: PropTypes.func.isRequired,
  updateClient: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    clients: state.clients
  };
};

export default connect(
  mapStateToProps,
  { allClients, deleteClient, updateClient }
)(AllClients);
