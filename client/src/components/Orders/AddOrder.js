import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';

class AddOrder extends Component {
  constructor(props) {
    super(props);
    this.headerForm = 'Новый заказ';
    this.submitLabel = 'Добавить';
    this.dataInput = inputs.orderInputs;
  }

  onSubmit = values => console.log(values); //this.props.AddOrder(values);

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

AddOrder.propTypes = {
  //AddOrder: PropTypes.func.isRequired,
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
  // { AddOrder }
)(AddOrder);
