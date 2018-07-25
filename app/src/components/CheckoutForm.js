import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import CheckoutService from '../services/api/checkout/checkout';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      cardNumber: '',
      cvc: '',
      mm: '',
      yy: '',
    };
  }

  onSubmit = event => {
    event.preventDefault();

    const { email, cardNumber, cvc, mm, yy } = this.state;

    CheckoutService.makePayment(email, cardNumber, cvc, mm, yy);
  };

  onFormInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { email, cardNumber, cvc, mm, yy } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          label="Email"
          value={email}
          name="email"
          type="email"
          onChange={this.onFormInputChange}
        />

        <TextField
          label="Card Number"
          value={cardNumber}
          name="cardNumber"
          type="number"
          onChange={this.onFormInputChange}
        />

        <TextField
          label="CVC"
          value={cvc}
          name="cvc"
          type="number"
          onChange={this.onFormInputChange}
        />

        <TextField
          label="MM"
          value={mm}
          name="mm"
          type="number"
          onChange={this.onFormInputChange}
        />

        <TextField
          label="YY"
          value={yy}
          name="yy"
          type="number"
          onChange={this.onFormInputChange}
        />

        <Button type="submit" />
      </form>
    );
  }
}

export default CheckoutForm;
