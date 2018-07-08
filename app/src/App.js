import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AuthConsumer, AuthProvider } from './core/AuthContext';
import Login from './views/Login/Login';
import ProductList from './views/ProductList/ProductList';
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
          <AuthConsumer>
            {({ user }) => {
              if (user) {
                return <Route exact path="/" component={ProductList} />;
              } else {
                return <Route exact path="/" component={Login} />;
              }
            }}
          </AuthConsumer>
        </AuthProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (App = withRoot(withStyles(styles)(App)));
