import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FireworksToolbar from './components/FireworksToolbar';
import ProductList from './components/ProductList';
import withRoot from './withRoot';

const styles = theme => ({
  appContainer: {
    height: '100%',
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.appContainer}>
        <FireworksToolbar />
        <ProductList />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (App = withRoot(withStyles(styles)(App)));
