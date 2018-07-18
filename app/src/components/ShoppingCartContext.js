import React from 'react';

const ShoppingCartContext = React.createContext({});

export class ShoppingCartProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  updateCart = (product, count = 1) => {
    if (count === 0) {
      this.removeProductFromCart(product);
    } else {
      this.setState(prevState => {
        let cart = [...prevState.cart];
        const item = cart.find(item => item.product._id);

        if (item) {
          item.count = count;
        } else {
          cart = [...cart, { product, count }];
        }

        return { cart };
      });
    }

    console.log(this.state.cart);
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
          updateCart: this.updateCart,
          removeProductFromCart: this.removeProductFromCart,
          cart: this.state.cart,
        }}
      >
        {children}
      </ShoppingCartContext.Provider>
    );
  }
}

export const ShoppingCartConsumer = ShoppingCartContext.Consumer;
