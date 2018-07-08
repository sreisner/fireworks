import { IconButton, Toolbar, Typography, withStyles } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import React, { Component } from 'react';

const styles = theme => ({
  flex: {
    flex: 1,
  },
});

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
          <Typography variant="display4" className={classes.flex}>
            Products
          </Typography>
          <IconButton>
            <ShoppingCart />
          </IconButton>
        </Toolbar>
      </React.Fragment>
    );
  }
}

export default (FireworksToolbar = withStyles(styles)(FireworksToolbar));
