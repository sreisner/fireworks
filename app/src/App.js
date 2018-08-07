import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FireworksToolbar from './components/FireworksToolbar';
import ProductList from './components/ProductList';
import withRoot from './withRoot';
import { ShoppingCartProvider } from './components/ShoppingCartContext';
import { StripeProvider } from 'react-stripe-elements';

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
        <StripeProvider apiKey="pk_test_QpG7zP3geahritzqRv18M6Jy">
          <ShoppingCartProvider>
            <FireworksToolbar />
            <ProductList />
          </ShoppingCartProvider>
        </StripeProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (App = withRoot(withStyles(styles)(App)));
