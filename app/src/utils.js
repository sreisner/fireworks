const getFormattedProductPrice = product => {
  return `$${(product.retailPrice / 100).toFixed(2)}`;
};

export { getFormattedProductPrice };
