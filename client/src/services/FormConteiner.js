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
import { connect } from 'react-redux';

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
  const { classes, onSubmit, dataInput, headerForm, submitLabel } = props;
  return (
    <Paper className={classes.root}>
      <div className={classes.form}>
        <br />
        <Typography variant="h5" color="inherit" align="center">
          {headerForm}
        </Typography>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={8}>
                {dataInput.map((item, index) => (
                  <Grid item xs={12} key={`key${index}`}>
                    <br />
                    <Field
                      name={item.name}
                      component={renderTextField}
                      label={item.label}
                      type={item.type}
                      helperText={item.helperText || ''}
                      InputLabelProps={{ shrink: true }}
                      required={item.req !== false ? true : false}
                      fullWidth
                    />
                  </Grid>
                ))}
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
