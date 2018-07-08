import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
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
    this.state = {};
  }

  render() {
    const { classes } = this.props;

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
          <CardContent>
            <form noValidate>
              <Grid container direction="column" spacing={40}>
                <Grid item>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item>
                  <PasswordInput
                    label="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </Grid>
                <Grid item alignItems="center">
                  <Grid container justify="center">
                    <Grid item>
                      <Button type="submit">Log In</Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (Login = withStyles(styles)(Login));
