import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { PasswordInput } from './PasswordInput';

const styles = theme => ({
  loginContainer: {
    height: '100%',
    width: '100%',
    margin: 0,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  onLoginFormSubmit = event => {
    event.preventDefault();

    this.props.login(this.state.email, this.state.password).then(successful => {
      if (!successful) {
        this.setState({ error: 'Login failed' });
      } else {
        this.setState({ error: '' });
      }
    });
  };

  onEmailChange = email => {
    this.setState({ email });
  };

  onPasswordChange = password => {
    this.setState({ password });
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;

    return (
      <Grid
        container
        direction="column"
        spacing={40}
        alignItems="center"
        justify="center"
        className={classes.loginContainer}
      >
        <Card>
          <form noValidate onSubmit={this.onLoginFormSubmit}>
            <CardContent>
              <Grid container direction="column" spacing={40}>
                <Grid item>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={email}
                    fullWidth
                    onChange={e => this.onEmailChange(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <PasswordInput
                    label="Password"
                    name="password"
                    value={password}
                    onChange={e => this.onPasswordChange(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="caption">{error}</Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container justify="center">
                <Grid item>
                  <Button type="submit" variant="outlined">
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </form>
        </Card>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

export default (Login = withStyles(styles)(Login));
