import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

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
    this.state = {};
  }

  render() {
    const { classes, product, addToCart } = this.props;
    return (
      <Grid container justify="center" alignItems="stretch">
        <Grid item>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={product.imageUrl}
              title={product}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {product.name}
              </Typography>
              <Typography component="p" className={classes.desc}>
                {product.shortDescription}
              </Typography>
            </CardContent>
            <CardActions>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <Typography variant="caption">
                    ${product.price.dollars}.{product.price.cents}
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => addToCart(product)}
                    size="small"
                    color="primary"
                  >
                    Add to Cart
                  </Button>
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
  product: PropTypes.object.isRequired,
};

export default (Product = withStyles(styles)(Product));
