import ApiService from '../api';

const CheckoutService = {
  makePayment: (token, userData, productData, amountToCharge) => {
    return ApiService.post('/checkout', {
      token,
      userData,
      productData,
      amountToCharge,
    });
  },
};

export default CheckoutService;
