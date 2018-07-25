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
import { getFormattedProductPrice } from '../utils';
import CheckoutDialog from './CheckoutDialog';

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
  },
  productInfo: {
    paddingLeft: '12px',
  },
  itemCost: {
    marginRight: '6px',
  },
  checkout: {
    paddingLeft: 8,
    paddingRight: 8,
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
            <Badge badgeContent={numItemsInCart} color="primary">
              <IconButton onClick={this.handleClick}>
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
                    Total: ${subTotal.toFixed(2)}
                  </Typography>
                  <Divider className={classes.divider} />
                </Grid>
                <Grid item>
                  <Grid container>
                    {cart.map(item => (
                      <Grid item>
                        <Grid container className={classes.product}>
                          <Grid item className={classes.productRow}>
                            <img
                              src={item.product.imageUrl}
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
                                <Typography>{item.product.name} </Typography>
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item className={classes.itemCost}>
                                    <Typography>
                                      ${getFormattedProductPrice(item.product)}
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
            <CheckoutDialog
              open={this.state.open}
              onClose={this.handleClickClose}
            />
          </React.Fragment>
        )}
      </ShoppingCartConsumer>
    );
  }
}

export default (ShoppingCartMenu = withStyles(styles)(ShoppingCartMenu));
