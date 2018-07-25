import React, { Component } from 'react';
import CheckoutService from '../services/api/checkout/checkout';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Elements from 'react-stripe-elements/lib/components/Elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = event => {
    event.preventDefault();

    this.props.stripe
      .createToken({ name: 'Name' })
      .then(response => response.token.id)
      .then(token => CheckoutService.makePayment(token));
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <Elements>
          <CardElement />
        </Elements>
      </form>
    );
  }
}

export default (CheckoutForm = injectStripe(CheckoutForm));
