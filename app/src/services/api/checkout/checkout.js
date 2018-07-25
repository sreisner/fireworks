import ApiService from '../api';

const CheckoutService = {
  makePayment: token => {
    return ApiService.post('/checkout', { token });
  },
};

export default CheckoutService;
