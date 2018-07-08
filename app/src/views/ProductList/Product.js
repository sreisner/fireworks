import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Render product card here for {this.props.product.name}</div>;
  }
}

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
