import {
  Grid,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
  Badge,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React, { Component } from 'react';
import { ShoppingCartConsumer } from './ShoppingCartContext';
import ShoppingCartMenu from './ShoppingCartMenu';

const styles = theme => ({});

class FireworksToolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="display3">Products</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={40} alignItems="center">
                <ShoppingCartConsumer>
                  {({ subTotal, numItemsInCart }) => (
                    <React.Fragment>
                      <Grid item>
                        <Typography variant="subheading" color="textSecondary">
                          Subtotal: ${Number(+subTotal).toFixed(2)}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <ShoppingCartMenu />
                      </Grid>
                    </React.Fragment>
                  )}
                </ShoppingCartConsumer>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </React.Fragment>
    );
  }
}

export default (FireworksToolbar = withStyles(styles)(FireworksToolbar));
