import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addCage } from '../../redux/actions/cagesActions';

import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';

class AddCage extends Component {
  constructor(props) {
    super(props);
    this.headerForm = 'Новая клетка';
    this.submitLabel = 'Добавить';
    this.dataInput = inputs.cageInputs;
  }

  onSubmit = values => {
    values.emoployeeId = this.props.auth.employee.id;
    this.props.addCage(values);
  };

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

AddCage.propTypes = {
  addCage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { addCage }
)(AddCage);
