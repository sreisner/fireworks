import React, { Component } from 'react';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Render product card here for {this.props.product.name}</div>;
  }
}

export default Product;
