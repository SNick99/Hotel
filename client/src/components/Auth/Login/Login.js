import React, { Component } from 'react';
//import classnames from "classnames";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginEmployee } from '../../../redux/actions/authActions';
//import "./Login.css";
//import ButtonSubmit from "../../Layout/ButtonSubmit/ButtonSubmit";
//import Input from "../../Layout/Input/Input";
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { renderTextField } from '../../../services/helpers';
<<<<<<< HEAD
import validateLoginInput from '../../../validation/login';
=======
// import validateLoginInput from '../../../validation/login';
>>>>>>> 8f25f19a2d434e57a575bb79a26806a7410df2c9

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Phone: '',
      Password: ''
    };

    this.DataInput = [
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

<<<<<<< HEAD
  onSubmit = values => {
    const a = this.props.loginEmployee(values);
    console.log(a);
    return a;
  };
=======
  onSubmit = values => this.props.loginEmployee(values);
>>>>>>> 8f25f19a2d434e57a575bb79a26806a7410df2c9

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
<<<<<<< HEAD
    const { errors } = this.props;
    console.log(errors);
=======
>>>>>>> 8f25f19a2d434e57a575bb79a26806a7410df2c9
    return (
      <>
        <br />
        <Typography variant="h6">Вход</Typography>
        <Form
          onSubmit={this.onSubmit}
          // validate={validateLoginInput}
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
