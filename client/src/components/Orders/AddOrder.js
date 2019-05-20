import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FormContainer from '../../services/FormConteiner';

class AddOrder extends Component {
  constructor(props) {
    super(props);

    this.headerForm = 'Новый заказ';
    this.submitLabel = 'Добавить';

    this.dataInput = [
      {
        type: 'date',
        label: 'Дата завершения заказа',
        name: 'EndDate'
      },
        {
          type: 'text',
          label: 'Имя клиента',
          name: 'FirstName'
        },
        {
          type: 'number',
          label: 'Телефон',
          name: 'Phone'
        },
        {
          type: 'text',
          label: 'Имя питомца',
          name: 'PetName'
        },
        {
          type: 'text',
          label: 'Вид',
          name: 'KindOfPet'
        },
        {
          type: 'number',
          label: 'Код',
          name: 'PassportCode'
        },
        {
          type: 'text',
          label: 'Имя товара',
          name: 'KindOfCage'
        },
        {
          type: 'text',
          label: 'Фирма клетки',
          name: 'NameFirma'
        },
        {
          type: 'text',
          label: 'Тип клетки',
          name: 'TypeOfCage'
        },
        {
          type: 'text',
          label: 'Доп. услуга',
          name: 'ExtraService',
          'req':false
        },
        {
          type: 'number',
          label: 'Цена доп. услуги',
          name: 'ExtraPrice',
          'req':false
        },
      ];
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
