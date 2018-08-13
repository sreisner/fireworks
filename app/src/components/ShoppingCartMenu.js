import React, { Component } from 'react';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { ShoppingCart } from '@material-ui/icons';
import Menu from '@material-ui/core/Menu';
import { ShoppingCartConsumer } from './ShoppingCartContext';
import {
  Typography,
  Grid,
  Divider,
  withStyles,
  Button,
} from '../../node_modules/@material-ui/core';
import { getFormattedPrice } from '../utils';
import CheckoutDialog from './CheckoutDialog';
import { Elements } from 'react-stripe-elements';
import PropTypes from 'prop-types';

const styles = theme => ({
  productImage: {
    maxHeight: '60px',
    maxWidth: '60px',
  },
  productRow: {
    height: '50px',
    alignItems: 'center',
  },
  menu: {
    width: '350px',
    maxHeight: '300px',
    outline: 'none',
  },
  paddingsPub: {
    padding: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
  },
  divider: {
    marginLeft: '-16px',
    marginRight: '-16px',
  },
  product: {
    padding: '16px',
    paddingTop: '0px',
    alignItems: 'center',
  },
  productInfo: {
    paddingLeft: '12px',
    alignItems: 'center',
  },
  itemCost: {
    marginRight: '6px',
  },
  checkout: {
    paddingLeft: 8,
    paddingRight: 8,
  },
  productScroll: {
    position: 'relative',
    maxHeight: 200,
    overflow: 'auto',
  },
  emptyCart: {
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    height: 50,
  },
});
class ShoppingCartMenu extends Component {
  state = {
    anchorEl: null,
    open: false,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClickClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <ShoppingCartConsumer>
        {({ cart, numItemsInCart, subTotal }) => (
          <React.Fragment>
            <Badge badgeContent={numItemsInCart} color="secondary">
              <IconButton onClick={this.handleClick} color="inherit">
                <ShoppingCart />
              </IconButton>
            </Badge>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
            >
              <Grid container direction="column" className={classes.menu}>
                <Grid item className={classes.paddingsPub}>
                  <Typography variant="subheading" color="textSecondary">
                    Total: {getFormattedPrice(subTotal)}
                  </Typography>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid item>
                  {cart.length === 0 ? (
                    <Typography className={classes.emptyCart}>
                      Cart is Empty!
                    </Typography>
                  ) : (
                    <Grid container className={classes.productScroll}>
                      {cart.map(item => (
                        <Grid item key={item.product._id}>
                          <Grid container className={classes.product}>
                            <Grid item className={classes.productRow}>
                              <img
                                src={item.product.imageUrls[0]}
                                className={classes.productImage}
                                alt=""
                              />
                            </Grid>
                            <Grid item>
                              <Grid
                                container
                                className={classes.productInfo}
                                direction="column"
                              >
                                <Grid item>
                                  <Typography>{item.product.title} </Typography>
                                </Grid>
                                <Grid item>
                                  <Grid container>
                                    <Grid item className={classes.itemCost}>
                                      <Typography>
                                        {getFormattedPrice(
                                          item.product.retailPrice
                                        )}
                                      </Typography>
                                    </Grid>
                                    <Grid item>
                                      <Typography>
                                        Quantity: {item.count}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Grid>
                <Grid item className={classes.checkout}>
                  <Button
                    variant="raised"
                    color="primary"
                    style={{ width: '100%' }}
                    onClick={this.handleClickOpen}
                  >
                    Checkout
                  </Button>
                </Grid>
              </Grid>
            </Menu>
            <Elements>
              <CheckoutDialog
                open={this.state.open}
                onClose={this.handleClickClose}
              />
            </Elements>
          </React.Fragment>
        )}
      </ShoppingCartConsumer>
    );
  }
}

ShoppingCartMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (ShoppingCartMenu = withStyles(styles)(ShoppingCartMenu));
