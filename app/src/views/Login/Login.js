import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

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
        <Grid item>
          <Typography variant="display4">Welcome</Typography>
        </Grid>
        <Grid item>
          <Grid container direction="row" spacing={40} justify="center">
            <Grid item>
              <Button variant="outlined">Sign Up</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined">Login</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (Login = withStyles(styles)(Login));
