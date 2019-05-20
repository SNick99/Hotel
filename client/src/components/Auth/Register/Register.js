import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import ButtonSubmit from "../../Layout/ButtonSubmit/ButtonSubmit";
//import Input from "../../Layout/Input/Input";
//import classnames from "classnames";
import { registerEmployee } from '../../../redux/actions/authActions';
import FormContainer from '../../../services/FormContainer';

class Register extends Component {
  constructor(props) {
    super(props);
/* for what
    this.state = {
      FirstName: '',
      LastName: '',
      Password: '',
      Password2: '',
      Phone: '',
      Birthday: '',
      Adress: '',
      Position: '',
      SalaryChange: '',
      errors: {}
    };
*/
    this.headerForm = 'Регистрация';
    this.submitLabel = 'Зарегистрировать';

    this.dataInput = [
      {
        type: 'text',
        label: 'Имя',
        name: 'FirstName'
      },
      {
        type: 'text',
        label: 'Фамилия',
        name: 'LastName'
      },
      {
        type: 'text',
        label: 'Телефон',
        name: 'Phone'
      },

      {
        type: 'password',
        label: 'Пароль',
        name: 'Password'
      },
      {
        type: 'password',
        label: 'Повторить пароль',
        name: 'Password2'
      },
      {
        type: 'text',
        helperText: 'День рождения',
        name: 'Birthday'
      },
      {
        type: 'text',
        label: 'Домашний адрес (Город, улица, дом, квартира)',
        name: 'Adress'
      },
      {
        type: 'text',
        label: 'Должность сотрудника',
        name: 'Position'
      },
      {
        type: 'text',
        label: 'Оклад сотрудника за одну смену',
        name: 'SalaryChange'
      }
    ];
  }

  onSubmit = values => this.props.registerEmployee(values);

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

Register.propTypes = {
  registerEmployee: PropTypes.func.isRequired,
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
  { registerEmployee }
)(Register);
