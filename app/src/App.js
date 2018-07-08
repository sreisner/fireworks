import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AuthProvider } from './core/AuthContext';
import Login from './views/Login/Login';
import withRoot from './withRoot';

const styles = theme => ({
  loginContainer: {
    height: '100%',
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.loginContainer}>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (App = withRoot(withStyles(styles)(App)));
