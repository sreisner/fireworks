const getFormattedProductPrice = product => {
  return `${product.price.dollars}.${product.price.cents}`;
};

export { getFormattedProductPrice };
