import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
});

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes, product } = this.props;
    return (
      <Grid container justify="center" alignItems="stretch">
        <Grid item height="100%">
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={product.imageUrl}
              title={product}
            />
            <CardContent>
              <Typography gutterBottom variant="headline" component="h2">
                {product.name} - ${product.price.dollars}.{product.price.cents}
              </Typography>
              <Typography component="p">{product.shortDescription}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Add to Cart
              </Button>
              <Button size="small" color="primary">
                Details
              </Button>
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
