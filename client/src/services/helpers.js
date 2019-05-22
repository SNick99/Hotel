import TextField from '@material-ui/core/TextField';
import React from 'react';

export const renderTextField = ({
  type,
  name,
  label,
  placeholder,
  input,
  value,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    type={type}
    name={name}
    label={label}
    value={value}
    placeholder={placeholder}
    error={touched && error && true}
    helperText={touched && error}
    margin="none"
    {...input}
    {...custom}
  />
);
