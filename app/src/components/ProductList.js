import { Grid } from '@material-ui/core';
import React, { Component } from 'react';
import Fetch from './Fetch';
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
            return <h1>{error.message}</h1>;
          } else {
            return (
              <Grid container spacing={16}>
                {products.map(product => (
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sm={6}
                    height="100%"
                    key={product._id}
                  >
                    <Product product={product} />
                  </Grid>
                ))}
              </Grid>
            );
          }
        }}
      </Fetch>
    );
  }
}

export default ProductList;
