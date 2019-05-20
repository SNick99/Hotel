import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';

class AddClient extends Component {
  constructor(props) {
    super(props);
    this.headerForm = 'Добавить в график';
    this.submitLabel = 'Добавить';
    this.dataInput = inputs.scheduleInputs;
  }

  onSubmit = values => console.log(values); //this.props.AddClient(values);

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
  //AddClient: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps
  // { AddClient }
)(AddClient);
