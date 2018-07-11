import { Grid, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import PasswordInput from './PasswordInput';

const LoginForm = props => {
  const { email, password, error, onEmailChange, onPasswordChange } = props;

  return (
    <Grid container direction="column" spacing={40}>
      <Grid item>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={email}
          fullWidth
          onChange={e => onEmailChange(e.target.value)}
        />
      </Grid>
      <Grid item>
        <PasswordInput
          label="Password"
          name="password"
          value={password}
          onChange={e => onPasswordChange(e.target.value)}
        />
      </Grid>
      <Grid item>
        <Typography variant="caption">{error}</Typography>
      </Grid>
    </Grid>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
};

export default LoginForm;
