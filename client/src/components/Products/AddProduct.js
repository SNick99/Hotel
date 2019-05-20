import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormContainer';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.headerForm = 'Новый товар';
    this.submitLabel = 'Добавить';

    this.dataInput = [
        {
          type: 'text',
          label: 'Название',
          name: 'NameOfProduct'
        },
        {
          type: 'text',
          label: 'Фирма',
          name: 'NameFirma'
        },
        {
          type: 'number',
          label: 'Стоимость (продажа)',
          name: 'PriceOfUnit'
        },
        {
          type: 'number',
          label: 'Стоимость (покупка)',
          name: 'UnitPrice'
        },
        {
          type: 'text',
          label: 'Сотрудник',
          name: 'Employee'
        },
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
        },
        {
          type: 'number',
          label: 'Телефон',
          name: 'Phone',
          helperText: ''
        }
      ];
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
