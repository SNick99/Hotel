import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Register.css';
//import ButtonSubmit from "../../Layout/ButtonSubmit/ButtonSubmit";
//import Input from "../../Layout/Input/Input";
//import classnames from "classnames";
import { registerEmployee } from '../../../redux/actions/authActions';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { renderTextField } from '../../../services/helpers';
import validateRegisterInput from '../../../validation/register';

class Register extends Component {
  constructor(props) {
    super(props);

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

    this.DataInput = [
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
        label: 'День рождения',
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

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit = values => this.props.registerEmployee(values);

  render() {
    const { errors } = this.props;
    console.log(errors);
    return (
      <>
        <br />
        <Typography variant="h6">Регистрация</Typography>
        <Form
          onSubmit={this.onSubmit}
          validate={validateRegisterInput}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={8}>
                {this.DataInput.map((item, index) => (
                  <Grid item xs={12} key={`key${index}`}>
                    <Field
                      name={item.name}
                      component={renderTextField}
                      label={item.name}
                      type={item.type}
                      required
                      fullWidth
                    />
                  </Grid>
                ))}
              </Grid>
              <br />
              <Button color="primary" variant="outlined" type="submit">
                Submit
              </Button>
            </form>
          )}
        />
      </>
    );
  }
}

Register.propTypes = {
  registerEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  console.log(state.auth);
  return {
    auth: state.auth,
    errors: state.errors
  };
};

export default connect(
  mapStateToProps,
  { registerEmployee }
)(Register);
