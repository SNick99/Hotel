import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';
import { addProduct } from '../../redux/actions/productsActions';
import { inputs } from '../../services/dataInputs';

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.headerForm = 'Новый товар';
    this.submitLabel = 'Добавить';

    this.dataInput = inputs.productInputs;
  }

  onSubmit = values => {
    values.employeeId = this.props.auth.employee.id;
    this.props.addProduct(values);
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

AddProduct.propTypes = {
  addProduct: PropTypes.func.isRequired,
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
  { addProduct }
)(AddProduct);
