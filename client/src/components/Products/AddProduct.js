import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';
import { inputs } from '../../services/dataInputs';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.headerForm = 'Новый товар';
    this.submitLabel = 'Добавить';
    this.dataInput = inputs.productInputs;
  }

  onSubmit = values => console.log(values); //this.props.AddProduct(values);

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

AddProduct.propTypes = {
  //AddProduct: PropTypes.func.isRequired,
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
  // { AddProduct }
)(AddProduct);
