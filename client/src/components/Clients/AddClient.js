import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';

import { addClient } from '../../redux/actions/clientsAction';

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.headerForm = 'Новый клиент';
    this.submitLabel = 'Добавить';
    this.dataInput = inputs.clientInputs;
  }

  onSubmit = values => this.props.addClient(values);

  render() {
    return (
      <FormContainer
        onSubmit={this.onSubmit}
        dataInput={this.dataInput}
        headerForm={this.headerForm}
        submitLabel={this.submitLabel}
      />
    );
  }
}

AddClient.propTypes = {
  addClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { addClient }
)(AddClient);
