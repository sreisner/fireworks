import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckoutForm from './CheckoutForm';
import { injectStripe } from 'react-stripe-elements';
import CheckoutService from '../services/api/checkout/checkout';

class CheckoutDialog extends React.Component {
  submitPayment = event => {
    event.preventDefault();

    this.props.stripe
      .createToken({ name: 'Name' })
      .then(response => response.token.id)
      .then(token => CheckoutService.makePayment(token))
      .then(this.props.onClose);
  };

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your payment information:
            </DialogContentText>
            <CheckoutForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submitPayment} color="primary">
              Submit Payment
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default (CheckoutDialog = injectStripe(CheckoutDialog));
