import React, { Component } from 'react';
import Fetch from '../../core/Fetch';
import Product from './Product';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fetch route="/products">
        {(loading, error, products) => {
          if (loading) {
            return <h1>Loading</h1>;
          } else if (error) {
            return <h1>{error}</h1>;
          } else {
            return (
              <ul>
                {products.map(product => (
                  <li key={product._id}>
                    <Product product={product} />
                  </li>
                ))}
              </ul>
            );
          }
        }}
      </Fetch>
    );
  }
}

export default ProductList;
