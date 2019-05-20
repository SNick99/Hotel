import React, { Component } from 'react';
//import classnames from "classnames";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmployee } from '../../../redux/actions/authActions';
// import validateLoginInput from '../../../validation/login';
import FormContainer from '../../../services/FormContainer';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Phone: '',
      Password: ''
    };

    this.headerForm = 'Вход';
    this.submitLabel = 'Войти';

    this.dataInput = [
      {
        type: 'text',
        label: 'Телефон',
        name: 'Phone'
      },

      {
        type: 'password',
        label: 'Пароль',
        name: 'Password'
      }
    ];
  }

  onSubmit = values => this.props.loginEmployee(values);

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/employee/current');
    }
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
      this.props.history.push('/employee/current');
    }
  }

  render() {
    return (
      <FormContainer
        dataInput={this.dataInput}
        onSubmit={this.onSubmit}
        headerForm={this.headerForm}
        submitLabel={this.submitLabel}
      />
    );
  }
}

Login.propTypes = {
  loginEmployee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  { loginEmployee }
)(Login);
