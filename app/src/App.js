import { Toolbar, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FireworksAppBar from './core/FireworksAppBar';
import ProductList from './views/ProductList/ProductList';
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
        <FireworksAppBar />
        <Toolbar /> {/* Spacer for fixed app bar*/}
        <ProductList />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (App = withRoot(withStyles(styles)(App)));
