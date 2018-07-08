import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React, { Component } from 'react';

const styles = theme => ({
  flex: {
    flex: 1,
  },
});

class FireworksAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar>
        <Toolbar>
          <Typography variant="title" className={classes.flex}>
            Products
          </Typography>
          <IconButton>
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default (FireworksAppBar = withStyles(styles)(FireworksAppBar));
