import React from 'react';
import PropTypes from 'prop-types';
//import classnames from "classnames";
import { withStyles } from '@material-ui/core/styles';
import { Form, Field } from 'react-final-form';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { renderTextField } from './helpers';
import MenuItem from '@material-ui/core/MenuItem';
import selectConfig from './selectConfig';
import { connect } from 'react-redux';
//import validateRegisterInput from '../validation/register';

const styles = {
  root: {
    width: '100%',
    minHeight: '100%',
    overflowY: 'auto'
  },
  form: {
    alignItems: 'center',
    width: '50%',
    padding: '1em',
    margin: '0 25%'
  },
  btn: {
    width: '100%',
    margin: '1em 0'
  }
};

const FormContainer = props => {
  const {
    classes,
    onSubmit,
    dataInput,
    headerForm,
    submitLabel,
    validator,
    forSelectConfig
  } = props;
  console.log(dataInput);
  return (
    <Paper className={classes.root}>
      <div className={classes.form}>
        <br />
        <Typography variant="h5" color="inherit" align="center">
          {headerForm}
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={validator}
          render={({ handleSubmit, form, validating }) => (
            <form
              id="formid"
              onSubmit={async event => {
                await handleSubmit(event);
                validating && form.reset();
              }}
              noValidate
            >
              <Grid container spacing={8}>
                {dataInput.map((item, index) =>
                  item.type !== 'select' ? (
                    <Grid item xs={12} key={`key${index}`}>
                      <br />
                      <Field
                        name={item.name}
                        render={renderTextField}
                        label={item.label}
                        type={item.type}
                        // helperText={item.helperText || ''}
                        InputLabelProps={{ shrink: true }}
                        required={item.req !== false ? true : false}
                        fullWidth
                      />
                    </Grid>
                  ) : (
                    <Field
                      key={`key${index}`}
                      name={item.name}
                      component={renderTextField}
                      select
                      label={item.label}
                      type={item.type}
                      helperText={item.helperText || ''}
                      InputLabelProps={{ shrink: true }}
                      required={item.req !== false ? true : false}
                      fullWidth
                    >
                      {selectConfig(item, forSelectConfig).map((option, i) => (
                        <MenuItem key={option + i} value={option}>
                          {option}
                        </MenuItem>
                      ))}{' '}
                    </Field>
                  )
                )}
              </Grid>
              <br />
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                className={classes.btn}
              >
                {submitLabel}
              </Button>
            </form>
          )}
        />
      </div>
    </Paper>
  );
};

FormContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(FormContainer));
