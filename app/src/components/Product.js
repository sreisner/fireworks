import { Grid, Select, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { ShoppingCartConsumer } from './ShoppingCartContext';
import { getFormattedPrice } from '../utils';

const styles = theme => ({
  card: {
    width: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  desc: {
    height: '4rem',
    overflow: 'hidden',
  },
});

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };
  }

  onCountChange = event => {
    this.setState({
      count: event.target.value,
    });
  };

  render() {
    const { classes, product } = this.props;

    return (
      <Grid container justify="center" alignItems="stretch">
        <Grid item>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={product.imageUrls[0]}
              title={product.title}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {product.title}
              </Typography>
              <Typography component="p" className={classes.desc}>
                {product.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography variant="caption">
                    {getFormattedPrice(product.retailPrice)}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container>
                    <Select
                      value={this.state.count}
                      onChange={this.onCountChange}
                    >
                      {[...Array(10)].map((_, count) => (
                        <MenuItem key={count} value={count + 1}>
                          {`${count + 1}`}
                        </MenuItem>
                      ))}
                    </Select>
                    <ShoppingCartConsumer>
                      {({ addToCart }) => (
                        <Button
                          onClick={() => addToCart(product, this.state.count)}
                          size="small"
                          color="primary"
                        >
                          Add to Cart
                        </Button>
                      )}
                    </ShoppingCartConsumer>
                  </Grid>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Product.propTypes = {
  classes: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
};

export default (Product = withStyles(styles)(Product));
