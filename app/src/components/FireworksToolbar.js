import {
  Grid,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React, { Component } from 'react';

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
              <Typography variant="display4">Products</Typography>
            </Grid>
            <Grid item>
              <Grid container spacing={40} align-items="flex-end">
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      <Typography variant="subheading" color="textSecondary">
                        1 item
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="subheading" color="textSecondary">
                        Subtotal: $99.99
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton>
                    <ShoppingCart />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </React.Fragment>
    );
  }
}

export default (FireworksToolbar = withStyles(styles)(FireworksToolbar));
