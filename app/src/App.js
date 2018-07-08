import React, { Component } from 'react';
import ProductList from './views/ProductList/ProductList';
import withRoot from './withRoot';

class App extends Component {
  render() {
    return <ProductList />;
  }
}

export default withRoot(App);
