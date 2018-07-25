import ApiService from '../api';

const CheckoutService = {
  makePayment: (email, cardNumber, cvc, mm, yy) => {
    // TODO:  Get token from Stripe
    const token = 'pk_test_QpG7zP3geahritzqRv18M6Jy';
    return ApiService.post('/checkout', {
      email,
      cardNumber,
      cvc,
      mm,
      yy,
      token,
    });
  },
};

export default CheckoutService;
