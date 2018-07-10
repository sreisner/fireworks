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
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Toolbar>
          <Grid container alignItems="center" justify="space-between">
            <Grid item>
              <Typography variant="display4">Products</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <ShoppingCart />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </React.Fragment>
    );
  }
}

export default (FireworksToolbar = withStyles(styles)(FireworksToolbar));
