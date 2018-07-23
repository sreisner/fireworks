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

const styles = theme => ({
  productImage: {
    height: '100%',
  },
  productRow: {
    height: '50px',
  },
  menu: {
    width: '350px',
    maxHeight: '300px',
  },
  paddingsPub: {
    padding: '16px',
  },
  divider: {
    marginLeft: '-16px',
    marginRight: '-16px',
  },
});
class ShoppingCartMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
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
                  <Grid container spacing={16}>
                    {cart.map(item => (
                      <Grid item>
                        <Grid container>
                          <Grid item className={classes.productRow}>
                            <img
                              src={item.product.imageUrl}
                              className={classes.productImage}
                              alt=""
                            />
                          </Grid>
                          <Grid item>
                            <Grid container direction="column">
                              <Grid item>
                                <Typography>{item.product.name} </Typography>
                              </Grid>
                              <Grid item>
                                <Grid container>
                                  <Grid item>
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
                <Grid item>
                  <Button
                    variant="raised"
                    color="primary"
                    style={{ width: '100%' }}
                  >
                    Checkout
                  </Button>
                </Grid>
              </Grid>
            </Menu>
          </React.Fragment>
        )}
      </ShoppingCartConsumer>
    );
  }
}

export default (ShoppingCartMenu = withStyles(styles)(ShoppingCartMenu));
