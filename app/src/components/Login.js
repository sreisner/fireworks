import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AuthConsumer } from './AuthContext';
import LoginForm from './LoginForm';

const styles = theme => ({});

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  onLoginFormSubmit = (event, login) => {
    const { email, password } = this.state;

    event.preventDefault();

    login(email, password).then(successful => {
      if (!successful) {
        this.setState({ error: 'Login failed' });
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
          <AuthConsumer>
            {({ login }) => (
              <form noValidate onSubmit={e => this.onLoginFormSubmit(e, login)}>
                <CardContent>
                  <LoginForm
                    email={email}
                    password={password}
                    error={error}
                    onEmailChange={this.onEmailChange}
                    onPasswordChange={this.onPasswordChange}
                  />
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
            )}
          </AuthConsumer>
        </Card>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (Login = withStyles(styles)(Login));
