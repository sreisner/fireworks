import React from 'react';

const ShoppingCartContext = React.createContext({});

export class ShoppingCartProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      subTotal: 0,
      numItemsInCart: 0,
    };
  }

  addToCart = (product, count = 1) => {
    if (count === 0) {
      this.removeProductFromCart(product);
    } else {
      this.setState(prevState => {
        let cart = [...prevState.cart];
        const item = cart.find(item => item.product._id === product._id);

        if (item) {
          item.count = count;
        } else {
          cart = [...cart, { product, count }];
        }

        return {
          cart,
          subTotal: this.getSubtotal(cart),
          numItemsInCart: this.getNumItemsInCart(cart),
        };
      });
    }
  };

  getNumItemsInCart = cart => {
    return cart.reduce((acc, curr) => {
      return acc + curr.count;
    }, 0);
  };

  getSubtotal = cart => {
    return cart.reduce(
      (acc, curr) =>
        +(
          acc +
          curr.product.price.dollars +
          curr.product.price.cents / 100
        ).toFixed(2),
      0
    );
  };

  removeProductFromCart = product => {
    this.setState(prevState => ({
      cart: prevState.cart.filter(item => item.product._id !== product._id),
    }));
  };

  render() {
    const { children } = this.props;

    return (
      <ShoppingCartContext.Provider
        value={{
          addToCart: this.addToCart,
          removeProductFromCart: this.removeProductFromCart,
          cart: this.state.cart,
          subTotal: this.state.subTotal,
          numItemsInCart: this.state.numItemsInCart,
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    );
  }
}

export const ShoppingCartConsumer = ShoppingCartContext.Consumer;
